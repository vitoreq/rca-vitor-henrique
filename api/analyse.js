export const config = {
  maxDuration: 60
};

const model = process.env.OPENAI_MODEL || "gpt-5.5";

const analysisSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "followUpQuestions", "timeline", "fiveWhys", "evidenceRegister", "barrierAnalysis", "systemicCauses", "rootCauses", "faultTree", "improvementActions", "limitations"],
  properties: {
    summary: { type: "string" },
    timeline: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["moment", "event", "evidence", "gap"],
        properties: {
          moment: { type: "string" },
          event: { type: "string" },
          evidence: { type: "string" },
          gap: { type: "string" }
        }
      }
    },
    fiveWhys: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["problem", "whys", "probableRootCause", "evidence", "confidence"],
        properties: {
          problem: { type: "string" },
          whys: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["why", "answer", "evidence"],
              properties: {
                why: { type: "string" },
                answer: { type: "string" },
                evidence: { type: "string" }
              }
            }
          },
          probableRootCause: { type: "string" },
          evidence: { type: "string" },
          confidence: { type: "string", enum: ["Low", "Medium", "High"] }
        }
      }
    },
    evidenceRegister: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["evidence", "source", "relevance", "confidence"],
        properties: {
          evidence: { type: "string" },
          source: { type: "string" },
          relevance: { type: "string" },
          confidence: { type: "string", enum: ["Low", "Medium", "High"] }
        }
      }
    },
    followUpQuestions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "reason"],
        properties: {
          question: { type: "string" },
          reason: { type: "string" }
        }
      }
    },
    barrierAnalysis: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["barrier", "expectedFunction", "status", "failureMode", "evidence"],
        properties: {
          barrier: { type: "string" },
          expectedFunction: { type: "string" },
          status: { type: "string", enum: ["Absent", "Failed", "Inadequate", "Not evidenced", "Effective"] },
          failureMode: { type: "string" },
          evidence: { type: "string" }
        }
      }
    },
    systemicCauses: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["managementSystemElement", "cause", "evidence", "confidence"],
        properties: {
          managementSystemElement: { type: "string" },
          cause: { type: "string" },
          evidence: { type: "string" },
          confidence: { type: "string", enum: ["Low", "Medium", "High"] }
        }
      }
    },
    rootCauses: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "cause", "evidence", "linkedBarrier", "confidence"],
        properties: {
          category: { type: "string" },
          cause: { type: "string" },
          evidence: { type: "string" },
          linkedBarrier: { type: "string" },
          confidence: { type: "string", enum: ["Low", "Medium", "High"] }
        }
      }
    },
    faultTree: {
      type: "object",
      additionalProperties: false,
      required: ["topEvent", "branches"],
      properties: {
        topEvent: { type: "string" },
        branches: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["category", "rootCause", "contributingFactors"],
            properties: {
              category: { type: "string" },
              rootCause: { type: "string" },
              contributingFactors: {
                type: "array",
                items: { type: "string" }
              }
            }
          }
        }
      }
    },
    improvementActions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["action", "controlHierarchyLevel", "priority", "ownerSuggestion", "verification", "linkedCause"],
        properties: {
          action: { type: "string" },
          controlHierarchyLevel: { type: "string", enum: ["Elimination", "Substitution", "Engineering control", "Administrative control", "PPE"] },
          priority: { type: "string", enum: ["High", "Medium", "Low"] },
          ownerSuggestion: { type: "string" },
          verification: { type: "string" },
          linkedCause: { type: "string" }
        }
      }
    },
    limitations: {
      type: "array",
      items: { type: "string" }
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "OPENAI_API_KEY is not configured in Vercel Environment Variables." });
    return;
  }

  try {
    const incident = await readIncident(req);
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        instructions: buildInstructions(incident.language),
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify(incident, null, 2)
              }
            ]
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "rca_safety_analysis",
            strict: true,
            schema: analysisSchema
          }
        }
      })
    });

    const raw = await response.json();
    if (!response.ok) {
      res.status(response.status).json({ error: raw.error?.message || "OpenAI API request failed." });
      return;
    }

    const text = extractOutputText(raw);
    if (!text) {
      res.status(502).json({ error: "OpenAI did not return parseable text." });
      return;
    }

    res.status(200).json({
      source: "openai",
      model: raw.model || model,
      analysis: JSON.parse(text)
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error." });
  }
}

async function readIncident(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function buildInstructions(language = "en") {
  const languageName = {
    en: "English",
    es: "Spanish",
    pt: "Brazilian Portuguese"
  }[language] || "English";

  return [
    "You are a senior occupational safety incident investigation specialist.",
    `Return every human-readable text field exclusively in ${languageName}. Do not use Portuguese labels unless the selected language is Brazilian Portuguese.`,
    "Use an evidence-based method with barrier analysis, systemic causes, and the hierarchy of controls.",
    "Analyze only the information provided. When something is not evidenced, record it as a gap, hypothesis, or follow-up question.",
    "First build a timeline with before, during, and after the event, separating fact, evidence, and gap.",
    "Then apply 5 Whys to the most relevant barrier failures or problems, stopping at verifiable systemic causes and avoiding blame of individuals.",
    "Then identify evidence and gaps; evaluate expected barriers, absent/failed/inadequate barriers, systemic causes, and root causes.",
    "Build a fault tree connecting the undesired event, barriers, contributing factors, and root causes.",
    "Prioritize strong actions using the hierarchy of controls: elimination, substitution, engineering control, administrative control, and PPE.",
    "Actions must be verifiable and connected to a cause, with control hierarchy level, priority, suggested owner, and verification criterion.",
    "Include follow-up questions only when necessary to mitigate the case or reduce relevant uncertainty."
  ].join(" ");
}

function extractOutputText(responseBody) {
  if (typeof responseBody.output_text === "string") {
    return responseBody.output_text;
  }

  return responseBody.output
    ?.flatMap((item) => item.content || [])
    .find((content) => content.type === "output_text")?.text;
}
