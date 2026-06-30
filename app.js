const form = document.querySelector("#rcaForm");
const witnessList = document.querySelector("#witnessList");
const witnessTemplate = document.querySelector("#witnessTemplate");
const analyzeBtn = document.querySelector("#analyzeBtn");
const addWitnessBtn = document.querySelector("#addWitnessBtn");
const clearBtn = document.querySelector("#clearBtn");
const exampleBtn = document.querySelector("#exampleBtn");
const copyBtn = document.querySelector("#copyBtn");
const docxBtn = document.querySelector("#docxBtn");
const pdfBtn = document.querySelector("#pdfBtn");
const refineBtn = document.querySelector("#refineBtn");
const questionsList = document.querySelector("#questionsList");
const questionCount = document.querySelector("#questionCount");
const timelineView = document.querySelector("#timelineView");
const fiveWhysView = document.querySelector("#fiveWhysView");
const faultTree = document.querySelector("#faultTree");
const bowtieDiagram = document.querySelector("#bowtieDiagram");
const ishikawaDiagram = document.querySelector("#ishikawaDiagram");
const rootCauses = document.querySelector("#rootCauses");
const barriers = document.querySelector("#barriers");
const systemicCauses = document.querySelector("#systemicCauses");
const actions = document.querySelector("#actions");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const apiStatus = document.querySelector("#apiStatus");
const languageButtons = document.querySelectorAll(".language-button");

let currentLanguage = "en";

const i18n = {
  en: {
    apiLocal: "Local mode",
    example: "Generate example",
    titleEyebrow: "Structured investigation",
    title: "Analyze barriers, systemic causes, evidence, and control actions.",
    required: "Required",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    refine: "Refine analysis",
    refining: "Refining...",
    copy: "Copy",
    copied: "Copied",
    word: "Print Word",
    pdf: "Print PDF",
    add: "Add",
    occurrence: "Occurrence information",
    witness: "Witness statements",
    questions: "Mitigation questions",
    result: "Analysis result",
    faultTree: "Fault tree",
    bowtie: "BowTie",
    ishikawa: "Ishikawa",
    timeline: "Timeline",
    fiveWhys: "5 Whys",
    rootCauses: "Probable root causes",
    barriers: "Barriers and evidence",
    systemic: "Systemic causes",
    actions: "Improvement actions",
    emptyQuestions: "Fill in the information and click Analyze.",
    emptyFault: "The fault tree will be generated after analysis.",
    emptyBowtie: "The BowTie will be generated after analysis.",
    emptyIshikawa: "The Ishikawa diagram will be generated after analysis.",
    emptyTimeline: "The timeline will be generated after analysis.",
    emptyFiveWhys: "The 5 Whys will be generated after analysis.",
    noQuestions: "No critical additional question was identified with the current data.",
    pending: "pending",
    pendingPlural: "pending",
    answerPlaceholder: "Response or collected evidence",
    exampleReady: "Example filled in. Click Analyze to generate questions and results.",
    type: "Type",
    date: "Date",
    area: "Area",
    severity: "Potential severity",
    description: "Detailed description",
    activity: "Activity performed",
    equipment: "Equipment or location",
    injury: "Was there an injury?",
    controls: "Existing control",
    name: "Name",
    role: "Role",
    statement: "Statement"
    , evidence: "Evidence"
    , gap: "Gap"
    , notEvidenced: "Not evidenced."
    , noGap: "No gap indicated."
    , problem: "Problem"
    , probableRootCause: "Probable root cause"
    , confidence: "Confidence"
    , threats: "Threats / causes"
    , preventiveBarriers: "Preventive barriers"
    , potentialConsequences: "Potential consequences"
    , mitigatingBarriers: "Mitigating barriers / actions"
    , noClassifiedCause: "No classified cause."
    , linkedBarrier: "Linked barrier"
    , expectedFunction: "Expected function"
    , failure: "Failure"
    , controlLevel: "Control level"
    , priority: "Priority"
    , owner: "Suggested owner"
    , verification: "Verification"
    , linkedCause: "Linked cause"
    , reason: "Reason"
    , answer: "Answer"
    , notGeneratedCauses: "Causes not generated yet."
    , notGeneratedBarriers: "Barriers not analyzed yet."
    , notGeneratedSystemic: "Systemic causes not generated yet."
    , notGeneratedActions: "Actions not generated yet."
    , reportNote: "Report generated automatically from the provided information. The investigation must be validated by a technical responsible person before closure."
  },
  es: {
    apiLocal: "Modo local",
    example: "Generar ejemplo",
    titleEyebrow: "Investigación estructurada",
    title: "Analice barreras, causas sistémicas, evidencias y acciones de control.",
    required: "Obligatorio",
    analyze: "Analizar",
    analyzing: "Analizando...",
    refine: "Refinar análisis",
    refining: "Refinando...",
    copy: "Copiar",
    copied: "Copiado",
    word: "Imprimir Word",
    pdf: "Imprimir PDF",
    add: "Agregar",
    occurrence: "Información del suceso",
    witness: "Declaraciones de testigos",
    questions: "Preguntas de mitigación",
    result: "Resultado del análisis",
    faultTree: "Árbol de fallas",
    bowtie: "BowTie",
    ishikawa: "Ishikawa",
    timeline: "Línea de tiempo",
    fiveWhys: "5 Porqués",
    rootCauses: "Causas raíz probables",
    barriers: "Barreras y evidencias",
    systemic: "Causas sistémicas",
    actions: "Acciones de mejora",
    emptyQuestions: "Complete la información y haga clic en Analizar.",
    emptyFault: "El árbol de fallas se generará después del análisis.",
    emptyBowtie: "El BowTie se generará después del análisis.",
    emptyIshikawa: "El Ishikawa se generará después del análisis.",
    emptyTimeline: "La línea de tiempo se generará después del análisis.",
    emptyFiveWhys: "Los 5 Porqués se generarán después del análisis.",
    noQuestions: "No se identificó ninguna pregunta adicional crítica con los datos actuales.",
    pending: "pendiente",
    pendingPlural: "pendientes",
    answerPlaceholder: "Respuesta o evidencia recopilada",
    exampleReady: "Ejemplo completado. Haga clic en Analizar para generar preguntas y resultados.",
    type: "Tipo",
    date: "Fecha",
    area: "Área",
    severity: "Severidad potencial",
    description: "Descripción detallada",
    activity: "Actividad ejecutada",
    equipment: "Equipo o ubicación",
    injury: "¿Hubo lesión?",
    controls: "Control existente",
    name: "Nombre",
    role: "Función",
    statement: "Declaración"
    , evidence: "Evidencia"
    , gap: "Brecha"
    , notEvidenced: "No evidenciada."
    , noGap: "Ninguna brecha indicada."
    , problem: "Problema"
    , probableRootCause: "Causa raíz probable"
    , confidence: "Confianza"
    , threats: "Amenazas / causas"
    , preventiveBarriers: "Barreras preventivas"
    , potentialConsequences: "Consecuencias potenciales"
    , mitigatingBarriers: "Barreras mitigadoras / acciones"
    , noClassifiedCause: "Sin causa clasificada."
    , linkedBarrier: "Barrera relacionada"
    , expectedFunction: "Función esperada"
    , failure: "Falla"
    , controlLevel: "Nivel de control"
    , priority: "Prioridad"
    , owner: "Responsable sugerido"
    , verification: "Verificación"
    , linkedCause: "Causa vinculada"
    , reason: "Motivo"
    , answer: "Respuesta"
    , notGeneratedCauses: "Causas aún no generadas."
    , notGeneratedBarriers: "Barreras aún no analizadas."
    , notGeneratedSystemic: "Causas sistémicas aún no generadas."
    , notGeneratedActions: "Acciones aún no generadas."
    , reportNote: "Informe generado automáticamente a partir de la información proporcionada. La investigación debe ser validada por un responsable técnico antes del cierre."
  },
  pt: {
    apiLocal: "Modo local",
    example: "Gerar exemplo",
    titleEyebrow: "Investigação estruturada",
    title: "Analise barreiras, causas sistêmicas, evidências e ações de controle.",
    required: "Obrigatório",
    analyze: "Analisar",
    analyzing: "Analisando...",
    refine: "Refinar análise",
    refining: "Refinando...",
    copy: "Copiar",
    copied: "Copiado",
    word: "Imprimir Word",
    pdf: "Imprimir PDF",
    add: "Adicionar",
    occurrence: "Informações do ocorrido",
    witness: "Depoimentos",
    questions: "Perguntas de mitigação",
    result: "Resultado da análise",
    faultTree: "Árvore de falhas",
    bowtie: "BowTie",
    ishikawa: "Ishikawa",
    timeline: "Linha do tempo",
    fiveWhys: "5 Porquês",
    rootCauses: "Causas raiz prováveis",
    barriers: "Barreiras e evidências",
    systemic: "Causas sistêmicas",
    actions: "Ações de melhoria",
    emptyQuestions: "Preencha as informações e clique em Analisar.",
    emptyFault: "A árvore será gerada após a análise.",
    emptyBowtie: "O BowTie será gerado após a análise.",
    emptyIshikawa: "O Ishikawa será gerado após a análise.",
    emptyTimeline: "A linha do tempo será gerada após a análise.",
    emptyFiveWhys: "Os 5 Porquês serão gerados após a análise.",
    noQuestions: "Nenhuma pergunta adicional crítica foi identificada com os dados atuais.",
    pending: "pendente",
    pendingPlural: "pendentes",
    answerPlaceholder: "Resposta ou evidência coletada",
    exampleReady: "Exemplo preenchido. Clique em Analisar para gerar perguntas e resultados.",
    type: "Tipo",
    date: "Data",
    area: "Área",
    severity: "Severidade potencial",
    description: "Descrição detalhada",
    activity: "Atividade executada",
    equipment: "Equipamento ou local",
    injury: "Houve lesão?",
    controls: "Controle existente",
    name: "Nome",
    role: "Função",
    statement: "Depoimento"
    , evidence: "Evidência"
    , gap: "Lacuna"
    , notEvidenced: "Não evidenciada."
    , noGap: "Nenhuma lacuna indicada."
    , problem: "Problema"
    , probableRootCause: "Causa raiz provável"
    , confidence: "Confiança"
    , threats: "Ameaças / causas"
    , preventiveBarriers: "Barreiras preventivas"
    , potentialConsequences: "Consequências potenciais"
    , mitigatingBarriers: "Barreiras mitigadoras / ações"
    , noClassifiedCause: "Sem causa classificada."
    , linkedBarrier: "Barreira relacionada"
    , expectedFunction: "Função esperada"
    , failure: "Falha"
    , controlLevel: "Nível de controle"
    , priority: "Prioridade"
    , owner: "Responsável sugerido"
    , verification: "Verificação"
    , linkedCause: "Causa vinculada"
    , reason: "Motivo"
    , answer: "Resposta"
    , notGeneratedCauses: "Causas ainda não geradas."
    , notGeneratedBarriers: "Barreiras ainda não analisadas."
    , notGeneratedSystemic: "Causas sistêmicas ainda não geradas."
    , notGeneratedActions: "Ações ainda não geradas."
    , reportNote: "Relatório gerado automaticamente a partir das informações fornecidas. A investigação deve ser validada por responsável técnico antes do encerramento."
  }
};

function t(key) {
  return i18n[currentLanguage][key] || i18n.en[key] || key;
}

function tv(value) {
  const translations = {
    en: {
      Low: "Low",
      Medium: "Medium",
      High: "High",
      Absent: "Absent",
      Failed: "Failed",
      Inadequate: "Inadequate",
      "Not evidenced": "Not evidenced",
      Effective: "Effective",
      Elimination: "Elimination",
      Substitution: "Substitution",
      "Engineering control": "Engineering control",
      "Administrative control": "Administrative control",
      PPE: "PPE",
      Baixa: "Low",
      Média: "Medium",
      Alta: "High"
    },
    es: {
      Low: "Baja",
      Medium: "Media",
      High: "Alta",
      Absent: "Ausente",
      Failed: "Falló",
      Inadequate: "Inadecuada",
      "Not evidenced": "No evidenciada",
      Effective: "Efectiva",
      Elimination: "Eliminación",
      Substitution: "Sustitución",
      "Engineering control": "Control de ingeniería",
      "Administrative control": "Control administrativo",
      PPE: "EPP",
      Baixa: "Baja",
      Média: "Media",
      Alta: "Alta"
    },
    pt: {
      Low: "Baixa",
      Medium: "Média",
      High: "Alta",
      Absent: "Ausente",
      Failed: "Falhou",
      Inadequate: "Inadequada",
      "Not evidenced": "Não evidenciada",
      Effective: "Efetiva",
      Elimination: "Eliminação",
      Substitution: "Substituição",
      "Engineering control": "Controle de engenharia",
      "Administrative control": "Controle administrativo",
      PPE: "EPI",
      Baixa: "Baixa",
      Média: "Média",
      Alta: "Alta"
    }
  };
  return translations[currentLanguage]?.[value] || value;
}

const requiredFields = ["description", "area", "activity", "equipment", "controls"];

const questionRules = [
  {
    id: "timeline",
    test: (data) => !hasAny(data.fullText, ["hora", "antes", "depois", "durante", "sequencia", "sequência"]),
    question: "Qual foi a sequência cronológica dos fatos, incluindo o que ocorreu imediatamente antes e depois?"
  },
  {
    id: "energy",
    test: (data) => mentions(data.fullText, ["maquina", "máquina", "equipamento", "eletrica", "elétrica", "pressao", "pressão", "energia", "movimento"]) && !hasAny(data.fullText, ["bloqueio", "loto", "desenergizado", "travamento"]),
    question: "Havia energia perigosa presente? O bloqueio, etiquetagem e teste de energia zero foram executados?"
  },
  {
    id: "procedure",
    test: (data) => !hasAny(data.fullText, ["procedimento", "instrução", "instrucao", "pop", "apr", "pts", "permissão", "permissao"]),
    question: "Existia procedimento, APR ou permissão formal para a atividade? A equipe conhecia e seguiu esse documento?"
  },
  {
    id: "ppe",
    test: (data) => !hasAny(data.fullText, ["epi", "luva", "oculos", "óculos", "capacete", "protetor", "cinto"]),
    question: "Quais EPIs eram obrigatórios, quais foram usados e estavam adequados para o risco?"
  },
  {
    id: "training",
    test: (data) => !hasAny(data.fullText, ["treinamento", "capacitado", "habilitado", "orientado", "experiência", "experiencia"]),
    question: "As pessoas envolvidas estavam treinadas, autorizadas e aptas para executar a tarefa?"
  },
  {
    id: "environment",
    test: (data) => mentions(data.fullText, ["queda", "escorreg", "trope", "piso", "acesso", "altura", "iluminação", "iluminacao"]) && !hasAny(data.fullText, ["sinalização", "sinalizacao", "barreira", "isolamento", "limpeza", "organização", "organizacao"]),
    question: "As condições do ambiente, acesso, iluminação, piso, organização e isolamento contribuíram para o evento?"
  },
  {
    id: "supervision",
    test: (data) => !hasAny(data.fullText, ["supervisão", "supervisao", "lider", "líder", "acompanhamento", "gestor"]),
    question: "Houve orientação e supervisão suficientes antes e durante a atividade?"
  }
];

const causeRules = [
  {
    category: "Método",
    terms: ["procedimento", "apr", "pop", "permissão", "permissao", "instrução", "instrucao"],
    missingCause: "Procedimento, APR ou permissão de trabalho insuficiente, inexistente ou não aplicado.",
    action: "Revisar o procedimento da tarefa, incluir análise de riscos por etapa e exigir validação antes da execução."
  },
  {
    category: "Pessoas",
    terms: ["treinamento", "capacitado", "habilitado", "orientado", "experiência", "experiencia"],
    missingCause: "Competência, treinamento ou autorização da equipe não evidenciados.",
    action: "Reciclar a equipe envolvida, registrar competência por atividade crítica e bloquear execução por pessoa não autorizada."
  },
  {
    category: "Máquina",
    terms: ["proteção", "protecao", "bloqueio", "loto", "intertravamento", "guarda", "sensor"],
    missingCause: "Controles de engenharia, proteção física ou bloqueio de energia não demonstrados como eficazes.",
    action: "Inspecionar proteções, intertravamentos e pontos de bloqueio; corrigir falhas antes da liberação operacional."
  },
  {
    category: "Ambiente",
    terms: ["piso", "acesso", "iluminação", "iluminacao", "sinalização", "sinalizacao", "barreira", "isolamento", "organização", "organizacao"],
    missingCause: "Condição do ambiente de trabalho pode ter contribuído para exposição ao risco.",
    action: "Corrigir condições de acesso, sinalização, isolamento, iluminação e organização da área."
  },
  {
    category: "Gestão",
    terms: ["supervisão", "supervisao", "auditoria", "inspeção", "inspecao", "gestão", "gestao", "lider", "líder"],
    missingCause: "Sistema de gestão não assegurou verificação prévia, supervisão ou disciplina operacional suficiente.",
    action: "Criar verificação de campo para atividades críticas, com responsável, frequência e evidência de fechamento."
  }
];

function addWitness(data = {}) {
  const node = witnessTemplate.content.firstElementChild.cloneNode(true);
  node.querySelector(".witness-name").value = data.name || "";
  node.querySelector(".witness-role").value = data.role || "";
  node.querySelector(".witness-statement").value = data.statement || "";
  node.querySelector(".remove-witness").addEventListener("click", () => {
    node.remove();
    updateProgress();
  });
  witnessList.appendChild(node);
  setLabelTextForInput(node.querySelector(".witness-name"), t("name"));
  setLabelTextForInput(node.querySelector(".witness-role"), t("role"));
  setLabelTextForInput(node.querySelector(".witness-statement"), t("statement"));
}

function getValue(id) {
  return document.querySelector(`#${id}`).value.trim();
}

function setValue(id, value) {
  document.querySelector(`#${id}`).value = value;
}

function setButtonLabel(button, label) {
  if (button?.lastChild) {
    button.lastChild.textContent = label;
  }
}

function setLabelText(selector, label) {
  const element = document.querySelector(selector);
  if (!element) return;
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) {
    textNode.textContent = `\n                ${label}\n                `;
  }
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  languageButtons.forEach((button) => button.classList.toggle("active", button.dataset.lang === language));

  document.querySelector(".eyebrow").textContent = t("titleEyebrow");
  document.querySelector(".topbar h2").textContent = t("title");
  apiStatus.textContent = t("apiLocal");
  setButtonLabel(exampleBtn, t("example"));
  setButtonLabel(analyzeBtn, t("analyze"));
  setButtonLabel(refineBtn, t("refine"));
  setButtonLabel(copyBtn, t("copy"));
  setButtonLabel(docxBtn, t("word"));
  setButtonLabel(pdfBtn, t("pdf"));
  setButtonLabel(addWitnessBtn, t("add"));

  document.querySelector('a[href="#ocorrido"]').textContent = t("occurrence");
  document.querySelector('a[href="#testemunhas"]').textContent = t("witness");
  document.querySelector('a[href="#perguntas"]').textContent = t("questions");
  document.querySelector('a[href="#resultado"]').textContent = t("result");

  document.querySelector("#ocorrido h3").textContent = t("occurrence");
  document.querySelector("#ocorrido .badge").textContent = t("required");
  document.querySelector("#testemunhas h3").textContent = t("witness");
  document.querySelector("#perguntas h3").textContent = t("questions");
  document.querySelector("#resultado h3").textContent = t("result");

  document.querySelector('[data-tab="timelineTab"]').textContent = t("timeline");
  document.querySelector('[data-tab="fiveWhysTab"]').textContent = t("fiveWhys");
  document.querySelector('[data-tab="faultTab"]').textContent = t("faultTree");
  document.querySelector('[data-tab="bowtieTab"]').textContent = t("bowtie");
  document.querySelector('[data-tab="ishikawaTab"]').textContent = t("ishikawa");

  document.querySelector("#timelineTab h4").textContent = t("timeline");
  document.querySelector("#fiveWhysTab h4").textContent = t("fiveWhys");
  document.querySelector("#faultTab h4").textContent = t("faultTree");
  document.querySelector("#bowtieTab h4").textContent = t("bowtie");
  document.querySelector("#ishikawaTab h4").textContent = t("ishikawa");
  document.querySelector("#rootCauses").previousElementSibling.textContent = t("rootCauses");
  document.querySelector("#barriers").previousElementSibling.textContent = t("barriers");
  document.querySelector("#systemicCauses").previousElementSibling.textContent = t("systemic");
  document.querySelector("#actions").previousElementSibling.textContent = t("actions");

  setLabelText('label:has(#eventType)', t("type"));
  setLabelText('label:has(#eventDate)', t("date"));
  setLabelText('label:has(#area)', t("area"));
  setLabelText('label:has(#severity)', t("severity"));
  setLabelText('label:has(#description)', t("description"));
  setLabelText('label:has(#activity)', t("activity"));
  setLabelText('label:has(#equipment)', t("equipment"));
  setLabelText('label:has(#injury)', t("injury"));
  setLabelText('label:has(#controls)', t("controls"));
  translateSelectOptions();
  translatePlaceholders();
  document.querySelectorAll(".witness-name").forEach((input) => setLabelTextForInput(input, t("name")));
  document.querySelectorAll(".witness-role").forEach((input) => setLabelTextForInput(input, t("role")));
  document.querySelectorAll(".witness-statement").forEach((input) => setLabelTextForInput(input, t("statement")));

  if (questionsList.classList.contains("empty-state")) questionsList.textContent = t("emptyQuestions");
  if (timelineView.classList.contains("empty-state")) timelineView.textContent = t("emptyTimeline");
  if (fiveWhysView.classList.contains("empty-state")) fiveWhysView.textContent = t("emptyFiveWhys");
  if (faultTree.classList.contains("empty-state")) faultTree.textContent = t("emptyFault");
  if (bowtieDiagram.classList.contains("empty-state")) bowtieDiagram.textContent = t("emptyBowtie");
  if (ishikawaDiagram.classList.contains("empty-state")) ishikawaDiagram.textContent = t("emptyIshikawa");
  updateQuestionCount();
}

function translateSelectOptions() {
  const optionText = {
    en: {
      "Acidente": "Accident",
      "Incidente": "Incident",
      "Quase acidente": "Near miss",
      "Condição insegura": "Unsafe condition",
      "Baixa": "Low",
      "Média": "Medium",
      "Alta": "High",
      "Crítica": "Critical",
      "Não informado": "Not informed",
      "Não": "No",
      "Sim, leve": "Yes, minor",
      "Sim, grave": "Yes, severe",
      "Fatalidade": "Fatality"
    },
    es: {
      "Acidente": "Accidente",
      "Incidente": "Incidente",
      "Quase acidente": "Casi accidente",
      "Condição insegura": "Condición insegura",
      "Baixa": "Baja",
      "Média": "Media",
      "Alta": "Alta",
      "Crítica": "Crítica",
      "Não informado": "No informado",
      "Não": "No",
      "Sim, leve": "Sí, leve",
      "Sim, grave": "Sí, grave",
      "Fatalidade": "Fatalidad"
    },
    pt: {
      "Acidente": "Acidente",
      "Incidente": "Incidente",
      "Quase acidente": "Quase acidente",
      "Condição insegura": "Condição insegura",
      "Baixa": "Baixa",
      "Média": "Média",
      "Alta": "Alta",
      "Crítica": "Crítica",
      "Não informado": "Não informado",
      "Não": "Não",
      "Sim, leve": "Sim, leve",
      "Sim, grave": "Sim, grave",
      "Fatalidade": "Fatalidade"
    }
  }[currentLanguage];

  document.querySelectorAll("option").forEach((option) => {
    option.textContent = optionText[option.value] || option.textContent;
  });
}

function translatePlaceholders() {
  const placeholders = {
    en: {
      area: "e.g., maintenance, production, warehouse",
      description: "Describe what happened, activity in progress, people involved, equipment, environment, hazardous energy, injury or damage, and sequence of events.",
      activity: "e.g., belt replacement, lifting, technical cleaning",
      equipment: "e.g., press, overhead crane, platform",
      controls: "e.g., risk assessment, lockout, fixed guard, permit",
      witnessName: "Witness name",
      witnessRole: "e.g., operator, technician, leader",
      witnessStatement: "Record observed facts, times, conditions, perceived deviations, and controls used."
    },
    es: {
      area: "Ej.: mantenimiento, producción, almacén",
      description: "Describa qué ocurrió, actividad en ejecución, personas involucradas, equipo, ambiente, energía peligrosa, lesión o daño y secuencia de hechos.",
      activity: "Ej.: cambio de correa, izaje, limpieza técnica",
      equipment: "Ej.: prensa, puente grúa, plataforma",
      controls: "Ej.: APR, bloqueo, protección fija, permiso",
      witnessName: "Nombre del testigo",
      witnessRole: "Ej.: operador, técnico, líder",
      witnessStatement: "Registre hechos observados, horarios, condiciones, desviaciones percibidas y controles utilizados."
    },
    pt: {
      area: "Ex.: manutenção, produção, almoxarifado",
      description: "Descreva o que aconteceu, atividade em execução, pessoas envolvidas, equipamento, ambiente, energia perigosa, lesão ou dano e sequência dos fatos.",
      activity: "Ex.: troca de correia, içamento, limpeza técnica",
      equipment: "Ex.: prensa, ponte rolante, plataforma",
      controls: "Ex.: APR, bloqueio, proteção fixa, permissão",
      witnessName: "Nome da testemunha",
      witnessRole: "Ex.: operador, técnico, líder",
      witnessStatement: "Registre fatos observados, horários, condições, desvios percebidos e controles usados."
    }
  }[currentLanguage];

  document.querySelector("#area").placeholder = placeholders.area;
  document.querySelector("#description").placeholder = placeholders.description;
  document.querySelector("#activity").placeholder = placeholders.activity;
  document.querySelector("#equipment").placeholder = placeholders.equipment;
  document.querySelector("#controls").placeholder = placeholders.controls;
  document.querySelectorAll(".witness-name").forEach((input) => { input.placeholder = placeholders.witnessName; });
  document.querySelectorAll(".witness-role").forEach((input) => { input.placeholder = placeholders.witnessRole; });
  document.querySelectorAll(".witness-statement").forEach((input) => { input.placeholder = placeholders.witnessStatement; });
}

function setLabelTextForInput(input, label) {
  const wrapper = input.closest("label");
  if (!wrapper) return;
  const textNode = [...wrapper.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = `\n            ${label}\n            `;
}

function updateQuestionCount() {
  const count = questionsList.querySelectorAll(".question-item").length;
  questionCount.textContent = `${count} ${count === 1 ? t("pending") : t("pendingPlural")}`;
}

function getData() {
  const witnesses = [...document.querySelectorAll(".witness-entry")].map((entry) => ({
    name: entry.querySelector(".witness-name").value.trim(),
    role: entry.querySelector(".witness-role").value.trim(),
    statement: entry.querySelector(".witness-statement").value.trim()
  }));
  const followUpResponses = getQuestionResponses();

  const data = {
    language: currentLanguage,
    eventType: getValue("eventType"),
    eventDate: getValue("eventDate"),
    area: getValue("area"),
    severity: getValue("severity"),
    description: getValue("description"),
    activity: getValue("activity"),
    equipment: getValue("equipment"),
    injury: getValue("injury"),
    controls: getValue("controls"),
    witnesses,
    followUpResponses
  };
  data.fullText = [
    data.description,
    data.area,
    data.activity,
    data.equipment,
    data.controls,
    ...witnesses.flatMap((witness) => [witness.role, witness.statement]),
    ...followUpResponses.flatMap((item) => [item.question, item.answer])
  ].join(" ").toLowerCase();
  return data;
}

function getQuestionResponses() {
  return [...questionsList.querySelectorAll(".question-item")].map((item) => ({
    question: item.querySelector("strong")?.textContent.replace(/^\d+\.\s*/, "") || "",
    reason: item.querySelector("span")?.textContent || "",
    answer: item.querySelector("textarea")?.value.trim() || ""
  }));
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasAny(text, terms) {
  const plainText = normalize(text);
  return terms.some((term) => plainText.includes(normalize(term)));
}

function mentions(text, terms) {
  return hasAny(text, terms);
}

function buildQuestions(data) {
  return questionRules.filter((rule) => rule.test(data)).map((rule) => rule.question);
}

function inferRootCauses(data, questions) {
  const causes = causeRules.map((rule) => {
    const evidenceFound = hasAny(data.fullText, rule.terms);
    return {
      category: rule.category,
      cause: evidenceFound
        ? `Possível fragilidade em ${rule.category.toLowerCase()} identificada nos relatos e controles descritos.`
        : rule.missingCause,
      action: rule.action,
      confidence: evidenceFound ? "Média" : "Alta"
    };
  });

  if (data.severity === "Alta" || data.severity === "Crítica" || data.injury.includes("grave") || data.injury === "Fatalidade") {
    causes.unshift({
      category: "Barreiras críticas",
      cause: "Evento com severidade elevada indica falha ou ausência de barreiras críticas capazes de impedir lesão grave.",
      action: "Mapear barreiras críticas da atividade, definir dono de cada barreira e auditar sua eficácia antes da retomada.",
      confidence: "Alta"
    });
  }

  if (questions.length >= 4) {
    causes.push({
      category: "Qualidade da investigação",
      cause: "Informações essenciais ainda não estão claras, aumentando risco de tratar sintomas em vez das causas raiz.",
      action: "Complementar entrevistas, fotos, evidências documentais e linha do tempo antes de encerrar a análise.",
      confidence: "Alta"
    });
  }

  return causes.slice(0, 6);
}

function renderQuestions(questions, options = {}) {
  const append = Boolean(options.append);
  const existingResponses = append ? getQuestionResponses() : [];
  const existingKeys = new Set(existingResponses.map((item) => normalizeQuestion(item.question)));
  const mergedQuestions = append
    ? [
      ...existingResponses,
      ...questions
        .map((question) => normalizeQuestionItem(question))
        .filter((question) => {
          const key = normalizeQuestion(question.question);
          if (!key || existingKeys.has(key)) {
            return false;
          }
          existingKeys.add(key);
          return true;
        })
    ]
    : questions.map((question) => normalizeQuestionItem(question));

  questionCount.textContent = `${mergedQuestions.length} ${mergedQuestions.length === 1 ? t("pending") : t("pendingPlural")}`;
  questionsList.className = mergedQuestions.length ? "questions-list" : "questions-list empty-state";
  questionsList.innerHTML = "";
  refineBtn.classList.toggle("hidden", !mergedQuestions.length);

  if (!mergedQuestions.length) {
    questionsList.textContent = t("noQuestions");
    return;
  }

  mergedQuestions.forEach((question, index) => {
    const questionText = question.question;
    const reason = question.reason;
    const item = document.createElement("label");
    item.className = "question-item";
    item.innerHTML = `<strong>${index + 1}. ${escapeHtml(questionText)}</strong>${reason ? `<span>${escapeHtml(reason)}</span>` : ""}<textarea rows="3" placeholder="${escapeHtml(t("answerPlaceholder"))}">${escapeHtml(question.answer || "")}</textarea>`;
    questionsList.appendChild(item);
  });
}

function normalizeQuestionItem(question) {
  return typeof question === "string"
    ? { question, reason: "", answer: "" }
    : {
      question: question.question || "",
      reason: question.reason || "",
      answer: question.answer || ""
    };
}

function normalizeQuestion(question) {
  return normalize(question)
    .replace(/^\d+\s*[.)-]?\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function renderFaultTree(data, causes, aiTree) {
  const topEvent = aiTree?.topEvent || `${data.eventType} em ${data.area || "área não informada"}`;
  const branchesData = aiTree?.branches?.length
    ? aiTree.branches.map((branch) => ({
      category: branch.category,
      cause: [
        branch.rootCause,
        ...(branch.contributingFactors || []).map((factor) => `Fator: ${factor}`)
      ].join(" ")
    }))
    : causes.slice(0, 5);

  const branches = branchesData.slice(0, 5).map((cause) => `
    <div class="tree-branch">
      <div class="tree-node category">${escapeHtml(cause.category)}</div>
      <div class="tree-node cause">${escapeHtml(cause.cause || cause.rootCause)}${cause.confidence ? `<br><small>${escapeHtml(t("confidence"))}: ${escapeHtml(tv(cause.confidence))}</small>` : ""}</div>
    </div>
  `).join("");

  faultTree.className = "fault-tree";
  faultTree.innerHTML = `
    <div class="tree">
      <div class="tree-node top">
        <strong>${escapeHtml(topEvent)}</strong><br>
        <span>${escapeHtml(data.activity || "Atividade não informada")} | Severidade potencial: ${escapeHtml(data.severity)}</span>
      </div>
      <div class="tree-branches">${branches}</div>
    </div>
  `;
}

function renderTimeline(timeline = []) {
  timelineView.className = timeline.length ? "timeline-view" : "timeline-view empty-state";
  if (!timeline.length) {
    timelineView.textContent = t("emptyTimeline");
    return;
  }

  timelineView.innerHTML = `
    <div class="timeline-list">
      ${timeline.map((item) => `
        <article class="timeline-item">
          <div class="timeline-card">
            <strong>${escapeHtml(item.moment)}</strong>
            <p>${escapeHtml(item.event)}</p>
            <p class="timeline-meta">${escapeHtml(t("evidence"))}: ${escapeHtml(item.evidence || t("notEvidenced"))}</p>
            <p class="timeline-meta">${escapeHtml(t("gap"))}: ${escapeHtml(item.gap || t("noGap"))}</p>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderFiveWhys(fiveWhys = []) {
  fiveWhysView.className = fiveWhys.length ? "five-whys-view" : "five-whys-view empty-state";
  if (!fiveWhys.length) {
    fiveWhysView.textContent = t("emptyFiveWhys");
    return;
  }

  fiveWhysView.innerHTML = `
    <div class="why-stack">
      ${fiveWhys.map((chain) => `
        <article class="why-card">
          <strong>${escapeHtml(t("problem"))}: ${escapeHtml(chain.problem)}</strong>
          <div class="why-chain">
            ${(chain.whys || []).map((step) => `
              <div class="why-step">
                <b>${escapeHtml(step.why)}</b><br>
                ${escapeHtml(step.answer)}
                <p class="why-meta">${escapeHtml(t("evidence"))}: ${escapeHtml(step.evidence || t("notEvidenced"))}</p>
              </div>
            `).join("")}
          </div>
          <p class="why-meta"><b>${escapeHtml(t("probableRootCause"))}:</b> ${escapeHtml(chain.probableRootCause)}</p>
          <p class="why-meta">${escapeHtml(t("evidence"))}: ${escapeHtml(chain.evidence)} | ${escapeHtml(t("confidence"))}: ${escapeHtml(tv(chain.confidence))}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderBowtie(data, analysis = {}) {
  const topEvent = analysis.faultTree?.topEvent || `${data.eventType} em ${data.area || "área não informada"}`;
  const threats = (analysis.rootCauses || []).slice(0, 5).map((cause) => cause.cause || cause.category);
  const preventive = (analysis.barrierAnalysis || [])
    .filter((barrier) => barrier.status !== "Effective" && barrier.status !== "Efetiva")
    .slice(0, 5)
    .map((barrier) => `${barrier.barrier}: ${tv(barrier.status)}`);
  const mitigations = (analysis.improvementActions || [])
    .slice(0, 5)
    .map((action) => `${tv(action.controlHierarchyLevel)}: ${action.action}`);
  const consequences = buildConsequences(data, analysis);

  bowtieDiagram.className = "bowtie-diagram";
  bowtieDiagram.innerHTML = `
    <div class="bowtie-grid">
      <div class="bowtie-column">
        ${bowtieNode(t("threats"), threats)}
        ${bowtieNode(t("preventiveBarriers"), preventive)}
      </div>
      <div class="bowtie-center">
        <div class="bowtie-arrow">→</div>
        <div class="bowtie-event">${escapeHtml(topEvent)}</div>
        <div class="bowtie-arrow">→</div>
      </div>
      <div class="bowtie-column">
        ${bowtieNode(t("potentialConsequences"), consequences)}
        ${bowtieNode(t("mitigatingBarriers"), mitigations)}
      </div>
    </div>
  `;
}

function renderIshikawa(data, analysis = {}) {
  const topEvent = analysis.faultTree?.topEvent || `${data.eventType} em ${data.area || "área não informada"}`;
  const groups = groupIshikawaCauses(analysis);

  ishikawaDiagram.className = "ishikawa-diagram";
  ishikawaDiagram.innerHTML = `
    <div class="fishbone">
      <div class="fish-spines">
        ${Object.entries(groups).map(([category, items]) => fishNode(category, items)).join("")}
      </div>
      <div class="fish-head">${escapeHtml(topEvent)}</div>
    </div>
  `;
}

function bowtieNode(title, items) {
  const list = items.length ? items : ["Não evidenciado nos dados atuais."];
  return `
    <article class="bowtie-node">
      <h5>${escapeHtml(title)}</h5>
      <ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function fishNode(title, items) {
  const list = items.length ? items.slice(0, 4) : [t("noClassifiedCause")];
  return `
    <article class="fish-node">
      <h5>${escapeHtml(title)}</h5>
      <ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function buildConsequences(data, analysis) {
  const consequences = [];
  if (data.injury && data.injury !== "Não informado" && data.injury !== "Não") {
    consequences.push(`Lesão informada: ${data.injury}`);
  }
  if (data.severity === "Alta" || data.severity === "Crítica") {
    consequences.push(`Potencial de severidade ${data.severity.toLowerCase()}`);
  }
  consequences.push(...(analysis.limitations || []).slice(0, 3).map((item) => `Incerteza: ${item}`));
  return consequences.length ? consequences : ["Lesão, dano material, parada operacional ou recorrência do evento."];
}

function groupIshikawaCauses(analysis) {
  const groups = {
    Método: [],
    Máquina: [],
    Pessoas: [],
    Ambiente: [],
    Gestão: [],
    Materiais: []
  };

  (analysis.rootCauses || []).forEach((cause) => {
    const category = normalizeIshikawaCategory(cause.category);
    groups[category].push(cause.cause);
  });

  (analysis.systemicCauses || []).forEach((cause) => {
    groups.Gestão.push(`${cause.managementSystemElement}: ${cause.cause}`);
  });

  (analysis.barrierAnalysis || []).forEach((barrier) => {
    const category = normalizeIshikawaCategory(barrier.barrier);
    groups[category].push(`${barrier.barrier}: ${barrier.failureMode}`);
  });

  return groups;
}

function normalizeIshikawaCategory(value = "") {
  const text = normalize(value);
  if (hasAny(text, ["maquina", "equipamento", "protecao", "bloqueio", "intertravamento", "energia"])) return "Máquina";
  if (hasAny(text, ["treinamento", "competencia", "pessoa", "equipe", "comportamento"])) return "Pessoas";
  if (hasAny(text, ["ambiente", "piso", "acesso", "iluminacao", "sinalizacao", "area"])) return "Ambiente";
  if (hasAny(text, ["gestao", "supervisao", "planejamento", "auditoria", "lideranca"])) return "Gestão";
  if (hasAny(text, ["material", "ferramenta", "insumo", "peca"])) return "Materiais";
  return "Método";
}

function renderList(target, items, mapper) {
  target.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = mapper(item);
    target.appendChild(li);
  });
}

async function analyze(options = {}) {
  const data = getData();
  setLoading(true);

  try {
    const aiResult = await requestAiAnalysis(data);
    renderAiAnalysis(data, aiResult, options);
    setApiStatus(`OpenAI: ${aiResult.model || "active"}`, "online");
  } catch (error) {
    console.warn(error);
    renderLocalAnalysis(data, options);
    setApiStatus(`${t("apiLocal")}: ${error.message}`, "warning");
  } finally {
    setLoading(false);
  }
}

async function requestAiAnalysis(data) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "OpenAI analysis failed");
  }
  return payload;
}

function renderAiAnalysis(data, payload, options = {}) {
  const analysis = payload.analysis;
  renderQuestions(analysis.followUpQuestions || [], { append: options.appendQuestions });
  renderTimeline(analysis.timeline || []);
  renderFiveWhys(analysis.fiveWhys || []);
  renderFaultTree(data, analysis.rootCauses || [], analysis.faultTree);
  renderBowtie(data, analysis);
  renderIshikawa(data, analysis);
  renderList(rootCauses, analysis.rootCauses || [], (cause) => `${cause.category}: ${cause.cause} ${t("linkedBarrier")}: ${cause.linkedBarrier}. ${t("evidence")}: ${cause.evidence} ${t("confidence")}: ${tv(cause.confidence)}.`);
  renderList(barriers, analysis.barrierAnalysis || [], (barrier) => `${barrier.barrier}: ${tv(barrier.status)}. ${t("expectedFunction")}: ${barrier.expectedFunction}. ${t("failure")}: ${barrier.failureMode}. ${t("evidence")}: ${barrier.evidence}.`);
  renderList(systemicCauses, analysis.systemicCauses || [], (cause) => `${cause.managementSystemElement}: ${cause.cause} ${t("evidence")}: ${cause.evidence} ${t("confidence")}: ${tv(cause.confidence)}.`);
  renderList(actions, analysis.improvementActions || [], (action) => `${action.action} ${t("controlLevel")}: ${tv(action.controlHierarchyLevel)}. ${t("priority")}: ${tv(action.priority)}. ${t("owner")}: ${action.ownerSuggestion}. ${t("verification")}: ${action.verification}. ${t("linkedCause")}: ${action.linkedCause}.`);
  updateProgress();
}

function renderLocalAnalysis(data, options = {}) {
  const questions = buildQuestions(data);
  const causes = inferRootCauses(data, questions);

  renderQuestions(questions, { append: options.appendQuestions });
  renderTimeline(buildLocalTimeline(data));
  renderFiveWhys(buildLocalFiveWhys(causes));
  renderFaultTree(data, causes);
  renderBowtie(data, {
    rootCauses: causes,
    improvementActions: causes.map((cause) => ({ controlHierarchyLevel: "Controle administrativo", action: cause.action })),
    faultTree: { topEvent: `${data.eventType} em ${data.area || "área não informada"}` }
  });
  renderIshikawa(data, {
    rootCauses: causes,
    faultTree: { topEvent: `${data.eventType} em ${data.area || "área não informada"}` }
  });
  renderList(rootCauses, causes, (cause) => `${cause.category}: ${cause.cause}`);
  renderList(barriers, [], () => "");
  renderList(systemicCauses, [], () => "");
  renderList(actions, causes, (cause) => cause.action);
  updateProgress();
}

function buildLocalTimeline(data) {
  return [
    {
      moment: "Antes do evento",
      event: data.activity || "Atividade não informada.",
      evidence: data.controls || "Controles não informados.",
      gap: "Linha do tempo detalhada não evidenciada."
    },
    {
      moment: "Durante o evento",
      event: data.description || "Descrição não informada.",
      evidence: data.witnesses.find((witness) => witness.statement)?.statement || "Sem depoimento registrado.",
      gap: "Horário, sequência exata e barreiras efetivas precisam ser confirmados."
    },
    {
      moment: "Após o evento",
      event: `Lesão/dano informado: ${data.injury}.`,
      evidence: "Informação fornecida no formulário.",
      gap: "Ações imediatas e preservação de evidências não informadas."
    }
  ];
}

function buildLocalFiveWhys(causes) {
  return causes.slice(0, 2).map((cause) => ({
    problem: cause.cause,
    whys: [
      { why: "Por quê 1?", answer: "Porque uma barreira ou controle não foi demonstrado como eficaz.", evidence: cause.cause },
      { why: "Por quê 2?", answer: "Porque o método de trabalho pode não ter controlado adequadamente o risco.", evidence: cause.category },
      { why: "Por quê 3?", answer: "Porque há lacunas de evidência sobre procedimento, autorização ou supervisão.", evidence: "Dados do formulário incompletos." },
      { why: "Por quê 4?", answer: "Porque o sistema de gestão pode não exigir verificação formal antes da tarefa.", evidence: "Inferência local." },
      { why: "Por quê 5?", answer: "Porque controles sistêmicos de prevenção e verificação podem estar frágeis.", evidence: "Inferência local." }
    ],
    probableRootCause: cause.cause,
    evidence: cause.cause,
    confidence: cause.confidence || "Média"
  }));
}

function setLoading(isLoading) {
  analyzeBtn.disabled = isLoading;
  refineBtn.disabled = isLoading;
  analyzeBtn.lastChild.textContent = isLoading ? t("analyzing") : t("analyze");
  refineBtn.lastChild.textContent = isLoading ? t("refining") : t("refine");
}

function setApiStatus(text, tone) {
  apiStatus.textContent = text;
  apiStatus.className = `api-status ${tone || ""}`.trim();
}

function updateProgress() {
  const data = getData();
  const filledRequired = requiredFields.filter((field) => data[field]).length;
  const hasWitness = data.witnesses.some((witness) => witness.statement);
  const score = Math.round(((filledRequired + (hasWitness ? 1 : 0)) / (requiredFields.length + 1)) * 100);
  progressBar.style.width = `${score}%`;
  progressText.textContent = `${score}%`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildReportText() {
  const data = getData();
  const causes = [...rootCauses.querySelectorAll("li")].map((li) => li.textContent);
  const barrierItems = [...barriers.querySelectorAll("li")].map((li) => li.textContent);
  const systemicItems = [...systemicCauses.querySelectorAll("li")].map((li) => li.textContent);
  const actionItems = [...actions.querySelectorAll("li")].map((li) => li.textContent);
  const timelineItems = [...timelineView.querySelectorAll(".timeline-item")].map((item) => item.textContent.trim().replace(/\s+/g, " "));
  const fiveWhysItems = [...fiveWhysView.querySelectorAll(".why-card")].map((item) => item.textContent.trim().replace(/\s+/g, " "));
  const questions = [...questionsList.querySelectorAll(".question-item strong")].map((item) => item.textContent);

  return [
    currentLanguage === "en" ? "OCCUPATIONAL SAFETY RCA ANALYSIS" : currentLanguage === "es" ? "ANÁLISIS RCA DE SEGURIDAD LABORAL" : "ANÁLISE RCA DE SEGURANÇA DO TRABALHO",
    "",
    `${t("type")}: ${data.eventType}`,
    `${t("date")}: ${data.eventDate || "-"}`,
    `${t("area")}: ${data.area || "-"}`,
    `${t("severity")}: ${data.severity}`,
    `${t("activity")}: ${data.activity || "-"}`,
    `${t("equipment")}: ${data.equipment || "-"}`,
    `${t("injury")}: ${data.injury}`,
    `${t("controls")}: ${data.controls || "-"}`,
    "",
    `${t("description")}:`,
    data.description || "-",
    "",
    `${t("witness")}:`,
    ...data.witnesses.map((witness, index) => `${index + 1}. ${witness.name || "-"} (${witness.role || "-"}): ${witness.statement || "-"}`),
    "",
    `${t("questions")}:`,
    ...(questions.length ? questions : [t("noQuestions")]),
    "",
    `${t("timeline")}:`,
    ...(timelineItems.length ? timelineItems.map((item, index) => `${index + 1}. ${item}`) : ["Análise ainda não gerada."]),
    "",
    `${t("fiveWhys")}:`,
    ...(fiveWhysItems.length ? fiveWhysItems.map((item, index) => `${index + 1}. ${item}`) : ["Análise ainda não gerada."]),
    "",
    `${t("rootCauses")}:`,
    ...(causes.length ? causes.map((cause, index) => `${index + 1}. ${cause}`) : ["Análise ainda não gerada."]),
    "",
    `${t("barriers")}:`,
    ...(barrierItems.length ? barrierItems.map((barrier, index) => `${index + 1}. ${barrier}`) : ["Análise ainda não gerada."]),
    "",
    `${t("systemic")}:`,
    ...(systemicItems.length ? systemicItems.map((cause, index) => `${index + 1}. ${cause}`) : ["Análise ainda não gerada."]),
    "",
    `${t("actions")}:`,
    ...(actionItems.length ? actionItems.map((action, index) => `${index + 1}. ${action}`) : ["Análise ainda não gerada."])
  ].join("\n");
}

function buildReportData() {
  const data = getData();
  return {
    data,
    generatedAt: new Date().toLocaleString("pt-BR"),
    apiStatus: apiStatus.textContent,
    questions: [...questionsList.querySelectorAll(".question-item")].map((item) => ({
      question: item.querySelector("strong")?.textContent || "",
      reason: item.querySelector("span")?.textContent || "",
      answer: item.querySelector("textarea")?.value.trim() || ""
    })),
    timelineItems: [...timelineView.querySelectorAll(".timeline-item")].map((item) => item.textContent.trim().replace(/\s+/g, " ")),
    fiveWhysItems: [...fiveWhysView.querySelectorAll(".why-card")].map((item) => item.textContent.trim().replace(/\s+/g, " ")),
    causes: [...rootCauses.querySelectorAll("li")].map((li) => li.textContent),
    barrierItems: [...barriers.querySelectorAll("li")].map((li) => li.textContent),
    systemicItems: [...systemicCauses.querySelectorAll("li")].map((li) => li.textContent),
    actionItems: [...actions.querySelectorAll("li")].map((li) => li.textContent),
    treeText: faultTree.textContent.trim()
  };
}

async function generateDocxReport() {
  const report = buildReportData();
  if (!report.causes.length && !report.actionItems.length) {
    await analyze();
    generateDocxReport();
    return;
  }

  const blob = buildDocxBlob(report);
  const fileName = `relatorio-rca-${slugify(report.data.area || "investigacao")}.docx`;
  downloadBlob(blob, fileName);
}

async function generatePdfReport() {
  const report = buildReportData();
  if (!report.causes.length && !report.actionItems.length) {
    await analyze();
    generatePdfReport();
    return;
  }

  const printWindow = window.open("", "_blank", "width=1100,height=800");
  if (!printWindow) {
    alert("Permita pop-ups para imprimir ou salvar o relatório em PDF.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPrintableReport(report));
  printWindow.document.close();
  printWindow.focus();
  printWindow.addEventListener("load", () => printWindow.print());
}

function buildPrintableReport(report) {
  const { data } = report;
  return `<!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>${escapeHtml(reportTitle())}</title>
      <style>
        @page { margin: 16mm; }
        body { color: #17202f; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.45; }
        h1 { color: #183f7f; font-size: 22px; margin: 0 0 4px; }
        h2 { color: #183f7f; font-size: 15px; margin: 18px 0 8px; padding-bottom: 5px; border-bottom: 1px solid #dbe2ea; }
        p { margin: 0 0 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th, td { border: 1px solid #dbe2ea; padding: 7px; text-align: left; vertical-align: top; }
        th { background: #eef4ff; color: #183f7f; }
        li { margin-bottom: 7px; }
        .meta { color: #647084; margin-bottom: 16px; }
        .fault-tree { white-space: pre-line; border: 1px solid #dbe2ea; padding: 10px; background: #f7f9fc; }
      </style>
    </head>
    <body>
      <h1>${escapeHtml(reportTitle())}</h1>
      <p class="meta">Gerado em ${escapeHtml(report.generatedAt)} | ${escapeHtml(report.apiStatus)}</p>
      <h2>1. ${escapeHtml(currentLanguage === "en" ? "Identification" : currentLanguage === "es" ? "Identificación" : "Identificação")}</h2>
      <table><tbody>
        ${printRow(t("type"), data.eventType)}
        ${printRow(t("date"), data.eventDate || "-")}
        ${printRow(t("area"), data.area || "-")}
        ${printRow(t("severity"), data.severity)}
        ${printRow(t("activity"), data.activity || "-")}
        ${printRow(t("equipment"), data.equipment || "-")}
        ${printRow(t("injury"), data.injury)}
        ${printRow(t("controls"), data.controls || "-")}
      </tbody></table>
      <h2>2. ${escapeHtml(t("description"))}</h2>
      <p>${escapeHtml(data.description || "Não informada")}</p>
      <h2>3. ${escapeHtml(t("witness"))}</h2>
      ${printWitnesses(data.witnesses)}
      <h2>4. ${escapeHtml(t("questions"))}</h2>
      ${report.questions.length ? printQuestions(report.questions) : "<p>Nenhuma pergunta complementar registrada.</p>"}
      <h2>5. ${escapeHtml(t("timeline"))}</h2>
      ${report.timelineItems.length ? listItems(report.timelineItems) : "<p>Linha do tempo ainda não gerada.</p>"}
      <h2>6. ${escapeHtml(t("fiveWhys"))}</h2>
      ${report.fiveWhysItems.length ? listItems(report.fiveWhysItems) : "<p>5 Porquês ainda não gerados.</p>"}
      <h2>7. ${escapeHtml(t("faultTree"))}</h2>
      <div class="fault-tree">${escapeHtml(report.treeText || "Árvore ainda não gerada.")}</div>
      <h2>8. ${escapeHtml(t("rootCauses"))}</h2>
      ${report.causes.length ? listItems(report.causes) : `<p>${escapeHtml(t("notGeneratedCauses"))}</p>`}
      <h2>9. ${escapeHtml(t("barriers"))}</h2>
      ${report.barrierItems.length ? listItems(report.barrierItems) : `<p>${escapeHtml(t("notGeneratedBarriers"))}</p>`}
      <h2>10. ${escapeHtml(t("systemic"))}</h2>
      ${report.systemicItems.length ? listItems(report.systemicItems) : `<p>${escapeHtml(t("notGeneratedSystemic"))}</p>`}
      <h2>11. ${escapeHtml(t("actions"))}</h2>
      ${report.actionItems.length ? listItems(report.actionItems) : `<p>${escapeHtml(t("notGeneratedActions"))}</p>`}
    </body>
  </html>`;
}

function reportTitle() {
  if (currentLanguage === "en") return "RCA Investigation Report";
  if (currentLanguage === "es") return "Informe de Investigación RCA";
  return "Relatório de Investigação RCA";
}

function printRow(label, value) {
  return `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`;
}

function printWitnesses(witnesses) {
  if (!witnesses.length) {
    return "<p>Nenhum depoimento registrado.</p>";
  }
  return `<table><thead><tr><th>Nome</th><th>Função</th><th>Depoimento</th></tr></thead><tbody>${witnesses.map((witness) => `<tr><td>${escapeHtml(witness.name || "Não informado")}</td><td>${escapeHtml(witness.role || "Não informada")}</td><td>${escapeHtml(witness.statement || "Sem depoimento")}</td></tr>`).join("")}</tbody></table>`;
}

function printQuestions(questions) {
  return `<ol>${questions.map((item) => `<li><strong>${escapeHtml(item.question)}</strong>${item.reason ? `<br>${escapeHtml(item.reason)}` : ""}${item.answer ? `<br><em>${escapeHtml(t("answer"))}: ${escapeHtml(item.answer)}</em>` : ""}</li>`).join("")}</ol>`;
}

function buildDocxBlob(report) {
  const documentXml = buildDocumentXml(report);
  const files = {
    "[Content_Types].xml": contentTypesXml(),
    "_rels/.rels": packageRelsXml(),
    "word/_rels/document.xml.rels": documentRelsXml(),
    "word/styles.xml": stylesXml(),
    "word/document.xml": documentXml
  };
  return new Blob([createZip(files)], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  });
}

function buildDocumentXml(report) {
  const { data } = report;
  const fields = [
    [t("type"), data.eventType],
    [t("date"), data.eventDate || "-"],
    [t("area"), data.area || "-"],
    [t("severity"), data.severity],
    [t("activity"), data.activity || "-"],
    [t("equipment"), data.equipment || "-"],
    [t("injury"), data.injury],
    [t("controls"), data.controls || "-"]
  ];

  const witnessRows = data.witnesses.length
    ? data.witnesses.map((witness, index) => tableRow([
      String(index + 1),
      witness.name || "Não informado",
      witness.role || "Não informada",
      witness.statement || "Sem depoimento"
    ])).join("")
    : tableRow(["-", "Nenhum depoimento registrado.", "", ""]);

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraph(reportTitle(), "Title")}
    ${paragraph(currentLanguage === "en" ? "Occupational safety accident/incident analysis" : currentLanguage === "es" ? "Análisis de accidente/incidente de seguridad laboral" : "Análise de acidente/incidente de segurança do trabalho", "Subtitle")}
    ${paragraph(`Gerado em ${report.generatedAt} | ${report.apiStatus}`, "Small")}
    ${heading(`1. ${currentLanguage === "en" ? "Occurrence Identification" : currentLanguage === "es" ? "Identificación del Suceso" : "Identificação do Ocorrido"}`)}
    ${keyValueTable(fields)}
    ${heading(`2. ${currentLanguage === "en" ? "Event Description" : currentLanguage === "es" ? "Descripción del Evento" : "Descrição do Evento"}`)}
    ${paragraph(data.description || "Não informada")}
    ${heading(`3. ${t("witness")}`)}
    ${table([
      tableRow(["#", "Nome", "Função", "Depoimento"], true),
      witnessRows
    ].join(""))}
    ${heading(`4. ${t("questions")}`)}
    ${report.questions.length ? numberedParagraphs(report.questions.map(formatQuestion)) : paragraph("Nenhuma pergunta complementar registrada.")}
    ${heading(`5. ${t("timeline")}`)}
    ${report.timelineItems.length ? numberedParagraphs(report.timelineItems) : paragraph("Linha do tempo ainda não gerada.")}
    ${heading(`6. ${t("fiveWhys")}`)}
    ${report.fiveWhysItems.length ? numberedParagraphs(report.fiveWhysItems) : paragraph("5 Porquês ainda não gerados.")}
    ${heading(`7. ${t("faultTree")}`)}
    ${paragraph(report.treeText || t("emptyFault"))}
    ${heading(`8. ${t("rootCauses")}`)}
    ${report.causes.length ? numberedParagraphs(report.causes) : paragraph(t("notGeneratedCauses"))}
    ${heading(`9. ${t("barriers")}`)}
    ${report.barrierItems.length ? numberedParagraphs(report.barrierItems) : paragraph(t("notGeneratedBarriers"))}
    ${heading(`10. ${t("systemic")}`)}
    ${report.systemicItems.length ? numberedParagraphs(report.systemicItems) : paragraph(t("notGeneratedSystemic"))}
    ${heading(`11. ${t("actions")}`)}
    ${report.actionItems.length ? numberedParagraphs(report.actionItems) : paragraph(t("notGeneratedActions"))}
    ${paragraph(t("reportNote"), "Small")}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

function reportField(label, value) {
  return `<div class="box"><span class="label">${escapeHtml(label)}</span><span class="value">${escapeHtml(value)}</span></div>`;
}

function listItems(items) {
  return `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
}

function listQuestions(questions) {
  return `<ol>${questions.map((item) => `
    <li>
      <strong>${escapeHtml(item.question)}</strong>
      ${item.reason ? `<br><span>${escapeHtml(item.reason)}</span>` : ""}
      ${item.answer ? `<br><em>${escapeHtml(t("answer"))}: ${escapeHtml(item.answer)}</em>` : ""}
    </li>
  `).join("")}</ol>`;
}

function contentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;
}

function packageRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
}

function documentRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function stylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="160"/></w:pPr><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:b/><w:color w:val="183F7F"/><w:sz w:val="36"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="220"/></w:pPr><w:rPr><w:color w:val="647084"/><w:sz w:val="22"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="Heading 1"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="260" w:after="100"/></w:pPr><w:rPr><w:b/><w:color w:val="183F7F"/><w:sz w:val="26"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Small"><w:name w:val="Small"/><w:basedOn w:val="Normal"/><w:rPr><w:color w:val="647084"/><w:sz w:val="18"/></w:rPr></w:style>
</w:styles>`;
}

function heading(text) {
  return paragraph(text, "Heading1");
}

function paragraph(text, style = "Normal") {
  return `<w:p><w:pPr><w:pStyle w:val="${style}"/></w:pPr><w:r><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p>`;
}

function numberedParagraphs(items) {
  return items.map((item, index) => paragraph(`${index + 1}. ${item}`)).join("");
}

function formatQuestion(item) {
  return [
    item.question,
    item.reason ? `${t("reason")}: ${item.reason}` : "",
    item.answer ? `${t("answer")}: ${item.answer}` : ""
  ].filter(Boolean).join(" ");
}

function keyValueTable(fields) {
  const rows = [];
  for (let index = 0; index < fields.length; index += 2) {
    const first = fields[index];
    const second = fields[index + 1] || ["", ""];
    rows.push(tableRow([`${first[0]}: ${first[1]}`, `${second[0]}: ${second[1]}`]));
  }
  return table(rows.join(""));
}

function table(rows) {
  return `<w:tbl>
    <w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="DBE2EA"/><w:left w:val="single" w:sz="4" w:color="DBE2EA"/><w:bottom w:val="single" w:sz="4" w:color="DBE2EA"/><w:right w:val="single" w:sz="4" w:color="DBE2EA"/><w:insideH w:val="single" w:sz="4" w:color="DBE2EA"/><w:insideV w:val="single" w:sz="4" w:color="DBE2EA"/></w:tblBorders></w:tblPr>
    ${rows}
  </w:tbl>`;
}

function tableRow(cells, isHeader = false) {
  return `<w:tr>${cells.map((cell) => tableCell(cell, isHeader)).join("")}</w:tr>`;
}

function tableCell(text, isHeader) {
  const fill = isHeader ? '<w:shd w:fill="EEF4FF"/>' : "";
  const bold = isHeader ? "<w:b/>" : "";
  return `<w:tc><w:tcPr><w:tcW w:w="2340" w:type="dxa"/>${fill}</w:tcPr><w:p><w:r><w:rPr>${bold}</w:rPr><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r></w:p></w:tc>`;
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  Object.entries(files).forEach(([name, content]) => {
    const nameBytes = encoder.encode(name);
    const data = encoder.encode(content);
    const crc = crc32(data);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(8, 0, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, data.length, true);
    localView.setUint32(22, data.length, true);
    localView.setUint16(26, nameBytes.length, true);
    localHeader.set(nameBytes, 30);
    localParts.push(localHeader, data);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, data.length, true);
    centralView.setUint32(24, data.length, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);
    centralParts.push(centralHeader);

    offset += localHeader.length + data.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, Object.keys(files).length, true);
  endView.setUint16(10, Object.keys(files).length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);

  return new Blob([...localParts, ...centralParts, end]);
}

function crc32(bytes) {
  let crc = -1;
  for (let index = 0; index < bytes.length; index += 1) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[index]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const crcTable = (() => {
  const table = [];
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function slugify(text) {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "investigacao";
}

addWitnessBtn.addEventListener("click", () => addWitness());
analyzeBtn.addEventListener("click", analyze);
refineBtn.addEventListener("click", () => analyze({ appendQuestions: true }));
docxBtn.addEventListener("click", generateDocxReport);
pdfBtn.addEventListener("click", generatePdfReport);
exampleBtn.addEventListener("click", fillExample);
form.addEventListener("input", updateProgress);
form.addEventListener("change", updateProgress);

clearBtn.addEventListener("click", () => {
  form.reset();
  witnessList.innerHTML = "";
  addWitness();
  questionsList.className = "questions-list empty-state";
  questionsList.textContent = t("emptyQuestions");
  refineBtn.classList.add("hidden");
  questionCount.textContent = "0 pendentes";
  faultTree.className = "fault-tree empty-state";
  faultTree.textContent = t("emptyFault");
  timelineView.className = "timeline-view empty-state";
  timelineView.textContent = t("emptyTimeline");
  fiveWhysView.className = "five-whys-view empty-state";
  fiveWhysView.textContent = t("emptyFiveWhys");
  bowtieDiagram.className = "bowtie-diagram empty-state";
  bowtieDiagram.textContent = t("emptyBowtie");
  ishikawaDiagram.className = "ishikawa-diagram empty-state";
  ishikawaDiagram.textContent = t("emptyIshikawa");
  rootCauses.innerHTML = "";
  barriers.innerHTML = "";
  systemicCauses.innerHTML = "";
  actions.innerHTML = "";
  updateProgress();
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(buildReportText());
  copyBtn.lastChild.textContent = t("copied");
  setTimeout(() => {
    copyBtn.lastChild.textContent = t("copy");
  }, 1400);
});

document.querySelectorAll(".step-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".step-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    document.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === target));
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

function fillExample() {
  const example = exampleIncident();
  form.reset();
  witnessList.innerHTML = "";
  setValue("eventType", "Incidente");
  setValue("eventDate", new Date().toISOString().slice(0, 10));
  setValue("area", example.area);
  setValue("severity", "Alta");
  setValue("description", example.description);
  setValue("activity", example.activity);
  setValue("equipment", example.equipment);
  setValue("injury", "Não");
  setValue("controls", example.controls);
  example.witnesses.forEach((witness) => addWitness(witness));
  questionsList.className = "questions-list empty-state";
  questionsList.textContent = t("exampleReady");
  questionCount.textContent = "0 pendentes";
  refineBtn.classList.add("hidden");
  faultTree.className = "fault-tree empty-state";
  faultTree.textContent = t("emptyFault");
  timelineView.className = "timeline-view empty-state";
  timelineView.textContent = t("emptyTimeline");
  fiveWhysView.className = "five-whys-view empty-state";
  fiveWhysView.textContent = t("emptyFiveWhys");
  bowtieDiagram.className = "bowtie-diagram empty-state";
  bowtieDiagram.textContent = t("emptyBowtie");
  ishikawaDiagram.className = "ishikawa-diagram empty-state";
  ishikawaDiagram.textContent = t("emptyIshikawa");
  rootCauses.innerHTML = "";
  barriers.innerHTML = "";
  systemicCauses.innerHTML = "";
  actions.innerHTML = "";
  updateProgress();
}

function exampleIncident() {
  const examples = {
    en: {
      area: "Packaging line - maintenance area",
      activity: "Corrective maintenance on conveyor belt",
      equipment: "Conveyor belt EM-17",
      description: "During corrective maintenance on a packaging line conveyor, the technician removed a side guard to access a jammed roller. While manually rotating the assembly, the conveyor moved unexpectedly and partially pulled the technician's glove toward the crushing zone. There was no injury, but there was amputation potential. The task occurred at the end of the shift, under pressure to return the line to operation. No evidence was presented for lockout/tagout, zero-energy verification, or a formal work permit.",
      controls: "Verbal risk assessment reported by the team; guard removed for access; no evidence of LOTO, checklist, or formal release.",
      witnesses: [
        { name: "Carlos Mendes", role: "Production operator", statement: "I saw maintenance start shortly after the line stopped. The team said they needed to release the equipment quickly. I did not see a lock or tag on the local panel." },
        { name: "Ana Ribeiro", role: "Safety technician", statement: "The side guard was removed when I arrived. The area was not isolated and I did not find a work permit record for the intervention." }
      ]
    },
    es: {
      area: "Línea de empaque - área de mantenimiento",
      activity: "Mantenimiento correctivo en cinta transportadora",
      equipment: "Cinta transportadora EM-17",
      description: "Durante el mantenimiento correctivo en una cinta transportadora de la línea de empaque, el técnico retiró una protección lateral para acceder a un rodillo trabado. Al girar manualmente el conjunto, la cinta se movió inesperadamente y arrastró parcialmente el guante del técnico hacia la zona de aplastamiento. No hubo lesión, pero existía potencial de amputación. La actividad ocurrió al final del turno, con presión para retornar la línea. No se presentó evidencia de bloqueo y etiquetado, verificación de energía cero o permiso formal de trabajo.",
      controls: "APR verbal informada por el equipo; protección retirada para acceso; sin evidencia de LOTO, checklist o liberación formal.",
      witnesses: [
        { name: "Carlos Mendes", role: "Operador de producción", statement: "Vi que el mantenimiento comenzó justo después de la parada de la línea. El equipo comentó que necesitaba liberar el equipo rápidamente. No observé candado ni etiqueta en el panel local." },
        { name: "Ana Ribeiro", role: "Técnica de seguridad", statement: "La protección lateral estaba retirada cuando llegué. El área no estaba aislada y no encontré registro de permiso de trabajo para la intervención." }
      ]
    },
    pt: {
      area: "Linha de embalagem - setor de manutenção",
      activity: "Manutenção corretiva em esteira transportadora",
      equipment: "Esteira transportadora EM-17",
      description: "Durante manutenção corretiva em uma esteira transportadora da linha de embalagem, o técnico removeu uma proteção lateral para acessar um rolete travado. Ao girar manualmente o conjunto, a esteira se movimentou de forma inesperada e a luva do técnico foi puxada parcialmente para a zona de esmagamento. Não houve lesão, mas havia potencial de amputação. A atividade ocorreu no fim do turno, com pressão para retorno da linha. Não foi apresentada evidência de bloqueio e etiquetagem, teste de energia zero ou permissão formal de trabalho.",
      controls: "APR verbal informada pela equipe; proteção removida para acesso; sem evidência de LOTO, checklist ou liberação formal.",
      witnesses: [
        { name: "Carlos Mendes", role: "Operador de produção", statement: "Vi a manutenção começar logo após a parada da linha. A equipe comentou que precisava liberar o equipamento rapidamente. Não observei cadeado ou etiqueta no painel local." },
        { name: "Ana Ribeiro", role: "Técnica de segurança", statement: "A proteção lateral estava removida quando cheguei ao local. A área não estava isolada e não encontrei registro de permissão de trabalho para a intervenção." }
      ]
    }
  };
  return examples[currentLanguage] || examples.en;
}

addWitness();
applyLanguage("en");
updateProgress();
