// ==========================================
// Terminal Log Scrolling Background
// ==========================================

(function () {
    const cv  = document.getElementById('bg-terminal');
    const ctx = cv.getContext('2d');

    const LOGS = [
        '[INFO]  Initializing vLLM engine v0.4.2...',
        '[INFO]  Loading model: Llama-3.1-8B-Instruct',
        '[DEBUG] KV cache allocated: 24.6 GB',
        '[INFO]  Paged Attention kernel: enabled',
        '[INFO]  Continuous batching scheduler: ON',
        '[DEBUG] CUDA device: NVIDIA A10G (24GB)',
        '[INFO]  Flash Attention 2 fused kernel loaded',
        '[INFO]  RAG ingestion pipeline: ready',
        '[DEBUG] Vector index: 847,293 embeddings',
        '[INFO]  Embedding model: text-embedding-3-small',
        '[DEBUG] Qdrant connected: localhost:6333',
        '[INFO]  FastAPI server starting on :8000',
        '[INFO]  Uvicorn workers spawned: 4',
        '[DEBUG] Max context window: 8,192 tokens',
        '[INFO]  LangGraph agent graph compiled',
        '[DEBUG] Semantic cache: Redis 7.0 connected',
        '[INFO]  HuggingFace TGI backend: online',
        '[DEBUG] Dynamic batch size: 32',
        '[INFO]  INT4 quantization (GPTQ): applied',
        '[DEBUG] P95 inference latency: 187ms',
        '[INFO]  Speculative decoding: 1.42× speedup',
        '[DEBUG] KV prefix cache hit rate: 62%',
        '[INFO]  OpenTelemetry tracing initialized',
        '[DEBUG] Prometheus metrics exposed: :9090',
        '[INFO]  JWT auth middleware: loaded',
        '[DEBUG] Rate limiter: 100 req/s per client',
        '[INFO]  Multimodal vision pipeline: READY',
        '[DEBUG] GPU utilization: 76%',
        '[INFO]  Request queue depth: 0',
        '[DEBUG] LoRA adapter loaded: medical-v2',
        '[INFO]  LangChain RAG chain compiled',
        '[DEBUG] Qdrant nearest-neighbor: 6ms avg',
        '[INFO]  Tokenizer: LlamaTokenizerFast',
        '[DEBUG] Tensor parallelism: tp=1',
        '[INFO]  Model weights loaded in 4.3s',
        '[DEBUG] FP16 precision: active',
        '[INFO]  Background reranker: CrossEncoder',
        '[DEBUG] BM25 index: 2.1M tokens indexed',
        '[INFO]  Async task worker pool: 8 threads',
        '[DEBUG] Semantic chunker: chunk_size=512',
    ];

    const FONT_SIZE   = 11;
    const LINE_HEIGHT = FONT_SIZE + 9;
    const COL_WIDTH   = 340;
    const OPACITY     = 0.038;
    const COLOR       = '#00e87a';

    let cols = [];

    function resize() {
        cv.width  = window.innerWidth;
        cv.height = window.innerHeight;
        const n   = Math.ceil(cv.width / COL_WIDTH);
        cols = [];
        for (let i = 0; i < n; i++) {
            cols.push({
                x:      i * COL_WIDTH + 12 + Math.random() * 16,
                y:      -(Math.random() * cv.height),
                speed:  0.28 + Math.random() * 0.38,
                offset: Math.floor(Math.random() * LOGS.length)
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.font        = `${FONT_SIZE}px "JetBrains Mono", monospace`;
        ctx.fillStyle   = COLOR;
        ctx.globalAlpha = OPACITY;

        const linesNeeded = Math.ceil(cv.height / LINE_HEIGHT) + 3;

        cols.forEach(col => {
            col.y += col.speed;
            if (col.y > cv.height + LINE_HEIGHT) {
                col.y      = -LINE_HEIGHT * linesNeeded;
                col.offset = Math.floor(Math.random() * LOGS.length);
                col.speed  = 0.28 + Math.random() * 0.38;
            }

            for (let i = 0; i < linesNeeded; i++) {
                const lineY = col.y + i * LINE_HEIGHT;
                if (lineY < -LINE_HEIGHT || lineY > cv.height) continue;
                const idx = (col.offset + i) % LOGS.length;
                ctx.fillText(LOGS[idx], col.x, lineY);
            }
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();

// ==========================================
   // Interactive Self-Attention Canvas Background
   // ==========================================

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 75;
const connectionDistance = 120;
let mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1.5;
        this.color = Math.random() > 0.4 ? '#00f5a0' : '#00b8ff'; // Cyber Sage or Electric Cyan
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                this.x -= dx / dist * force * 1.2;
                this.y -= dy / dist * force * 1.2;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                let opacity = (1 - dist / connectionDistance) * 0.12;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                let grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                grad.addColorStop(0, particles[i].color);
                grad.addColorStop(1, particles[j].color);
                
                ctx.strokeStyle = grad;
                ctx.lineWidth = (1 - dist / connectionDistance) * 0.8;
                ctx.globalAlpha = opacity;
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// ==========================================
// API Key Generator Mock
// ==========================================

const btnGenKey = document.getElementById('btn-generate-key');
const keyDisplay = document.getElementById('key-display');

if (btnGenKey && keyDisplay) {
    btnGenKey.addEventListener('click', () => {
        btnGenKey.textContent = "Requesting API Token...";
        btnGenKey.disabled = true;
        
        setTimeout(() => {
            let hex = 'abcdef0123456789';
            let mockToken = 'sk_jashwanth_';
            for (let i = 0; i < 20; i++) {
                mockToken += hex[Math.floor(Math.random() * hex.length)];
            }
            keyDisplay.textContent = mockToken;
            keyDisplay.style.display = 'block';
            btnGenKey.textContent = "API Token Granted ✔";
            btnGenKey.disabled = false;
        }, 1200);
    });
}

// ==========================================
// AI Terminal Q&A Console Playground
// ==========================================

const responseData = {
    bio: `Dodda Jashwanth Sai is a specialized AI Engineer with comprehensive experience building Generative AI systems, self-hosted LLM platforms, real-time RAG pipelines, and telehealth SaaS products. 

As a Junior AI Engineer at VitaInspire, he focused on deploying open-source models (Llama/Mistral) using vLLM and TGI, reducing infrastructure reliance on third-party cloud credits.`,
    
    skills: `*** Dodda Jashwanth Sai's Core Parameters ***
- Languages: Python, SQL, C#, C, Bash
- Generative AI: LLMs, RAG pipelines, LangChain, LangGraph, LoRA Fine-Tuning, Vector Databases
- Model Serving: vLLM, HuggingFace TGI, Paged Attention, KV Cache, Quantization
- Backend Engineering: FastAPI, Flask, ASP.NET Core, REST APIs, Microservices
- Infrastructure & Cloud: Docker, Kubernetes, CI/CD, AWS, GCP, Linux systems
- Core CS: Data Structures & Algorithms, System Design, DBMS, Operating Systems`,
    
    experience: `*** VitaInspire Private Limited (Jan 2026 - Jul 2026) ***
Role: Junior AI Engineer
- Developed healthcare and educational products integrating LLM-driven workflows and intelligent chatbots.
- Deployed self-hosted LLM clusters using vLLM and HuggingFace TGI, saving costs and improving API control.
- Engineered highly performant, scalable Python backend microservices and RESTful endpoints using FastAPI.
- Optimized model generation parameters (Continuous batching, KV Cache) to accommodate production traffic.`,
    
    projects: `*** Selected Architectures & Systems ***
1. Self-Hosted Multimodal LLM Platform
   Serves local multimodal models using vLLM & HF TGI. Features custom Paged Attention optimization, continuous batching, and an internal authentication API SDK.

2. Live Sync RAG Platform
   Real-time synchronizing knowledge bases. Implemented semantic chunking and async ingestion workers to load and index documents with fast vector retrieval.

3. Multimodal Video-to-Video RAG System
   Processes video segment descriptors and audio tracks. Indexes data synchronizing visual frame cues and transcripts to run multimodal LLM contextual video replies.

4. AI-Powered Telehealth Platform
   End-to-end medical triage automated queue and conversational consultation summary engine.

5. EduTeach — AI Teacher Tool
   AI platform for school teachers: lesson plan generator, student performance dashboard, and an automated paper correction pipeline. Self-hosted open-source LLMs on AWS EC2, Supabase as database.`,

    llmserving: `*** LLM Serving Stack ***
Primary engines: vLLM (Paged Attention + Continuous Batching) and HuggingFace TGI.

Key optimizations applied:
- Paged Attention: eliminates KV cache memory fragmentation, enabling higher concurrent request throughput vs naive serving.
- Continuous Batching: dynamically inserts new requests mid-flight — no idle GPU cycles waiting for a batch to drain.
- KV Prefix Caching: reuses cached attention states for shared prompt prefixes, reducing latency on repeated system prompts.
- INT4 Quantization (AWQ): reduces Llama-3.1 8B VRAM footprint from 17.8GB → 8.5GB with minimal quality loss.
- Flash Attention 2: fused CUDA kernel for attention computation, meaningful throughput gain with no memory overhead.

Hardware used: self-hosted NVIDIA GPU cluster (dev), AWS EC2 GPU instances (production).
Gateway: FastAPI + async uvicorn workers with per-route rate limiting and JWT auth middleware.`,

    ragarch: `*** RAG Pipeline Architecture ***
Ingestion layer:
- Async background workers parse PDF/DOCX/HTML sources using PyMuPDF + vision fallback for scanned content.
- Semantic chunking (sentence-transformers) preserves paragraph coherence; chunk size tuned per domain.
- Parallel chapter workers (3× concurrency) for large book-length corpora with polling endpoints for progress.

Vector layer:
- Qdrant (self-hosted, ~6ms p95 nearest-neighbor), Milvus (hybrid BM25+dense search).
- Embeddings: text-embedding-3-small for general use, domain-specific fine-tuned encoders for medical content.

Retrieval & generation:
- Hybrid retrieval: dense vector similarity + sparse BM25 re-ranked with cross-encoder.
- LangChain for single-chain RAG; LangGraph for multi-step agentic retrieval with tool-calling loops.
- Context window management: sliding-window summarization for >8k token inputs.
- Redis semantic cache: identical and paraphrase queries served from cache — skips LLM inference entirely.`,

    // ── Hiring Manager persona ──────────────────────────────────────────────
    hm_impact: `Production deliverables at VitaInspire (Jan–Jul 2026):

→ Self-hosted LLM platform on local GPU clusters — eliminated expensive third-party API dependency
→ Live Sync RAG pipeline — real-time knowledge base with fast vector retrieval
→ AI Telehealth Platform — automated triage queues + consultation summary engine
→ EduTeach — AI tool for school teachers: lesson planning, paper grading, student dashboards

All systems in production, built with FastAPI backends on self-hosted open-source infrastructure.`,

    hm_standout: `Key differentiators:

1. Self-hosted LLM expertise — rare at his experience level.
   Runs vLLM/TGI on GPU clusters; not just wrapping GPT-4 API calls.

2. Ships full systems, not notebooks.
   FastAPI → vector DB → inference engine → deployment — he owns the whole stack.

3. Cross-domain AI experience.
   Healthcare, EdTech, enterprise RAG, multimodal video — broad applied exposure in production.

4. Cost-reduction instinct.
   Replaced cloud API spend with self-hosted open-source models — real business thinking.

5. Strong fundamentals under the AI layer.
   300+ algorithmic problems solved. System design, DBMS, OS — not just prompt engineering.`,

    hm_fit: `Best-fit roles:
  AI Engineer / ML Engineer
  LLM Infrastructure Engineer
  Backend Engineer (AI products)
  GenAI Application Developer

Industries:    Healthcare AI · EdTech · Enterprise SaaS · Developer Tools
Seniority:     Mid-level — growing toward senior
Work model:    Remote, Hybrid, or On-site (Hyderabad, India)`,

    hm_avail: `STATUS:       OPEN_TO_WORK ✓
Location:     Hyderabad, India
Remote:       Open to fully remote roles
Notice:       Immediately available — no notice period

Contact:
  Email:    jashwanthsai678@gmail.com
  Phone:    +91 9177528667
  LinkedIn: linkedin.com/in/djashwanthsai96
  GitHub:   github.com/jashwanthsai678`,

    hm_independent: `Yes. Evidence:

→ Independently designed and shipped 5 production AI systems end-to-end
→ Owned model selection, infra setup, API design, and deployment without hand-holding
→ Ramped on vLLM, RAG architectures, and multimodal AI with minimal external guidance
→ Built EduTeach from scratch — problem scoping, architecture, deployment, delivery

Works best with clear goals and product context — doesn't need daily oversight to ship.`,

    // ── Technical Lead persona ──────────────────────────────────────────────
    tl_stack: `Backend & infrastructure stack:

Languages:   Python (primary), SQL, C#, Bash
APIs:        FastAPI, Flask, ASP.NET Core — RESTful microservices
Async:       uvicorn workers, async/await, background task queues
Auth:        JWT middleware, API-key validation, per-route rate limiting
Databases:   MongoDB, MySQL, Redis 7.0 (semantic cache)
Vector DBs:  Qdrant (~6ms avg latency), Milvus (hybrid BM25+dense)
Cloud:       AWS EC2, GCP, Linux systems, Docker, CI/CD pipelines`,

    tl_sysdesign: `System design highlights:

→ Multi-worker async ingestion pipeline
  3× parallel chapter workers with polling endpoints for large corpora

→ OpenAI-compatible API gateway
  JWT auth + per-route rate limiting; drop-in replacement for external providers

→ Redis semantic cache
  Paraphrase and repeat queries served from cache — LLM skipped entirely

→ Dual vector index (multimodal RAG)
  Synchronized search across visual frame descriptors + speech transcripts

→ Self-hosted LLM cluster
  Paged Attention + continuous batching; AWQ INT4 quantization for reduced VRAM footprint

→ EduTeach paper correction pipeline
  Specialized open-source model pipeline for educational grading hosted on AWS EC2`,

    tl_opensource: `Open-source tools used in production:

Inference:    vLLM (Paged Attention, continuous batching, speculative decoding)
              HuggingFace TGI (alternative backend, same API surface)
Embeddings:   text-embedding-3-small, domain fine-tuned sentence-transformers
RAG chains:   LangChain (single-pass), LangGraph (multi-step agentic loops)
Vector DBs:   Qdrant, Milvus
Reranker:     CrossEncoder (ms-marco-MiniLM-L-6-v2)
Doc parsing:  PyMuPDF + vision fallback pipeline for scanned PDFs
Cache:        Redis 7.0 semantic caching
Models used:  Llama 3.1 8B, Mistral 7B, domain LoRA fine-tuned variants`,

    // ── HR Recruiter persona ────────────────────────────────────────────────
    hr_edu: `Education:
  Degree:   B.Tech in Computer Science (AI & ML)
  College:  Marri Laxman Reddy Institute of Technology (MLRIT)
  Year:     2021 – 2025
  CGPA:     7.7 / 10.0

Certifications:
  Professional Cybersecurity    — Google (Coursera)
  Machine Learning              — Great Learning
  Artificial Intelligence       — Metvy Learning
  Data Science & Analytics      — Simplilearn

Achievements:
  Selected — National Innovation & Design Bootcamp 2024
  Solved 300+ problems on LeetCode, HackerRank, CodeChef
  Conducted AI/ML workshops and peer mentoring sessions`,

    hr_culture: `Culture & soft skills:

→ Builder mindset — ships end-to-end AI systems independently
→ Self-directed learner — ramped on vLLM, RAG, multimodal AI on the job
→ Cross-functional collaborator — worked with product and clinical teams at VitaInspire
→ Community contributor — AI/ML workshops, bootcamp programs, peer mentoring
→ Clear communicator — documented APIs and architectures for non-technical stakeholders
→ Ownership-driven — takes problems from ambiguous brief to deployed product

Best environments: fast-paced, product-focused, trust-based autonomy`,

};

const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');
const btnSendPrompt = document.getElementById('btn-send-prompt');
const chipsContainer = document.querySelector('.prompt-chips');
let isGenerating = false;

const promptLabels = {
    bio:            "Who is Jashwanth Sai?",
    skills:         "List core technical skills",
    experience:     "What did Jashwanth build?",
    projects:       "Summarize his selected projects",
    llmserving:     "How does he serve LLMs in production?",
    ragarch:        "Explain his RAG pipeline design",
    hm_impact:      "What has he shipped to production?",
    hm_standout:    "What makes him stand out?",
    hm_fit:         "What roles suit him best?",
    hm_avail:       "Is he available to hire?",
    hm_independent: "Can he work independently?",
    tl_stack:       "What's his backend stack?",
    tl_sysdesign:   "System design experience?",
    tl_opensource:  "Open-source tools in production?",
    hr_edu:         "Education & certifications",
    hr_culture:     "Soft skills & culture fit?",
};

function getTimestamp() {
    const now = new Date();
    return `[${now.toTimeString().split(' ')[0]}]`;
}

function writeTerminalLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'term-time';
    timeSpan.textContent = getTimestamp();
    
    line.appendChild(timeSpan);
    
    const textNode = document.createElement('span');
    textNode.innerHTML = text;
    line.appendChild(textNode);
    
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    return line;
}

function streamResponse(promptKey) {
    if (isGenerating) return;
    isGenerating = true;

    const currentChips = chipsContainer.querySelectorAll('.chip');
    btnSendPrompt.disabled = true;
    terminalInput.value = "";
    currentChips.forEach(c => c.style.pointerEvents = 'none');

    const rawPromptText = promptLabels[promptKey] || promptKey;
    writeTerminalLine(`&gt;&gt;&gt; ${rawPromptText}`, 'user-prompt');

    setTimeout(() => {
        writeTerminalLine("[INFO] Initiating RAG semantic retrieval...", 'system-msg-info');
        setTimeout(() => {
            writeTerminalLine("[INFO] Searching local vector database index... [OK] - Found 3 matching segments.", 'system-msg-info');
            setTimeout(() => {
                writeTerminalLine("[INFO] Executing vLLM Continuous Batching Scheduler... running inference...", 'system-msg-info');
                setTimeout(() => {
                    const responseText = responseData[promptKey] || "No data found for this query.";
                    const responseLine = writeTerminalLine("", 'bot-response');
                    const textSpan = responseLine.lastChild;
                    let charIndex = 0;
                    const words = responseText.split(' ');

                    function printNextWord() {
                        if (charIndex < words.length) {
                            textSpan.textContent += (charIndex === 0 ? "" : " ") + words[charIndex];
                            charIndex++;
                            terminalBody.scrollTop = terminalBody.scrollHeight;
                            setTimeout(printNextWord, Math.random() * 40 + 20);
                        } else {
                            isGenerating = false;
                            btnSendPrompt.disabled = false;
                            chipsContainer.querySelectorAll('.chip').forEach(c => c.style.pointerEvents = 'auto');
                            writeTerminalLine("[SYSTEM] Inference transaction completed successfully.", 'system-msg');
                        }
                    }
                    printNextWord();
                }, 800);
            }, 600);
        }, 600);
    }, 500);
}

// Event delegation — works with dynamically rendered chips
chipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip || isGenerating) return;
    streamResponse(chip.getAttribute('data-prompt'));
});

// ==========================================
// Persona Switcher
// ==========================================

const personaConfigs = {
    'hiring-manager': [
        { key: 'hm_impact',      label: 'What has he shipped to production?' },
        { key: 'hm_standout',    label: 'What makes him stand out?' },
        { key: 'hm_fit',         label: 'What roles suit him best?' },
        { key: 'hm_avail',       label: 'Is he available to hire?' },
        { key: 'hm_independent', label: 'Can he work independently?' },
    ],
    'tech-lead': [
        { key: 'llmserving',    label: 'How does he serve LLMs in production?' },
        { key: 'ragarch',       label: 'Explain his RAG pipeline design' },
        { key: 'tl_stack',      label: "What's his backend stack?" },
        { key: 'tl_sysdesign',  label: 'System design experience?' },
        { key: 'tl_opensource', label: 'Open-source tools in production?' },
    ],
    'hr-recruiter': [
        { key: 'bio',        label: 'Who is Jashwanth Sai?' },
        { key: 'hr_edu',     label: 'Education & certifications' },
        { key: 'hm_avail',   label: 'Is he available now?' },
        { key: 'hr_culture', label: 'Soft skills & culture fit?' },
        { key: 'hm_fit',     label: 'What roles does he target?' },
    ],
};

const personaDisplayNames = {
    'hiring-manager': 'Hiring Manager',
    'tech-lead':      'Technical Lead',
    'hr-recruiter':   'HR Recruiter',
};

function setPersona(name, silent = false) {
    document.querySelectorAll('.persona-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.persona === name);
    });

    chipsContainer.style.opacity = '0';
    setTimeout(() => {
        chipsContainer.innerHTML = '';
        (personaConfigs[name] || []).forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'chip';
            btn.dataset.prompt = item.key;
            btn.textContent = item.label;
            chipsContainer.appendChild(btn);
        });
        chipsContainer.style.opacity = '1';
    }, 150);

    if (!silent) {
        writeTerminalLine(`[SYSTEM] Persona switched → ${personaDisplayNames[name]} view loaded.`, 'system-msg');
    }
}

document.querySelectorAll('.persona-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
            setPersona(btn.dataset.persona);
        }
    });
});

// Init with hiring manager chips (silent — no terminal message on load)
setPersona('hiring-manager', true);

// ==========================================
// Terminal Easter Egg Commands
// ==========================================

const terminalCommands = {
    'whoami': `uid=1000(jashwanth) gid=1000(ai-engineers) groups=1000(ai-engineers),27(llm-infra),42(rag-architects)
Name:   Dodda Jashwanth Sai
Role:   AI Backend Developer · ML Engineer
Email:  jashwanthsai678@gmail.com
GitHub: github.com/jashwanthsai678
Node:   jashwanth-inference-server-v2
Status: OPEN_TO_WORK ✓`,

    'ls projects': `total 5
drwxr-xr-x  jashwanth  self-hosted-llm-platform/    [vLLM · TGI · GPU serving, python]
drwxr-xr-x  jashwanth  live-sync-rag/               [FastAPI · Qdrant · LangChain, python, gcp]
drwxr-xr-x  jashwanth  video-to-video-rag/          [Multimodal · Whisper · Qdrant, AWS Ec2, python]
drwxr-xr-x  jashwanth  telehealth-ai-platform/      [python · NLP · SaaS, supabase, react]
drwxr-xr-x  jashwanth  eduteach-ai-teacher-tool/    [python · LangChain · LLMs, AWS EC2, supabase]
5 directories, 0 regrets`,

    'ls': `total 5
drwxr-xr-x  jashwanth  self-hosted-llm-platform/    [vLLM · TGI · GPU serving, python]
drwxr-xr-x  jashwanth  live-sync-rag/               [FastAPI · Qdrant · LangChain, python, gcp]
drwxr-xr-x  jashwanth  video-to-video-rag/          [Multimodal · Whisper · Qdrant, AWS Ec2, python]
drwxr-xr-x  jashwanth  telehealth-ai-platform/      [python · NLP · SaaS, supabase, react]
drwxr-xr-x  jashwanth  eduteach-ai-teacher-tool/    [python · LangChain · LLMs, AWS EC2, supabase]
5 directories, 0 regrets`,

    'cat resume.txt': `╔══════════════════════════════════════════════════╗
║       DODDA JASHWANTH SAI — resume.txt           ║
╚══════════════════════════════════════════════════╝

EXPERIENCE
  Junior AI Engineer @ VitaInspire   Jan 2026 – Jul 2026
  → Self-hosted LLM infra (vLLM, TGI), RAG pipelines, FastAPI backends
  → Healthcare & education AI platforms, production LLM serving

EDUCATION
  B.Tech in AI & ML — MLRIT          2021 – 2025   CGPA: 7.7/10

CORE SKILLS
  Python · FastAPI · vLLM · LangChain · LangGraph
  RAG Pipelines · Vector DBs · Docker · AWS · MongoDB

CONTACT
  jashwanthsai678@gmail.com · +91 9177528667
  linkedin.com/in/djashwanthsai96 · github.com/jashwanthsai678`,

    'git log --all': `commit a1b2c3d (HEAD -> main, tag: v2.0-vitainspire)
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   Jul 2026

    feat: ship production LLM inference platform at VitaInspire

commit b9c1d2e
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   Jun 2026

    feat: EduTeach — AI teacher tool with paper correction & lesson planner on AWS EC2

commit f4e5a6b
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   Jun 2026

    feat: multimodal video-to-video RAG — Whisper + Qdrant

commit 9c8d7e2
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   Apr 2026

    feat: live-sync RAG — fast vector retrieval pipeline deployed

commit 3b2a1f0
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   Jan 2026

    init: joined VitaInspire as Junior AI Engineer

commit 7e6f5d4
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   2025

    degree: B.Tech AI & ML — MLRIT (CGPA: 7.7/10)

commit e1f2a3b
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   2024

    achievement: solved 300+ LeetCode problems. still going.

commit 0x000001
Author: Jashwanth Sai <jashwanthsai678@gmail.com>
Date:   2002

    init: Jashwanth.exe — first boot. Hyderabad, India.`,

    'uname -a': `JashwanthOS 2.6.0 #1 SMP RAG-optimized x86_64 Python3 GNU/AI
Kernel:   AI-Backend-Kernel v2.0 (vLLM-patched)
Arch:     x86_64  |  GPU: CUDA 12.1 enabled
Runtime:  Python 3.11 · FastAPI · LangGraph
Uptime:   3+ years in AI/ML development`,

    'uptime': ` 09:41 up 3+ years,  load average: Motivated, Focused, Ship-ready
Tasks: 4 active projects, 0 stopped, 0 idle
CPU:  Python 72.4%  Bash 10.2%  Coffee 17.4%
Open for new opportunities: YES`,

    'help': `Available commands:
  whoami          → identity & contact info
  ls  /  ls projects  → list all AI projects
  cat resume.txt  → view resume summary
  ping jashwanth  → check availability
  git log --all   → career history as git commits
  uname -a        → system information
  uptime          → coding uptime stats
  clear           → clear this terminal
  help            → show this menu

Tip: prompt chips above also work for detailed Q&A.`,
};

function streamTerminalOutput(text) {
    const responseLine = writeTerminalLine('', 'bot-response');
    const textSpan = responseLine.lastChild;
    const chars = text.split('');
    let i = 0;

    function printNext() {
        if (i < chars.length) {
            textSpan.textContent += chars[i];
            i++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(printNext, 4);
        } else {
            isGenerating = false;
            btnSendPrompt.disabled = false;
            chips.forEach(c => c.style.pointerEvents = 'auto');
        }
    }
    printNext();
}

function runPingCommand() {
    const pingLines = [
        { text: 'PING jashwanth.ai (127.0.0.1): 56 data bytes', cls: 'system-msg-info' },
        { text: '64 bytes from jashwanth: icmp_seq=0 ttl=64 time=1.2ms  [Available: YES]', cls: 'bot-response' },
        { text: '64 bytes from jashwanth: icmp_seq=1 ttl=64 time=0.9ms  [Motivated: YES]', cls: 'bot-response' },
        { text: '64 bytes from jashwanth: icmp_seq=2 ttl=64 time=1.1ms  [Ships fast: YES]', cls: 'bot-response' },
        { text: '64 bytes from jashwanth: icmp_seq=3 ttl=64 time=0.8ms  [Open to work: YES]', cls: 'bot-response' },
        { text: '--- jashwanth.ai ping statistics ---', cls: 'system-msg' },
        { text: '4 packets transmitted, 4 received, 0% packet loss', cls: 'bot-response' },
        { text: 'Round-trip min/avg/max = 0.8/1.0/1.2ms. Hire him.', cls: 'bot-response' },
    ];
    pingLines.forEach((line, i) => {
        setTimeout(() => {
            writeTerminalLine(line.text, line.cls);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            if (i === pingLines.length - 1) {
                isGenerating = false;
                btnSendPrompt.disabled = false;
                chips.forEach(c => c.style.pointerEvents = 'auto');
            }
        }, i * 420);
    });
}

function executeTerminalCommand(rawInput) {
    if (isGenerating) return;
    const input = rawInput.trim();
    if (!input) return;

    isGenerating = true;
    btnSendPrompt.disabled = true;
    chips.forEach(c => c.style.pointerEvents = 'none');

    writeTerminalLine(`&gt;&gt;&gt; ${input}`, 'user-prompt');
    terminalInput.value = '';

    const key = input.toLowerCase();

    if (key === 'clear') {
        setTimeout(() => {
            terminalBody.innerHTML = '';
            writeTerminalLine('[SYSTEM] Terminal cleared. Type "help" to see available commands.', 'system-msg');
            isGenerating = false;
            btnSendPrompt.disabled = false;
            chips.forEach(c => c.style.pointerEvents = 'auto');
        }, 150);
        return;
    }

    if (key === 'ping jashwanth') {
        setTimeout(() => runPingCommand(), 150);
        return;
    }

    const response = terminalCommands[key];

    if (response) {
        setTimeout(() => streamTerminalOutput(response), 150);
    } else {
        setTimeout(() => {
            writeTerminalLine(`bash: ${input}: command not found. Type 'help' for available commands.`, 'error-msg');
            isGenerating = false;
            btnSendPrompt.disabled = false;
            chips.forEach(c => c.style.pointerEvents = 'auto');
        }, 150);
    }
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = terminalInput.value.trim();
        if (val) executeTerminalCommand(val);
    }
});

btnSendPrompt.addEventListener('click', () => {
    const val = terminalInput.value.trim();
    if (val) executeTerminalCommand(val);
});

// ==========================================
// Console Tabs Navigation
// ==========================================

const tabButtons = document.querySelectorAll('.console-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const content = document.getElementById(`content-${tabId}`);
        if (content) content.classList.add('active');
    });
});

// ==========================================
// Navbar Scroll Styling & Mobile Menu
// ==========================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// ==========================================
// Scroll Intersection Observer for Bento Cards
// ==========================================

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('bento-reveal');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.bento-card, .playground-card, .timeline-item, .skill-cat-card, .section-title-wrapper').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollObserver.observe(card);
});

const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .bento-reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);

console.log('%c⚡ Jashwanth.AI Ingestion & Chat Console Online ⚡', 'color: #00f5a0; font-size: 14px; font-weight: bold;');
console.log('%cLive Sync RAG Directory Pipeline and LLM serving environment loaded.', 'color: #00b8ff; font-size: 11px;');

// ==========================================
// Job Fit Analyzer
// ==========================================

const skillMap = [
    // Languages
    { terms: ['python'],                              cat: 'tech',   weight: 3, label: 'Python' },
    { terms: ['sql'],                                 cat: 'tech',   weight: 2, label: 'SQL' },
    { terms: ['c#', 'csharp', '.net', 'dotnet'],     cat: 'tech',   weight: 2, label: 'C# / .NET' },
    { terms: ['bash', 'shell script'],               cat: 'tech',   weight: 1, label: 'Bash' },
    // Frameworks / Backend
    { terms: ['fastapi', 'fast api'],                 cat: 'tech',   weight: 3, label: 'FastAPI' },
    { terms: ['flask'],                               cat: 'tech',   weight: 2, label: 'Flask' },
    { terms: ['asp.net', 'aspnet'],                   cat: 'tech',   weight: 2, label: 'ASP.NET' },
    { terms: ['rest api', 'restful'],                 cat: 'tech',   weight: 2, label: 'REST APIs' },
    { terms: ['microservice', 'microservices'],       cat: 'tech',   weight: 2, label: 'Microservices' },
    { terms: ['react'],                               cat: 'tech',   weight: 1, label: 'React' },
    { terms: ['websocket', 'websockets'],             cat: 'tech',   weight: 1, label: 'WebSockets' },
    // AI / ML
    { terms: ['llm', 'large language model'],         cat: 'ai',     weight: 3, label: 'LLMs' },
    { terms: ['rag', 'retrieval augmented', 'retrieval-augmented'], cat: 'ai', weight: 3, label: 'RAG' },
    { terms: ['langchain', 'lang chain'],             cat: 'ai',     weight: 3, label: 'LangChain' },
    { terms: ['langgraph', 'lang graph'],             cat: 'ai',     weight: 2, label: 'LangGraph' },
    { terms: ['vllm', 'v-llm'],                       cat: 'ai',     weight: 3, label: 'vLLM' },
    { terms: ['hugging face', 'huggingface', 'hf tgi', 'tgi'], cat: 'ai', weight: 3, label: 'HuggingFace' },
    { terms: ['fine-tuning', 'fine tuning', 'finetuning', 'lora', 'qlora'], cat: 'ai', weight: 2, label: 'Fine-Tuning' },
    { terms: ['generative ai', 'genai', 'gen ai'],   cat: 'ai',     weight: 3, label: 'Generative AI' },
    { terms: ['vector database', 'vector db', 'vector store', 'embedding', 'embeddings'], cat: 'ai', weight: 3, label: 'Vector DBs' },
    { terms: ['qdrant'],                              cat: 'ai',     weight: 2, label: 'Qdrant' },
    { terms: ['milvus'],                              cat: 'ai',     weight: 1, label: 'Milvus' },
    { terms: ['machine learning', ' ml '],            cat: 'ai',     weight: 2, label: 'Machine Learning' },
    { terms: ['deep learning', 'neural network'],     cat: 'ai',     weight: 1, label: 'Deep Learning' },
    { terms: ['nlp', 'natural language processing'], cat: 'ai',     weight: 2, label: 'NLP' },
    { terms: ['prompt engineering', 'prompt design'], cat: 'ai',    weight: 2, label: 'Prompt Eng.' },
    { terms: ['multimodal', 'multi-modal'],           cat: 'ai',     weight: 2, label: 'Multimodal AI' },
    { terms: ['agent', 'agentic', 'ai agent'],        cat: 'ai',     weight: 2, label: 'AI Agents' },
    { terms: ['paged attention', 'kv cache', 'continuous batching', 'quantization'], cat: 'ai', weight: 2, label: 'LLM Optimization' },
    { terms: ['openai api', 'gpt-4', 'gpt4'],         cat: 'ai',     weight: 1, label: 'OpenAI APIs' },
    { terms: ['computer vision', 'image recognition'], cat: 'ai',   weight: 1, label: 'Computer Vision' },
    // Infrastructure / Cloud
    { terms: ['aws', 'amazon web services', 'ec2'],   cat: 'infra',  weight: 2, label: 'AWS' },
    { terms: ['gcp', 'google cloud'],                 cat: 'infra',  weight: 2, label: 'GCP' },
    { terms: ['docker', 'containeriz'],               cat: 'infra',  weight: 2, label: 'Docker' },
    { terms: ['kubernetes', 'k8s'],                   cat: 'infra',  weight: 1, label: 'Kubernetes' },
    { terms: ['ci/cd', 'cicd', 'github actions', 'devops'], cat: 'infra', weight: 2, label: 'CI/CD' },
    { terms: ['linux', 'unix'],                       cat: 'infra',  weight: 2, label: 'Linux' },
    { terms: ['redis'],                               cat: 'infra',  weight: 2, label: 'Redis' },
    { terms: ['mongodb', 'mongo'],                    cat: 'infra',  weight: 2, label: 'MongoDB' },
    { terms: ['supabase'],                            cat: 'infra',  weight: 2, label: 'Supabase' },
    { terms: ['mysql', 'postgresql', 'postgres'],     cat: 'infra',  weight: 1, label: 'SQL Database' },
    { terms: ['gpu', 'cuda', 'nvidia'],               cat: 'infra',  weight: 2, label: 'GPU Infra' },
    // Domain
    { terms: ['healthcare', 'health care', 'medical', 'clinical', 'telehealth'], cat: 'domain', weight: 2, label: 'Healthcare AI' },
    { terms: ['edtech', 'education tech', 'e-learning', 'elearning'], cat: 'domain', weight: 2, label: 'EdTech' },
    { terms: ['saas', 'software as a service'],       cat: 'domain', weight: 2, label: 'SaaS' },
    { terms: ['backend', 'back-end', 'server-side'],  cat: 'domain', weight: 2, label: 'Backend Eng.' },
    { terms: ['production', 'deploy', 'deployment'],  cat: 'domain', weight: 2, label: 'Prod Deployment' },
    { terms: ['system design', 'architecture'],       cat: 'domain', weight: 2, label: 'System Design' },
    { terms: ['junior', 'entry level', '0-2 year', '1-2 year'], cat: 'domain', weight: 2, label: 'Junior Level' },
    { terms: ['mid level', 'mid-level', '2-4 year', '2-5 year', '3-5 year'], cat: 'domain', weight: 3, label: 'Mid-Level' },
    { terms: ['api development', 'api design'],       cat: 'domain', weight: 2, label: 'API Development' },
    { terms: ['startup', 'early-stage'],              cat: 'domain', weight: 1, label: 'Startup' },
    { terms: ['enterprise'],                          cat: 'domain', weight: 1, label: 'Enterprise' },
];

const gapTerms = [
    { terms: ['node.js', 'nodejs', 'node js'],           weight: 2, label: 'Node.js' },
    { terms: ['java', 'spring boot', 'spring framework'], weight: 2, label: 'Java/Spring' },
    { terms: ['golang', 'go lang', 'go developer'],       weight: 2, label: 'Golang' },
    { terms: ['ruby on rails', 'ruby'],                   weight: 2, label: 'Ruby/Rails' },
    { terms: ['frontend developer', 'ui developer', 'front-end developer'], weight: 2, label: 'Frontend Dev' },
    { terms: ['angular', 'vue.js', 'vuejs', 'next.js', 'nextjs', 'nuxt'], weight: 2, label: 'Angular/Vue/Next' },
    { terms: ['mobile app', 'ios developer', 'android developer', 'flutter', 'react native'], weight: 2, label: 'Mobile Dev' },
    { terms: ['data engineer', 'apache spark', 'kafka', 'airflow', 'etl pipeline'], weight: 2, label: 'Data Engineering' },
    { terms: ['terraform', 'ansible', 'infrastructure as code'], weight: 1, label: 'IaC (Terraform)' },
    { terms: ['blockchain', 'web3', 'solidity', 'smart contract'], weight: 3, label: 'Blockchain/Web3' },
    { terms: ['cybersecurity', 'penetration testing', 'ethical hacking', 'devsecops'], weight: 3, label: 'Cybersecurity' },
    { terms: ['10+ years', '8+ years', '7+ years', 'staff engineer', 'principal engineer'], weight: 3, label: '8+ Yrs Exp' },
    { terms: ['game development', 'unity', 'unreal engine'], weight: 3, label: 'Game Dev' },
    { terms: ['embedded systems', 'firmware', 'rtos'],    weight: 3, label: 'Embedded Systems' },
    { terms: ['salesforce', 'sap', 'erp'],                weight: 2, label: 'Salesforce/SAP' },
];

const catColors = {
    ai:     { bar: '#00f5a0', text: '#00f5a0' },
    tech:   { bar: '#00b8ff', text: '#00b8ff' },
    infra:  { bar: '#d946ef', text: '#d946ef' },
    domain: { bar: '#fbbf24', text: '#fbbf24' },
};

const catLabels = {
    ai:     'AI / ML Stack',
    tech:   'Backend & Languages',
    infra:  'Infrastructure',
    domain: 'Domain Fit',
};

function analyzeJobFit(jdText) {
    const text = ' ' + jdText.toLowerCase() + ' ';

    const matched = [];
    const gaps = [];
    const catData = { ai: { pts: 0 }, tech: { pts: 0 }, infra: { pts: 0 }, domain: { pts: 0 } };
    let totalMatchPts = 0;
    let totalGapPts = 0;

    skillMap.forEach(skill => {
        const found = skill.terms.some(t => text.includes(t));
        if (found) {
            matched.push(skill);
            catData[skill.cat].pts += skill.weight;
            totalMatchPts += skill.weight;
        }
    });

    gapTerms.forEach(gap => {
        const found = gap.terms.some(t => text.includes(t));
        if (found) {
            gaps.push(gap);
            totalGapPts += gap.weight;
        }
    });

    const totalPts = totalMatchPts + totalGapPts;
    let overallScore = totalPts === 0 ? 68 : Math.round((totalMatchPts / totalPts) * 100);
    overallScore = Math.max(28, Math.min(95, overallScore));

    // Category scores — scale relative to max possible in that cat
    const catMaxPts = { ai: 0, tech: 0, infra: 0, domain: 0 };
    skillMap.forEach(s => { catMaxPts[s.cat] += s.weight; });
    const catScores = {};
    Object.keys(catData).forEach(cat => {
        const raw = catMaxPts[cat] > 0 ? (catData[cat].pts / catMaxPts[cat]) * 100 : 0;
        catScores[cat] = Math.round(Math.max(0, Math.min(99, raw)));
    });

    return { overallScore, matched, gaps, catScores };
}

function scoreColor(score) {
    if (score >= 75) return '#00f5a0';
    if (score >= 55) return '#fbbf24';
    return '#d946ef';
}

function animateValue(el, target, suffix = '%', duration = 900) {
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function renderResults(results) {
    const { overallScore, matched, gaps, catScores } = results;
    const el = document.getElementById('jd-results');
    const color = scoreColor(overallScore);

    const matchedLabel = matched.length
        ? matched.map(s => `<span class="jd-chip-match">${s.label}</span>`).join('')
        : '<span style="color:var(--color-text-muted);font-size:0.72rem;font-family:var(--font-mono)">none detected</span>';

    const gapsLabel = gaps.length
        ? gaps.map(g => `<span class="jd-chip-gap">${g.label}</span>`).join('')
        : '<span style="color:var(--color-primary);font-size:0.72rem;font-family:var(--font-mono)">no significant gaps ✓</span>';

    let narrative;
    const topMatches = matched.slice(0, 3).map(s => s.label).join(', ');
    if (overallScore >= 78) {
        narrative = `Strong alignment — especially on ${topMatches || 'core requirements'}. ${gaps.length ? `Would want to brush up on: ${gaps.map(g => g.label).join(', ')}.` : 'No significant gaps detected.'}`;
    } else if (overallScore >= 55) {
        narrative = `Solid overlap on ${topMatches || 'key requirements'}. ${gaps.length ? `This role emphasizes ${gaps.map(g => g.label).join(', ')} which sits outside the primary stack — ramp-up needed.` : 'Most requirements align well.'}`;
    } else {
        narrative = `Core skills touch ${topMatches || 'some requirements'}, but this role leans heavily on ${gaps.map(g => g.label).join(', ')} which is outside primary expertise. Might not be the strongest fit.`;
    }

    el.innerHTML = `
      <div class="jd-score-block">
        <div class="jd-score-label">Overall Fit</div>
        <div class="jd-score-number" id="jd-score-num" style="color:${color}">0%</div>
        <div class="jd-overall-bar">
          <div class="jd-overall-bar-fill" id="jd-overall-fill" style="background:${color}"></div>
        </div>
      </div>

      <div class="jd-categories">
        ${Object.entries(catScores).map(([cat, pct]) => `
          <div class="jd-cat-row">
            <div class="jd-cat-meta">
              <span class="jd-cat-name">${catLabels[cat]}</span>
              <span class="jd-cat-pct" style="color:${catColors[cat].text}" id="jd-cat-${cat}-num">0%</span>
            </div>
            <div class="jd-cat-bar">
              <div class="jd-cat-bar-fill" id="jd-cat-${cat}-fill" style="background:${catColors[cat].bar}"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="jd-chips-section">
        <div class="jd-chips-title">Matched Skills</div>
        <div class="jd-chips-row">${matchedLabel}</div>
      </div>

      <div class="jd-chips-section">
        <div class="jd-chips-title">Skill Gaps</div>
        <div class="jd-chips-row">${gapsLabel}</div>
      </div>

      <div class="jd-narrative">${narrative}</div>
    `;

    // Animate after DOM is painted
    requestAnimationFrame(() => {
        animateValue(document.getElementById('jd-score-num'), overallScore);
        setTimeout(() => {
            document.getElementById('jd-overall-fill').style.width = overallScore + '%';
        }, 80);
        Object.entries(catScores).forEach(([cat, pct], i) => {
            setTimeout(() => {
                const fillEl = document.getElementById(`jd-cat-${cat}-fill`);
                const numEl  = document.getElementById(`jd-cat-${cat}-num`);
                if (fillEl) fillEl.style.width = pct + '%';
                if (numEl)  animateValue(numEl, pct, '%', 700);
            }, 150 + i * 80);
        });
    });
}

const btnAnalyze = document.getElementById('btn-analyze');
const jdTextarea = document.getElementById('jd-textarea');
const jdResults  = document.getElementById('jd-results');

jdResults.innerHTML = `<div class="jd-empty-state">Paste a job description above<br>and hit <span style="color:var(--color-primary)">Analyze Fit</span> to see your match score.</div>`;

btnAnalyze.addEventListener('click', () => {
    const text = jdTextarea.value.trim();
    if (!text || text.length < 30) {
        jdResults.innerHTML = `<div class="jd-empty-state" style="color:var(--color-accent)">Please paste a full job description (at least a few lines).</div>`;
        return;
    }

    btnAnalyze.disabled = true;
    btnAnalyze.querySelector('span').textContent = 'Analyzing...';
    jdResults.innerHTML = `<div class="jd-empty-state">Running fit analysis<span id="jd-dots">.</span></div>`;

    // Animate dots
    let dotCount = 1;
    const dotInterval = setInterval(() => {
        const dotsEl = document.getElementById('jd-dots');
        if (dotsEl) { dotCount = (dotCount % 3) + 1; dotsEl.textContent = '.'.repeat(dotCount); }
    }, 400);

    setTimeout(() => {
        clearInterval(dotInterval);
        const results = analyzeJobFit(text);
        renderResults(results);
        btnAnalyze.disabled = false;
        btnAnalyze.querySelector('span').textContent = 'Analyze Fit';
    }, 1400);
});
