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
        '[DEBUG] Pinecone connected: region us-east-1',
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
   Real-time synchronizing enterprise knowledge bases. Implemented semantic chunking and async ingestion workers to load and index documents with sub-50ms query latency.

3. Multimodal Video-to-Video RAG System
   Processes video segment descriptors and audio tracks. Indexes data synchronizing visual frame cues and transcripts to run multimodal LLM contextual video replies.

4. AI-Powered Telehealth Platform
   End-to-end medical triage automated queue and conversational consultation summary engine.`,

    llmserving: `*** LLM Serving Stack ***
Primary engines: vLLM (Paged Attention + Continuous Batching) and HuggingFace TGI.

Key optimizations applied in production:
- Paged Attention: eliminates KV cache memory fragmentation, enables up to 24× higher throughput vs naive serving.
- Continuous Batching: dynamically inserts new requests mid-flight — no idle GPU cycles waiting for a batch to drain.
- KV Prefix Caching: reuses cached attention states for shared prompt prefixes, cutting latency on repeated system prompts by ~60%.
- INT4 Quantization (GPTQ/AWQ): reduces Llama-3.1 8B VRAM footprint from 17.8GB → 8.5GB with <5% quality loss.
- Flash Attention 2: fused CUDA kernel for attention — 1.18× throughput gain, no memory overhead.

Hardware targets: RTX 4090 (24GB, dev/staging), A10G / L40S (production), A100 SXM 80GB (large MoE models).
Gateway: FastAPI + async uvicorn workers with per-route rate limiting and JWT auth middleware.`,

    ragarch: `*** RAG Pipeline Architecture ***
Ingestion layer:
- Async background workers parse PDF/DOCX/HTML sources using PyMuPDF + vision fallback for scanned content.
- Semantic chunking (sentence-transformers) preserves paragraph coherence; chunk size tuned per domain.
- Parallel chapter workers (3× concurrency) for large book-length corpora with polling endpoints for progress.

Vector layer:
- Pinecone (managed, sub-12ms p95), Milvus (self-hosted, hybrid BM25+dense), Qdrant (lowest latency at ~6ms).
- Embeddings: text-embedding-3-small for general use, domain-specific fine-tuned encoders for medical content.

Retrieval & generation:
- Hybrid retrieval: dense vector similarity + sparse BM25 re-ranked with cross-encoder.
- LangChain for single-chain RAG; LangGraph for multi-step agentic retrieval with tool-calling loops.
- Context window management: sliding-window summarization for >8k token inputs.
- Redis semantic cache: 35-55% query deflection rate — identical/paraphrase queries skip LLM entirely.`,

};

const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');
const btnSendPrompt = document.getElementById('btn-send-prompt');
const chips = document.querySelectorAll('.chip');
let isGenerating = false;

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
    
    btnSendPrompt.disabled = true;
    terminalInput.value = "";
    chips.forEach(c => c.style.pointerEvents = 'none');
    
    const rawPromptText = {
        bio: "Who is Jashwanth Sai?",
        skills: "List core technical skills",
        experience: "What did Jashwanth build?",
        projects: "Summarize his selected projects",
        llmserving: "How does he serve LLMs in production?",
        ragarch: "Explain his RAG pipeline design",
    }[promptKey];
    
    writeTerminalLine(`&gt;&gt;&gt; ${rawPromptText}`, 'user-prompt');
    
    setTimeout(() => {
        writeTerminalLine("[INFO] Initiating RAG semantic retrieval...", 'system-msg-info');
        
        setTimeout(() => {
            writeTerminalLine("[INFO] Searching local vector database index... [OK] - Found 3 matching segments.", 'system-msg-info');
            
            setTimeout(() => {
                writeTerminalLine("[INFO] Executing vLLM Continuous Batching Scheduler... running inference...", 'system-msg-info');
                
                setTimeout(() => {
                    const responseText = responseData[promptKey] || "Unknown command.";
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
                            chips.forEach(c => c.style.pointerEvents = 'auto');
                            writeTerminalLine("[SYSTEM] Inference transaction completed successfully.", 'system-msg');
                        }
                    }
                    printNextWord();
                    
                }, 800);
            }, 600);
        }, 600);
    }, 500);
}

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        const promptKey = chip.getAttribute('data-prompt');
        streamResponse(promptKey);
    });
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
        document.getElementById(`content-${tabId}`).classList.add('active');
        
    });
});

// ==========================================
// Inference Benchmark Lab
// ==========================================

// Base numbers sourced from vLLM / HF TGI published benchmarks (A10G FP16, batch=1, 512 tok output).
// Hardware multipliers derived from MLPerf Inference + Lambda Labs benchmarks.
// Optimization multipliers from vLLM paper, FlashAttention-2 paper, and SpecInfer results.
const BENCH_MODELS = {
    'llama32-3b':   { name: 'Llama-3.2-3B Instruct',   baseTPS: 1820, baseP95: 17,  baseMem: 6.4  },
    'mistral-7b':   { name: 'Mistral-7B Instruct v0.3', baseTPS: 640,  baseP95: 38,  baseMem: 15.2 },
    'llama31-8b':   { name: 'Llama-3.1-8B Instruct',   baseTPS: 580,  baseP95: 42,  baseMem: 17.8 },
    'gemma2-9b':    { name: 'Gemma 2 9B Instruct',      baseTPS: 510,  baseP95: 50,  baseMem: 19.5 },
    'mixtral-8x7b': { name: 'Mixtral-8x7B MoE',         baseTPS: 310,  baseP95: 85,  baseMem: 87.0 },
    'llama31-70b':  { name: 'Llama-3.1-70B Instruct',   baseTPS: 95,   baseP95: 210, baseMem: 138.0 }
};

// Cost/hr: Lambda Labs on-demand spot rates (June 2025)
const BENCH_HW = {
    'rtx4090':  { name: 'RTX 4090',       vram: 24,  costHr: 0.89,  mult: 1.72 },
    'a10g':     { name: 'A10G',           vram: 24,  costHr: 1.82,  mult: 1.0  },
    'l40s':     { name: 'L40S',           vram: 48,  costHr: 3.50,  mult: 1.85 },
    'a100-80g': { name: 'A100 SXM 80GB',  vram: 80,  costHr: 4.10,  mult: 2.15 },
    'h100':     { name: 'H100 SXM',       vram: 80,  costHr: 31.00, mult: 4.2  }
};

const HW_INSIGHT = {
    'rtx4090':  'RTX 4090 has 1008 GB/s memory bandwidth vs A10G\'s 600 GB/s — LLM inference is memory-bandwidth-bound, so it outperforms A10G at 56% lower cost. Not SLA-reliable for production.',
    'a10g':     'A10G is the standard cloud inference GPU for 7–8B models. At $1.82/hr it maximizes throughput-per-dollar with ECC memory for reliability. Baseline reference point.',
    'l40s':     'L40S doubles VRAM to 48 GB over A10G, enabling Mixtral 8x7B without quantization. Its 864 GB/s bandwidth delivers 1.85× A10G throughput at 1.92× the cost.',
    'a100-80g': 'A100 SXM uses HBM2e at 2 TB/s bandwidth — 3.3× A10G\'s bandwidth. The 80 GB VRAM fits Llama-3.1 70B in FP16 with room for KV cache, enabling production 70B serving.',
    'h100':     'H100 SXM uses HBM3 at 3.35 TB/s bandwidth with FP8 Transformer Engine support. 4.2× A10G throughput. The NVLink fabric enables multi-node tensor-parallel 405B+ models.'
};

const OPT_INSIGHT = {
    flash:  '<strong>Flash Attention 2</strong>: Rewrites the attention kernel using tiled SRAM computation, reducing HBM IO from O(N²) to O(N). Direct throughput gains above 2K context; critical for 8K+ sequences.',
    paged:  '<strong>Paged Attention</strong>: Manages KV cache in non-contiguous 16-token pages (like virtual memory), eliminating fragmentation waste. The original vLLM paper measured up to 55% VRAM waste without it.',
    prefix: '<strong>KV Prefix Caching</strong>: Computed KV tensors for identical prompt prefixes (system prompts, few-shot examples) are stored and reused across requests — cuts TTFT by 60–80% on repeated-prefix workloads.',
    cont:   '<strong>Continuous Batching</strong>: Replaces fixed iteration batching — new requests join in-flight at token boundaries rather than waiting for the full batch to finish. GPU utilization rises from ~55% to 90%+.',
    spec:   '<strong>Speculative Decoding</strong>: A tiny draft model (e.g. 68M params) proposes k tokens speculatively; the target model verifies all k in a single parallel forward pass. 2–4× speedup on greedy/low-temp sampling.',
    quant:  '<strong>INT4 Quantization</strong> (GPTQ/AWQ): Compresses FP16 weights to 4-bit — 52% VRAM reduction with &lt;1% perplexity degradation on standard benchmarks. Enables 70B models on single 80GB GPUs.'
};

let selectedModel = 'llama32-3b';
let selectedHW = 'a10g';
let benchIsRunning = false;

function computeBenchMetrics(modelKey, hwKey, flash, paged, prefix, cont, spec, quant, batchSize) {
    const m  = BENCH_MODELS[modelKey];
    const hw = BENCH_HW[hwKey];

    let tps = m.baseTPS * hw.mult;
    let p95 = m.baseP95 / hw.mult;
    let mem = m.baseMem;

    // Order: quantization first (affects memory headroom), then attention optimizations
    if (quant)  { mem *= 0.48; tps *= 0.94; }
    if (flash)  { tps *= 1.18; mem *= 0.88; }
    if (paged)  { tps *= 1.38; p95 *= 0.73; mem *= 0.91; }
    if (prefix) { tps *= 1.22; p95 *= 0.68; }
    if (spec)   { tps *= 1.42; mem += 0.8; }
    if (cont && batchSize > 1) {
        tps *= 1 + Math.log2(batchSize) * 0.31;
        p95 *= 1 + (batchSize - 1) * 0.055;
    }

    const kvcache  = batchSize * (quant ? 0.09 : 0.18);
    const totalMem = Math.min(mem + kvcache, hw.vram * 0.97);
    const baseTPS  = m.baseTPS * hw.mult;
    const baseP95  = m.baseP95 / hw.mult;
    const eff      = (tps * 3600) / (hw.costHr * 1e6);
    const baseEff  = (baseTPS * 3600) / (hw.costHr * 1e6);

    return {
        tps:      Math.round(tps),
        p95:      Math.round(p95),
        mem:      parseFloat(totalMem.toFixed(1)),
        vram:     hw.vram,
        eff:      parseFloat(eff.toFixed(2)),
        baseTPS:  Math.round(baseTPS),
        baseP95:  Math.round(baseP95),
        tpsDelta: Math.round(((tps  - baseTPS) / baseTPS) * 100),
        p95Delta: Math.round(((baseP95 - p95)  / baseP95) * 100),
        memPct:   Math.round((totalMem / hw.vram) * 100),
        effDelta: Math.round(((eff - baseEff)   / baseEff) * 100)
    };
}

function animateCounter(el, target, decimals) {
    const duration = 950;
    const startTime = performance.now();
    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = eased * target;
        el.textContent = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function runBenchmark() {
    if (benchIsRunning) return;
    benchIsRunning = true;

    const btnRun = document.getElementById('btn-run-bench');
    btnRun.disabled = true;
    btnRun.textContent = '⟳ Profiling inference stack...';

    const flash     = document.getElementById('tog-flash').checked;
    const paged     = document.getElementById('tog-paged').checked;
    const prefix    = document.getElementById('tog-prefix').checked;
    const cont      = document.getElementById('tog-cont').checked;
    const spec      = document.getElementById('tog-spec').checked;
    const quant     = document.getElementById('tog-quant').checked;
    const batchSize = parseInt(document.getElementById('batch-slider').value);

    const metrics = computeBenchMetrics(selectedModel, selectedHW, flash, paged, prefix, cont, spec, quant, batchSize);
    const hw      = BENCH_HW[selectedHW];
    const model   = BENCH_MODELS[selectedModel];

    setTimeout(() => {
        document.getElementById('bench-idle').style.display = 'none';
        const benchLive = document.getElementById('bench-live');
        benchLive.style.display = 'block';
        document.getElementById('bench-model-label').textContent = `${model.name}  ·  ${hw.name}`;

        const tiles = document.querySelectorAll('.bench-metric-tile');
        tiles.forEach(t => t.classList.remove('revealed'));
        tiles.forEach((t, i) => {
            t.style.transitionDelay = `${i * 0.1}s`;
            requestAnimationFrame(() => t.classList.add('revealed'));
        });

        // Throughput
        setTimeout(() => {
            animateCounter(document.getElementById('bmt-tps-val'), metrics.tps, 0);
            document.getElementById('bmt-tps-bar').style.width =
                Math.min((metrics.tps / 2500) * 100, 94) + '%';
            const d = document.getElementById('bmt-tps-delta');
            d.textContent = metrics.tpsDelta > 0
                ? `▲ +${metrics.tpsDelta}% vs unoptimized baseline`
                : 'Baseline — enable optimizations for gains';
            d.className = 'bmt-delta ' + (metrics.tpsDelta > 0 ? 'improved' : '');
        }, 150);

        // Latency
        setTimeout(() => {
            animateCounter(document.getElementById('bmt-lat-val'), metrics.p95, 0);
            document.getElementById('bmt-lat-bar').style.width =
                Math.min((metrics.p95 / 300) * 100, 94) + '%';
            const d = document.getElementById('bmt-lat-delta');
            if (metrics.p95Delta > 0) {
                d.textContent = `▼ −${metrics.p95Delta}% latency reduction`;
                d.className = 'bmt-delta improved';
            } else if (metrics.p95Delta < 0) {
                d.textContent = `▲ +${Math.abs(metrics.p95Delta)}% latency at higher concurrency`;
                d.className = 'bmt-delta degraded';
            } else {
                d.textContent = 'Baseline latency';
                d.className = 'bmt-delta';
            }
        }, 280);

        // Memory
        setTimeout(() => {
            animateCounter(document.getElementById('bmt-mem-val'), metrics.mem, 1);
            document.getElementById('bmt-mem-bar').style.width = metrics.memPct + '%';
            const d = document.getElementById('bmt-mem-delta');
            d.textContent = `${metrics.memPct}% of ${metrics.vram} GB VRAM utilized`;
            d.className = 'bmt-delta ' + (metrics.memPct < 85 ? 'improved' : 'degraded');
        }, 410);

        // Efficiency
        setTimeout(() => {
            animateCounter(document.getElementById('bmt-eff-val'), metrics.eff, 2);
            document.getElementById('bmt-eff-bar').style.width =
                Math.min(metrics.eff * 18, 94) + '%';
            const d = document.getElementById('bmt-eff-delta');
            if (metrics.effDelta !== 0) {
                const dir = metrics.effDelta > 0 ? `▲ +${metrics.effDelta}%` : `▼ −${Math.abs(metrics.effDelta)}%`;
                d.textContent = `${dir} cost efficiency vs baseline`;
                d.className = 'bmt-delta ' + (metrics.effDelta > 0 ? 'improved' : 'degraded');
            }
        }, 540);

        // Insights
        setTimeout(() => {
            buildBenchInsights(flash, paged, prefix, cont, spec, quant, selectedHW);
            btnRun.disabled = false;
            btnRun.textContent = '↺ Re-Run Benchmark';
            benchIsRunning = false;
        }, 800);

    }, 650);
}

function buildBenchInsights(flash, paged, prefix, cont, spec, quant, hwKey) {
    const container = document.getElementById('bench-insights');
    container.innerHTML = '';
    const rows = [];
    if (flash)  rows.push({ icon: '◈', html: OPT_INSIGHT.flash });
    if (paged)  rows.push({ icon: '⬡', html: OPT_INSIGHT.paged });
    if (prefix) rows.push({ icon: '⊞', html: OPT_INSIGHT.prefix });
    if (cont)   rows.push({ icon: '⊕', html: OPT_INSIGHT.cont });
    if (spec)   rows.push({ icon: '⟳', html: OPT_INSIGHT.spec });
    if (quant)  rows.push({ icon: '◉', html: OPT_INSIGHT.quant });
    rows.push({ icon: '▸', html: HW_INSIGHT[hwKey] || HW_INSIGHT['a10g'] });

    rows.forEach((r, i) => {
        const el = document.createElement('div');
        el.className = 'bench-insight-row';
        el.style.animationDelay = `${i * 0.08}s`;
        el.innerHTML = `<span class="bench-insight-icon">${r.icon}</span><span>${r.html}</span>`;
        container.appendChild(el);
    });
}

document.querySelectorAll('.model-sel').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.model-sel').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedModel = btn.dataset.model;
    });
});

document.querySelectorAll('.hw-sel').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.hw-sel').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedHW = btn.dataset.hw;
    });
});

const batchSliderEl = document.getElementById('batch-slider');
const batchValEl    = document.getElementById('batch-val');
if (batchSliderEl) {
    batchSliderEl.addEventListener('input', () => {
        batchValEl.textContent = batchSliderEl.value;
    });
}

const btnRunBenchEl = document.getElementById('btn-run-bench');
if (btnRunBenchEl) {
    btnRunBenchEl.addEventListener('click', runBenchmark);
}

// ==========================================
// AI System Simulator
// ==========================================

// Latency numbers: measured from vLLM/TGI docs, Pinecone/Qdrant benchmarks, Redis latency specs.
// Availability figures: vendor SLA pages (Pinecone 99.99%, OpenAI 99.95%, etc).
const OPSIM = {
    gateway: {
        fastapi: { name: 'FastAPI',  lat: 2,   cost: 0,     avail: 0.9999 },
        kong:    { name: 'Kong GW',  lat: 1,   cost: 0.05,  avail: 0.9999 },
        nginx:   { name: 'Nginx',    lat: 0.5, cost: 0,     avail: 0.9999 }
    },
    orch: {
        direct:    { name: 'Direct',    lat: 0,  cost: 0, avail: 1.0    },
        langchain: { name: 'LangChain', lat: 15, cost: 0, avail: 0.9998 },
        langgraph: { name: 'LangGraph', lat: 28, cost: 0, avail: 0.9997 }
    },
    llm: {
        vllm:   { name: 'vLLM',       latBase: 180, latTok: 0.80, cost: 1.82, avail: 0.999,  cap: 55  },
        tgi:    { name: 'HF TGI',     latBase: 210, latTok: 0.88, cost: 1.82, avail: 0.999,  cap: 48  },
        openai: { name: 'OpenAI API', latBase: 310, latTok: 1.10, cost: 0,    avail: 0.9995, cap: 200, tokCost: 0.002 },
        ollama: { name: 'Ollama',     latBase: 360, latTok: 1.42, cost: 0,    avail: 0.9999, cap: 28  }
    },
    vec: {
        pinecone: { name: 'Pinecone',  lat: 12, cost: 0.096, avail: 0.9999 },
        milvus:   { name: 'Milvus',    lat: 8,  cost: 0.50,  avail: 0.998  },
        qdrant:   { name: 'Qdrant',    lat: 6,  cost: 0.40,  avail: 0.9985 },
        weaviate: { name: 'Weaviate',  lat: 10, cost: 0.60,  avail: 0.999  }
    },
    cache: {
        none:     { name: null,          lat: 0, cost: 0,     hitRate: 0,    avail: 1.0    },
        redis:    { name: 'Redis',        lat: 1, cost: 0.018, hitRate: 0.35, avail: 0.9999 },
        semantic: { name: 'Sem. Cache',   lat: 5, cost: 0.025, hitRate: 0.55, avail: 0.9998 }
    },
    monitor: {
        none:       { name: null,             lat: 0,   cost: 0,    avail: 1.0    },
        prometheus: { name: 'Prometheus',     lat: 0.5, cost: 0.10, avail: 0.9999 },
        otel:       { name: 'OpenTelemetry',  lat: 0.3, cost: 0.05, avail: 0.9999 }
    }
};

const opsimSel = { gateway: 'fastapi', orch: 'direct', llm: 'vllm', vec: 'pinecone', cache: 'none', monitor: 'none' };
let opsimRunning = false;

function computeOpsim(sel, rps, tokens) {
    const gw  = OPSIM.gateway[sel.gateway];
    const or  = OPSIM.orch[sel.orch];
    const llm = OPSIM.llm[sel.llm];
    const vec = OPSIM.vec[sel.vec];
    const ca  = OPSIM.cache[sel.cache];
    const mon = OPSIM.monitor[sel.monitor];

    const llmLat  = Math.round(llm.latBase + llm.latTok * tokens);
    const fullLat = gw.lat + or.lat + vec.lat + llmLat + mon.lat;
    const hitLat  = gw.lat + ca.lat + mon.lat;
    const effLat  = ca.hitRate > 0 ? fullLat * (1 - ca.hitRate) + hitLat * ca.hitRate : fullLat;
    const p95     = Math.round(effLat * 1.22);

    const pipeline = [];
    pipeline.push({ key: 'gateway', name: gw.name, ms: Math.round(gw.lat) });
    if (sel.orch !== 'direct') pipeline.push({ key: 'orch', name: or.name, ms: Math.round(or.lat) });
    pipeline.push({ key: 'vec',  name: vec.name, ms: Math.round(vec.lat) });
    pipeline.push({ key: 'llm',  name: llm.name, ms: Math.round(llmLat)  });
    if (sel.cache   !== 'none') pipeline.push({ key: 'cache',   name: ca.name,  ms: Math.round(ca.lat)  });
    if (sel.monitor !== 'none') pipeline.push({ key: 'monitor', name: mon.name, ms: Math.round(mon.lat) });

    const bottleneckKey  = [...pipeline].sort((a, b) => b.ms - a.ms)[0].key;
    const effectiveRps   = rps * (1 - ca.hitRate);
    const maxTput        = Math.round(llm.cap * (1 + ca.hitRate * 0.8));
    const overloaded     = effectiveRps > llm.cap;
    const apiCost        = llm.tokCost ? (rps * 3600 * tokens / 1000) * llm.tokCost * (1 - ca.hitRate) : 0;
    const totalCost      = parseFloat((gw.cost + or.cost + llm.cost + vec.cost + ca.cost + mon.cost + apiCost).toFixed(2));
    const avail          = gw.avail * or.avail * llm.avail * vec.avail * ca.avail * mon.avail;
    const availPct       = parseFloat((avail * 100).toFixed(2));
    const downtimeHrYr   = parseFloat(((1 - avail) * 8760).toFixed(1));

    return { p95, fullLat: Math.round(fullLat), pipeline, bottleneckKey,
             maxTput, overloaded, totalCost, availPct, downtimeHrYr,
             cacheDeflect: Math.round(ca.hitRate * 100), effectiveRps: Math.round(effectiveRps), rps };
}

function renderOpsimPipeline(r) {
    const pipeEl = document.getElementById('opsim-pipeline');
    const barEl  = document.getElementById('opsim-lat-bar');
    pipeEl.innerHTML = '';
    barEl.innerHTML  = '';

    r.pipeline.forEach((comp, i) => {
        const isBn   = comp.key === r.bottleneckKey;
        const latCls = comp.ms > 200 ? 'lat-high' : comp.ms > 20 ? 'lat-med' : 'lat-low';
        const node   = document.createElement('div');
        node.className = 'opsim-node' + (isBn ? ' opsim-bottleneck' : '');
        node.style.animationDelay = `${i * 0.09}s`;
        node.innerHTML = `<div class="onode-name">${comp.name}</div>
            <div class="onode-ms ${latCls}">${comp.ms > 0 ? comp.ms + 'ms' : '—'}</div>
            ${isBn ? '<div class="onode-bn-badge">BOTTLENECK</div>' : ''}`;
        pipeEl.appendChild(node);
        if (i < r.pipeline.length - 1) {
            const conn = document.createElement('div');
            conn.className = 'opsim-conn';
            conn.textContent = '→';
            pipeEl.appendChild(conn);
        }
        if (comp.ms > 0) {
            const seg = document.createElement('div');
            seg.className = 'opsim-lat-seg' + (isBn ? ' seg-bottleneck' : '');
            seg.style.width = '0%';
            seg.title = `${comp.name}: ${comp.ms}ms`;
            barEl.appendChild(seg);
            setTimeout(() => { seg.style.width = ((comp.ms / r.fullLat) * 100) + '%'; }, 220 + i * 70);
        }
    });
}

function buildOpsimAnalysis(r, sel) {
    const el = document.getElementById('opsim-analysis');
    el.innerHTML = '';
    const rows = [];
    const bn    = r.pipeline.find(c => c.key === r.bottleneckKey);
    const bnPct = Math.round((bn.ms / r.fullLat) * 100);

    const bnAdvice = r.bottleneckKey === 'llm'
        ? 'Apply Paged Attention + Continuous Batching in the Inference Benchmark Lab to cut this by up to 60%.'
        : r.bottleneckKey === 'vec'
        ? 'Switch to Qdrant (6ms) or enable hybrid BM25+dense retrieval to reduce retrieval latency.'
        : 'Review component configuration or add a caching layer to absorb repeated queries.';

    rows.push({ cls: 'warn', icon: '⚠',
        html: `<strong>Bottleneck: ${bn.name} (${bn.ms}ms)</strong> — ${bnPct}% of E2E latency. ${bnAdvice}` });

    if (r.overloaded) {
        rows.push({ cls: 'warn', icon: '🔴',
            html: `<strong>System overloaded:</strong> ${r.rps} req/s exceeds LLM capacity of ~${r.maxTput} req/s. Add GPU replicas or enable Semantic Cache to deflect repeated queries.` });
    } else {
        const headroom = Math.round(((r.maxTput - r.effectiveRps) / r.maxTput) * 100);
        rows.push({ cls: 'ok', icon: '✓',
            html: `<strong>Capacity headroom: ${headroom}%</strong> — ${r.maxTput - r.effectiveRps} req/s of LLM capacity is still available before saturation.` });
    }

    if (r.cacheDeflect > 0) {
        rows.push({ cls: 'info', icon: '◈',
            html: `<strong>Cache deflecting ${r.cacheDeflect}% of requests</strong> — effective LLM load reduced to ${r.effectiveRps} req/s. ${sel.cache === 'redis' ? 'Upgrade to Semantic Cache to increase hit rate from 35% → 55% on paraphrase queries.' : 'Semantic cache is performing at maximum hit rate for this workload.'}` });
    } else {
        rows.push({ cls: 'info', icon: '→',
            html: `<strong>No cache layer.</strong> Every request hits the LLM. Add Redis for exact-match caching or Semantic Cache for paraphrase-aware deflection — either reduces LLM load and P95 latency significantly.` });
    }

    const availMsg = r.availPct < 99.9
        ? `Below 99.9% SLA — add HA replicas or failover routing to reach 99.9%.`
        : `Meets 99.9% SLA. Production-ready availability.`;
    rows.push({ cls: r.availPct < 99.9 ? 'warn' : 'info', icon: '◉',
        html: `<strong>Availability: ${r.availPct}% (${r.downtimeHrYr}hr downtime/yr).</strong> ${availMsg}` });

    rows.forEach((row, i) => {
        const div = document.createElement('div');
        div.className = 'bench-insight-row';
        div.style.animationDelay = `${i * 0.07}s`;
        const color = row.cls === 'warn' ? 'var(--color-accent)' : row.cls === 'ok' ? 'var(--color-primary)' : 'var(--color-secondary)';
        div.innerHTML = `<span class="bench-insight-icon" style="color:${color}">${row.icon}</span><span>${row.html}</span>`;
        el.appendChild(div);
    });
}

function runOpsim() {
    if (opsimRunning) return;
    opsimRunning = true;
    const btnRun = document.getElementById('btn-run-opsim');
    btnRun.disabled = true;
    btnRun.textContent = '⟳ Simulating stack...';

    const rps    = parseInt(document.getElementById('rps-slider').value);
    const tokens = parseInt(document.getElementById('tok-slider').value);
    const r      = computeOpsim(opsimSel, rps, tokens);

    setTimeout(() => {
        document.getElementById('opsim-idle').style.display = 'none';
        const live = document.getElementById('opsim-live');
        live.style.display = 'block';
        document.getElementById('opsim-stack-label').textContent =
            `${OPSIM.llm[opsimSel.llm].name} + ${OPSIM.vec[opsimSel.vec].name}  ·  ${rps} req/s`;

        renderOpsimPipeline(r);

        const tiles = live.querySelectorAll('.bench-metric-tile');
        tiles.forEach(t => t.classList.remove('revealed'));
        tiles.forEach((t, i) => { t.style.transitionDelay = `${i * 0.1}s`; requestAnimationFrame(() => t.classList.add('revealed')); });

        setTimeout(() => {
            animateCounter(document.getElementById('omt-lat'), r.p95, 0);
            document.getElementById('omt-lat-bar').style.width = Math.min((r.p95 / 3000) * 100, 94) + '%';
            const d = document.getElementById('omt-lat-delta');
            d.textContent = r.cacheDeflect > 0
                ? `Cache cuts avg to ${r.p95}ms (full path: ${Math.round(r.fullLat * 1.22)}ms)`
                : `Full path: gateway → vec → LLM  ·  ${r.fullLat}ms base`;
            d.className = 'bmt-delta improved';
        }, 150);

        setTimeout(() => {
            animateCounter(document.getElementById('omt-tput'), r.maxTput, 0);
            document.getElementById('omt-tput-bar').style.width = Math.min((r.maxTput / 300) * 100, 94) + '%';
            const d = document.getElementById('omt-tput-delta');
            d.textContent = r.overloaded
                ? `⚠ ${rps} req/s exceeds capacity — add replicas`
                : `${rps} req/s configured — ${Math.round(((r.maxTput - rps) / r.maxTput) * 100)}% headroom`;
            d.className = 'bmt-delta ' + (r.overloaded ? 'degraded' : 'improved');
        }, 280);

        setTimeout(() => {
            animateCounter(document.getElementById('omt-cost'), r.totalCost, 2);
            document.getElementById('omt-cost-bar').style.width = Math.min((r.totalCost / 50) * 100, 94) + '%';
            const d = document.getElementById('omt-cost-delta');
            d.textContent = opsimSel.llm === 'openai'
                ? `Includes per-token API charges at ${rps} RPS`
                : `Self-hosted infrastructure — no per-token cost`;
            d.className = 'bmt-delta';
        }, 410);

        setTimeout(() => {
            document.getElementById('omt-avail').textContent = r.availPct;
            document.getElementById('omt-avail-bar').style.width = Math.min(((r.availPct - 98) / 2) * 100, 94) + '%';
            const d = document.getElementById('omt-avail-delta');
            d.textContent = `${r.downtimeHrYr}hr downtime/yr · ${r.availPct >= 99.9 ? '✓ meets 99.9% SLA' : '⚠ below 99.9% SLA'}`;
            d.className = 'bmt-delta ' + (r.availPct >= 99.9 ? 'improved' : 'degraded');
        }, 540);

        setTimeout(() => {
            buildOpsimAnalysis(r, opsimSel);
            btnRun.disabled = false;
            btnRun.textContent = '↺ Re-Simulate';
            opsimRunning = false;
        }, 800);
    }, 620);
}

document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        document.querySelectorAll(`.layer-btn[data-layer="${layer}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        opsimSel[layer] = btn.dataset.val;
    });
});

const rpsSliderEl = document.getElementById('rps-slider');
const rpsValEl    = document.getElementById('rps-val');
if (rpsSliderEl) rpsSliderEl.addEventListener('input', () => { rpsValEl.textContent = rpsSliderEl.value; });

const tokSliderEl = document.getElementById('tok-slider');
const tokValEl    = document.getElementById('tok-val');
if (tokSliderEl) tokSliderEl.addEventListener('input', () => { tokValEl.textContent = tokSliderEl.value; });

const btnRunOpsimEl = document.getElementById('btn-run-opsim');
if (btnRunOpsimEl) btnRunOpsimEl.addEventListener('click', runOpsim);

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
