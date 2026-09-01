<div align="center">

# 🔷 Graphinity
### Visual AI Workflow Builder

A full-stack visual workflow platform for building, connecting, validating, and executing AI and data workflows through a node-based interface.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Flow](https://img.shields.io/badge/React%20Flow-Workflow%20Editor-0f172a?style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-443627?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python)
![NetworkX](https://img.shields.io/badge/NetworkX-Graph%20Engine-1f77b4?style=for-the-badge)
![Groq](https://img.shields.io/badge/Groq-AI%20API-6E56CF?style=for-the-badge)

</div>

---

# 📖 Overview

Graphinity is a visual workflow builder that allows users to create workflows by dragging nodes onto a canvas and connecting them together.

The frontend is built with **React and React Flow**, while the backend uses **FastAPI and NetworkX** to validate and execute workflow graphs.

Graphinity supports AI-powered processing through the **Groq API**, along with conditional branching, HTTP API calls, mathematical operations, text processing, filtering, delays, and detailed execution monitoring.

---

# ✨ Key Features

- 🧩 Drag-and-drop workflow builder
- 🔗 Node-based workflow connections
- 🧠 DAG-based workflow execution
- 🔍 Workflow cycle detection and validation
- 🤖 Real LLM execution using Groq API
- 🔀 TRUE/FALSE conditional branching
- 🌐 HTTP API nodes
- ➕ Mathematical operations
- 🔎 Keyword-based filtering
- 📝 Text processing and variable resolution
- ⏱️ Delay nodes
- 📥 Custom input nodes
- 📤 Custom output nodes
- 📊 Detailed execution monitoring
- 📋 Execution order tracking
- ⏱️ Node-level execution timing
- 🧾 Node input/output logging
- ❌ Delete nodes without refreshing
- 🔒 Canvas interaction lock
- 🔍 Zoom and fit-view controls
- 🗺️ Workflow minimap
- 🎨 Dark workflow editor
- 🧱 Modular frontend architecture
- 🚀 Modular FastAPI backend

---

# 🏗️ Architecture

```text
                    User
                      │
                      ▼
              React Frontend
                      │
                      │ Workflow JSON
                      ▼
               FastAPI Backend
                      │
              ┌───────┴────────┐
              │                │
              ▼                ▼
           NetworkX         Node Engine
       Graph Validation    Execution Logic
                                │
                  ┌─────────────┼─────────────┐
                  ▼             ▼             ▼
                Groq         HTTP APIs     Logic Nodes
                  │
                  ▼
           Execution Results
                  │
                  ▼
          Execution Monitor
```

The frontend is responsible for visually creating and configuring workflows.

The backend receives the workflow graph, validates it, determines the execution order, executes the nodes, handles conditional routing, records execution details, and returns the results to the frontend.

---

# 🧩 Workflow Nodes

| Node | Purpose |
|------|---------|
| Input | Provides workflow input |
| LLM | Generates AI responses using Groq |
| Output | Produces workflow output |
| Text | Processes text and variables |
| Math | Performs arithmetic operations |
| Filter | Filters values using a keyword |
| Delay | Delays workflow execution |
| Condition | Routes execution through TRUE/FALSE branches |
| API | Sends HTTP requests and returns responses |

---

# 🔀 Conditional Branching

Graphinity supports conditional workflows through TRUE and FALSE output handles.

Example:

```text
                    ┌──── TRUE ─────► Output A
                    │
Input ───────► Condition
                    │
                    └──── FALSE ────► Output B
```

For example:

```text
Input
  │
  ▼
Condition
value > 10
  │
  ├──── TRUE ────► Output 1
  │
  └──── FALSE ───► Output 2
```

The execution engine evaluates the configured condition and activates the selected branch.

Inactive branches can be reported as **skipped** in the execution monitor.

---

# 🤖 LLM Execution

Graphinity supports real LLM execution through the Groq API.

The LLM node provides:

- Model configuration
- System prompt
- User prompt
- Workflow input propagation

Example:

```text
Input
  │
  ▼
LLM
  │
  ▼
Output
```

The backend sends the configured prompts and workflow input to the Groq model and returns the generated response to downstream nodes.

---

# 🌐 API Node

The API node allows workflows to communicate with external HTTP services.

Supported methods include:

```text
GET
POST
PUT
DELETE
PATCH
```

The API node provides:

- HTTP method
- URL
- Headers
- Request input

Example:

```text
Input
  │
  ▼
API
  │
  ▼
Output
```

The API response can then be passed to downstream workflow nodes.

---

# 🔄 Workflow Execution

Graphinity treats each workflow as a directed graph.

The execution process is:

```text
Workflow
   ↓
Validate Graph
   ↓
Check for Cycles
   ↓
Determine Execution Order
   ↓
Execute Nodes
   ↓
Evaluate Conditions
   ↓
Route Active Branch
   ↓
Collect Outputs
   ↓
Return Execution Logs
```

Each node can produce execution information such as:

- Status
- Inputs
- Outputs
- Input handles
- Execution time
- Errors
- Condition result
- Selected branch

---

# 📊 Execution Monitor

After a workflow is executed, Graphinity displays an execution monitor containing:

- Overall workflow status
- Number of executed nodes
- Number of skipped nodes
- Total duration
- Execution order
- Node-level results
- Node inputs and outputs
- Execution time
- Condition results
- Selected branch
- Error information

Example:

```text
Execution Monitor

Status: Completed

Execution Order

1. customInput-1
        ↓
2. llm-1
        ↓
3. customOutput-1

Node Results

Input
  Output: What is AI?

LLM
  Output: AI generated response...

Output
  Final Output: AI generated response...
```

---

# 🚀 Technology Stack

## Frontend

- React.js
- React Flow
- Zustand
- JavaScript
- React Markdown
- remark-gfm

## Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Requests

## Workflow Engine

- NetworkX
- DAG execution
- Dependency-based execution
- Conditional routing

## AI

- Groq API
- Groq Python SDK
- GPT OSS 20B

## Development Tools

- Git
- GitHub
- VS Code
- npm
- Python virtual environment

---

# 📂 Project Structure

```text
Graphinity/
│
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── execution_routes.py
│   │   └── pipeline_routes.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   └── workflow.py
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── execution_service.py
│   │   ├── graph_service.py
│   │   └── validation_service.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ExecutionPanel.js
│   │   │
│   │   ├── nodes/
│   │   │   ├── BaseNode.js
│   │   │   ├── apiNode.js
│   │   │   ├── conditionNode.js
│   │   │   ├── delayNode.js
│   │   │   ├── filterNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── mathNode.js
│   │   │   ├── outputNode.js
│   │   │   └── textNode.js
│   │   │
│   │   ├── App.js
│   │   ├── draggableNode.js
│   │   ├── store.js
│   │   ├── submit.js
│   │   ├── toolbar.js
│   │   ├── ui.js
│   │   └── useNodeField.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# ⚙️ Setup

## Clone Repository

```bash
git clone https://github.com/DIXANTOFFICIAL1/Graphinity.git
cd Graphinity
```

## Backend

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create:

```text
backend/.env
```

Add:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
python -m uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

## Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

Frontend:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

The key is used by the backend for LLM execution through the Groq API.

**Never commit your `.env` file or expose your API key publicly.**

---

# 💻 Usage

1. Start the FastAPI backend.
2. Start the React frontend.
3. Open:

```text
http://localhost:3000
```

4. Drag nodes from the toolbar onto the canvas.
5. Configure the node fields.
6. Connect the nodes.
7. Click **Run Workflow**.
8. Inspect the execution details in the **Execution Monitor**.

---

# 🧪 Example Workflows

## AI Question Answering

```text
Input → LLM → Output
```

Example input:

```text
What is artificial intelligence?
```

---

## Conditional Workflow

```text
                ┌──── TRUE ─────► Output 1
                │
Input → Condition
                │
                └──── FALSE ────► Output 2
```

Example condition:

```text
value > 10
```

---

## Arithmetic Workflow

```text
Input A ──┐
          ├──► Math ───► Output
Input B ──┘
```

Supported operations:

```text
Addition
Subtraction
Multiplication
Division
```

---

## API Workflow

```text
Input → API → Output
```

The API node sends the request to the configured HTTP endpoint and passes the response to the next node.

---

# 🧱 Backend Architecture

The backend is organized into three main layers:

```text
backend/
│
├── api/
│   └── API routes
│
├── models/
│   └── Workflow data models
│
└── services/
    ├── Execution engine
    ├── Graph processing
    └── Validation
```

### API

Handles workflow-related HTTP requests.

### Models

Defines workflow data structures such as nodes, edges, and workflow inputs.

### Services

Contains the core workflow logic for:

- Graph validation
- DAG execution
- Conditional routing
- LLM execution
- API execution
- Node processing
- Execution logging

---

# 🎨 Frontend Architecture

The frontend follows a modular node-based architecture:

```text
React Application
       │
       ├── Toolbar
       │
       ├── Workflow Canvas
       │       │
       │       └── React Flow
       │
       ├── Workflow Nodes
       │
       ├── Zustand Store
       │
       ├── Execution Request
       │
       └── Execution Monitor
```

`BaseNode.js` provides shared node structure and handle styling, while individual node components implement their specific behavior and fields.

---

# 📸 Screenshots

Add your actual screenshots to an `assets` folder.

## Workflow Canvas

```markdown
![Workflow Canvas](./assets/workflow-canvas.png)
```

## Conditional Workflow

```markdown
![Conditional Workflow](./assets/condition-workflow.png)
```

## Execution Monitor

```markdown
![Execution Monitor](./assets/execution-monitor.png)
```

---

# 🔮 Future Scope

- Workflow save and load
- Workflow templates
- Additional LLM providers
- More advanced branching
- Parallel execution
- Execution history
- User authentication
- Cloud deployment

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m "Add feature"
```

5. Push the branch:

```bash
git push origin feature-name
```

6. Open a Pull Request.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Dixant Soni**

B.Tech CSE (AI & Data Science)  
Indian Institute of Information Technology Manipur

GitHub: https://github.com/DIXANTOFFICIAL1

---

<div align="center">

### ⭐ If you like Graphinity, consider giving the repository a star!

**Build. Connect. Execute. 🚀**

</div>
