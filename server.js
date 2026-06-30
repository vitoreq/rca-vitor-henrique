import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
loadEnv();

const port = Number(process.env.PORT || 8765);
const model = process.env.OPENAI_MODEL || "gpt-5.5";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const analysisSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "followUpQuestions", "timeline", "fiveWhys", "evidenceRegister", "barrierAnalysis", "systemicCauses", "rootCauses", "faultTree", "improvementActions", "limitations"],
  properties: {
    summary: { type: "string" },
    timeline: {
      type: "array",
      maxItems: 6,
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
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["problem", "whys", "probableRootCause", "evidence", "confidence"],
        properties: {
          problem: { type: "string" },
          whys: {
            type: "array",
            maxItems: 5,
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
      maxItems: 8,
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
      maxItems: 6,
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
      maxItems: 8,
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
      maxItems: 5,
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
      maxItems: 5,
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
          maxItems: 5,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["category", "rootCause", "contributingFactors"],
            properties: {
              category: { type: "string" },
              rootCause: { type: "string" },
              contributingFactors: {
                type: "array",
                maxItems: 4,
                items: { type: "string" }
              }
            }
          }
        }
      }
    },
    improvementActions: {
      type: "array",
      maxItems: 8,
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
      maxItems: 5,
      items: { type: "string" }
    }
  }
};

const server = createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/analyze") {
      await handleAnalyze(req, res);
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Método não permitido." });
      return;
    }

    await serveStatic(req, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Erro interno no servidor." });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`RCA Segurança disponível em http://127.0.0.1:${port}`);
});

async function handleAnalyze(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 503, {
      error: "OPENAI_API_KEY não configurada. Crie um arquivo .env com sua chave da OpenAI."
    });
    return;
  }

  const incident = await readJsonBody(req);
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
    sendJson(res, response.status, {
      error: raw.error?.message || "Falha ao chamar a API da OpenAI."
    });
    return;
  }

  const text = extractOutputText(raw);
  if (!text) {
    sendJson(res, 502, { error: "A API não retornou texto analisável." });
    return;
  }

  sendJson(res, 200, {
    source: "openai",
    model: raw.model || model,
    analysis: JSON.parse(text)
  });
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = normalize(join(rootDir, requestedPath));

  if (!filePath.startsWith(rootDir)) {
    sendJson(res, 403, { error: "Acesso negado." });
    return;
  }

  const data = await readFile(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
  });
  res.end(data);
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

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (raw.length > 80_000) {
    throw new Error("Payload muito grande.");
  }
  return JSON.parse(raw || "{}");
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function loadEnv() {
  const envPath = join(rootDir, ".env");
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}
