<div align="center">

<img src="https://capsule-render.vercel.app/api?type=soft&color=0:0ea5e9,100:8b5cf6&height=150&section=header&text=Dodda%20Jashwanth%20Sai&fontSize=40&fontColor=ffffff&fontAlignY=45&desc=AI%20Engineer%20%C2%B7%20LLM%20Infrastructure%20%C2%B7%20RAG%20%C2%B7%20Agents&descSize=16&descAlignY=68" alt="Dodda Jashwanth Sai - AI Engineer" width="100%" />

<a href="https://github.com/YOUR_GITHUB_USERNAME">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=16&pause=1400&color=22D3EE&center=true&vCenter=true&width=620&lines=Serving+LLMs+on+my+own+GPUs+with+vLLM;Building+RAG+pipelines+that+stay+in+sync;Shipping+agentic+workflows+to+real+users" alt="Serving LLMs with vLLM, building RAG pipelines, shipping agentic workflows" />
</a>

<br/><br/>

<a href="https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:Jashwanthsai678@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
<img src="https://komarev.com/ghpvc/?username=YOUR_GITHUB_USERNAME&style=flat-square&color=8b5cf6&label=VIEWS" alt="Profile Views" />

</div>

<br/>

```bash
$ whoami
jashwanth  # AI Engineer @ VitaInspire

$ cat focus.txt
self-hosted LLM serving  |  RAG platforms  |  multi-agent workflows  |  multimodal systems

$ cat domains.txt
healthcare, education, enterprise knowledge management
```

## 👨‍💻 About

I build production AI systems for healthcare and education. Most of my work sits where models meet backend engineering: serving LLMs efficiently on self-hosted infrastructure, wiring retrieval pipelines to real documents, and putting agents behind APIs with proper authentication and role-based access.

I care about the unglamorous parts that make AI usable in production: throughput, latency, data isolation, and clean API contracts.

## 🔭 What I Build

| | |
|---|---|
| **LLM serving** | Multimodal models on vLLM with OpenAI- and Gemini-compatible endpoints, so apps can leave third-party providers without code rewrites |
| **RAG platforms** | Ingestion, chunking, embedding, and retrieval that keep enterprise knowledge bases continuously synced |
| **Agent workflows** | Stateful LangGraph pipelines using function calling, structured outputs, and RBAC data isolation |
| **Multimodal AI** | Video-to-video RAG that turns training videos into contextual video answers |
| **Clinical AI** | Guardrailed LLM agents for documentation, summarization, and entity extraction against EHR databases |

## 🧰 Stack

| Layer | Tools |
|---|---|
| **Languages** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![SQL](https://img.shields.io/badge/SQL-336791?style=flat-square&logo=postgresql&logoColor=white) ![C#](https://img.shields.io/badge/C%23-512BD4?style=flat-square&logo=csharp&logoColor=white) ![C](https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white) ![Bash](https://img.shields.io/badge/Bash-4EAA25?style=flat-square&logo=gnubash&logoColor=white) |
| **GenAI & Serving** | ![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white) ![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langgraph&logoColor=white) ![vLLM](https://img.shields.io/badge/vLLM-30A2FF?style=flat-square&logo=vllm&logoColor=white) ![TGI](https://img.shields.io/badge/TGI-FFD21E?style=flat-square&logo=huggingface&logoColor=black) |
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white) ![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=flat-square&logo=dotnet&logoColor=white) |
| **Data** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) ![Vector DBs](https://img.shields.io/badge/Vector%20DBs-6D28D9?style=flat-square) |
| **Cloud & Ops** | ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white) ![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat-square&logo=googlecloud&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![Terraform](https://img.shields.io/badge/Terraform-844FBA?style=flat-square&logo=terraform&logoColor=white) ![CI/CD](https://img.shields.io/badge/CI%2FCD-2088FF?style=flat-square&logo=githubactions&logoColor=white) ![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black) |

**Inference optimization:** `PagedAttention` · `KV Cache` · `Continuous Batching` · `Quantization` · `LoRA` · `GPU Optimization`

## 🧩 How My Systems Work

<details>
<summary><b>Self-hosted LLM platform</b> - request path</summary>

<br/>

```mermaid
flowchart LR
    A[Client apps] -->|API key| B[Internal SDK]
    B --> C[OpenAI / Gemini compatible API]
    C --> D[vLLM engine]
    D --> E[PagedAttention + KV cache]
    E --> F[Continuous batching]
    F --> G[(GPU)]
```

</details>

<details>
<summary><b>Live Sync RAG platform</b> - ingestion to answer</summary>

<br/>

```mermaid
flowchart LR
    A[Enterprise sources<br/>OAuth] --> B[Async ingestion<br/>PDF / DOCX / text]
    B --> C[Chunking]
    C --> D[Embeddings]
    D --> E[(Vector index)]
    F[User query] --> G[Semantic retrieval]
    E --> G
    G --> H[LLM answer]
```

</details>

## 📂 Selected Projects

<details>
<summary><b>Self-Hosted Multimodal LLM Platform</b></summary>

- High-concurrency multimodal model serving on vLLM
- OpenAI- and Gemini-compatible endpoints for migrating off external providers
- Internal SDK with API-key authentication
- Stack: `vLLM` `PagedAttention` `KV Cache` `Quantization`

</details>

<details>
<summary><b>Live Sync RAG Platform</b></summary>

- Continuously synchronized enterprise knowledge bases
- Async ingestion, chunking, embedding, and retrieval for PDF, DOCX, and text
- OAuth-secured knowledge source sync
- Stack: `RAG` `Vector DB` `Async Python` `OAuth`

</details>

<details>
<summary><b>Multimodal Video-to-Video RAG</b></summary>

- Processes training videos, with or without audio, and answers with contextual video
- Speech extraction, semantic retrieval, LLM reasoning, and video generation
- Stack: `Embeddings` `Multimodal Retrieval` `LLMs`

</details>

<details>
<summary><b>AI-Integrated Educational Platform</b></summary>

- Multi-tenant platform with stateful multi-agent workflows
- Function calling and structured JSON outputs for evaluation and compliance
- RBAC isolation across teachers, administrators, and students
- Stack: `LangGraph` `Function Calling` `RBAC`

</details>

<details>
<summary><b>AI-Powered Telehealth Platform</b></summary>

- Conversational agents for clinical documentation, connected to EHR databases
- Zero-shot and few-shot classification with guardrails for summarization and entity extraction
- Low-latency async API workflows
- Stack: `LLMs` `NER` `Async APIs`

</details>

<sub>Most of these were built professionally, so public repo links will be added as they become available.</sub>

## 🎓 Beyond Work

- B.Tech in Computer Science (AI & ML), Marri Laxman Reddy Institute of Technology and Management
- Selected for the National Innovation Design and Entrepreneurship Bootcamp 2024
- 300+ problems solved across LeetCode, HackerRank, and CodeChef
- Run AI/ML workshops, hackathons, and mentoring sessions for students and junior developers

## 📊 GitHub

<p>
  <img height="150" src="https://github-readme-stats.vercel.app/api?username=YOUR_GITHUB_USERNAME&show_icons=true&hide_border=true&bg_color=0d1117&title_color=22d3ee&icon_color=8b5cf6&text_color=c9d1d9" alt="GitHub Stats" />
  <img height="150" src="https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_GITHUB_USERNAME&layout=compact&hide_border=true&bg_color=0d1117&title_color=22d3ee&text_color=c9d1d9" alt="Top Languages" />
</p>

<img src="https://capsule-render.vercel.app/api?type=soft&color=0:0ea5e9,100:8b5cf6&height=70&section=footer" alt="" width="100%" />
