<div align="center">

# 🔷 Graphinity
### Visual AI Workflow Builder & Execution Engine

A full-stack visual workflow platform that allows users to build, connect, validate, and execute AI and data workflows through a node-based interface. Graphinity combines a React Flow visual editor with a FastAPI execution backend supporting DAG validation, conditional branching, real LLM execution, HTTP API calls, and detailed workflow monitoring.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![React Flow](https://img.shields.io/badge/React%20Flow-Workflow%20Editor-0f172a?style=for-the-badge)
![Zustand](https://img.shields.io/badge/State-Zustand-443627?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![NetworkX](https://img.shields.io/badge/Graph-NetworkX-1f77b4?style=for-the-badge)
![Groq](https://img.shields.io/badge/AI-Groq%20API-6E56CF?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 Overview

Graphinity is a visual workflow builder designed for creating and executing connected workflows through a node-based interface.

Instead of writing every workflow as procedural code, users can drag nodes onto a canvas, connect them, configure their inputs, and execute the complete workflow through a FastAPI-powered backend.

The platform separates the application into two major layers:

- **React + React Flow frontend** for visual workflow creation
- **FastAPI backend** for workflow validation and execution

Graphinity supports both traditional workflow operations and AI-powered processing, allowing users to combine logic, transformations, APIs, delays, conditions, and LLM calls in a single workflow.

---

# ✨ Key Features

- 🧩 Visual drag-and-drop workflow builder
- 🔗 Node-based workflow connections
- 🧠 DAG-based workflow execution
- 🔍 Workflow cycle validation
- ⚡ Workflow execution through FastAPI
- 🤖 Real LLM execution using Groq API
- 🌐 HTTP API workflow nodes
- 🔀 Conditional TRUE/FALSE branching
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
- ❌ Delete nodes without refreshing the application
- 🔒 Canvas interaction lock
- 🔍 Zoom and fit-view controls
- 🗺️ Workflow minimap
- 🎨 Dark workflow editor
- 🧱 Modular frontend node architecture
- 🚀 Modular FastAPI backend architecture

---

# 🏗️ System Architecture

Graphinity follows a **frontend + backend workflow execution architecture**:

```text
                         User
                           │
                           ▼
                 ┌──────────────────┐
                 │ React Frontend   │
                 │                  │
                 │ React Flow       │
                 │ Zustand          │
                 └────────┬─────────┘
                          │
                          │ Workflow JSON
                          ▼
                 ┌──────────────────┐
                 │ FastAPI Backend  │
                 │                  │
                 │ Validation       │
                 │ Graph Processing │
                 │ Execution Engine │
                 └────────┬─────────┘
                          │
               ┌──────────┼──────────┐
               │          │          │
               ▼          ▼          ▼
           NetworkX    Groq API   HTTP APIs
               │          │          │
               └──────────┼──────────┘
                          ▼
                  Workflow Execution
                          │
                          ▼
                  Execution Results
                          │
                          ▼
                  React Execution Monitor
```

The frontend sends the workflow structure, node configuration, edges, and workflow inputs to the backend.

The backend validates the graph, determines a valid execution order, executes nodes, handles conditional routing, records execution logs, and returns the execution result to the frontend.

---

# 🚀 Technology Stack

## Frontend

- React.js
- JavaScript (ES6+)
- React Flow
- Zustand
- HTML5
- CSS3
- React Markdown
- remark-gfm

## Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Python Requests

## Workflow Engine

- NetworkX
- Directed Acyclic Graph (DAG) execution
- Dependency-based node execution
- Handle-aware workflow routing
- Conditional branch execution

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

# 🧩 Supported Workflow Nodes

Graphinity currently provides the following node types:

| Node | Purpose |
|------|---------|
| Input | Provides workflow input values |
| LLM | Processes input using a real LLM through Groq |
| Output | Produces the final workflow output |
| Text | Performs text processing and variable resolution |
| Math | Performs arithmetic operations |
| Filter | Filters values based on a keyword |
| Delay | Pauses workflow execution for a configured duration |
| Condition | Evaluates conditions and routes TRUE/FALSE branches |
| API | Sends HTTP requests and returns responses |

---

# 🔀 Conditional Branching

Graphinity supports conditional workflow execution through dedicated TRUE and FALSE output handles.

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

The execution engine evaluates the configured condition and activates only the selected branch.

Inactive branches can be reported as **skipped** in the execution monitor.

---

# 🤖 LLM Execution

Graphinity supports real LLM execution through the Groq API.

The LLM node provides:

- Model configuration
- System prompt
- User prompt
- Workflow input propagation

Example workflow:

```text
Input
  │
  ▼
LLM
  │
  ▼
Output
```

The backend sends the configured prompts and upstream workflow values to the Groq model and returns the generated response to downstream nodes.

---

# 🌐 API Node

The API node allows workflows to communicate with external HTTP services.

Supported HTTP methods include:

```text
GET
POST
PUT
DELETE
PATCH
```

The node provides:

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

For GET requests, upstream input can be passed as query parameters.

For other supported methods, upstream input can be sent as JSON request data.

---

# 🔄 Workflow Execution

Graphinity executes workflows as directed graphs.

The execution process is:

```text
1. Receive workflow
        ↓
2. Validate graph
        ↓
3. Check for cycles
        ↓
4. Determine execution order
        ↓
5. Build node dependencies
        ↓
6. Execute nodes
        ↓
7. Evaluate conditions
        ↓
8. Route active branches
        ↓
9. Record execution logs
        ↓
10. Collect output nodes
        ↓
11. Return execution result
```

Each executed node can record:

- Node ID
- Node type
- Execution status
- Inputs
- Input handles
- Output
- Execution duration
- Errors when applicable
- Condition result
- Selected branch

---

# 📊 Execution Monitor

After running a workflow, Graphinity provides an execution monitor containing:

- Overall workflow status
- Number of executed nodes
- Number of skipped nodes
- Total execution duration
- Execution order
- Node-by-node results
- Inputs and outputs
- Execution time per node
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
│   ├── requirements.txt
│   └── .env
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

> `.env` is used locally for secrets and should not be committed to the repository.

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/DIXANTOFFICIAL1/Graphinity.git
cd Graphinity
```

---

# 🐍 Backend Setup

Open a terminal and navigate to the backend:

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

Start the FastAPI backend:

```bash
python -m uvicorn main:app --reload
```

The backend will run on:

```text
http://localhost:8000
```

---

# ⚛️ Frontend Setup

Open a second terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
GROQ_API_KEY=your_groq_api_key_here
```

The key is used by the backend to communicate with the Groq API for LLM execution.

**Never commit your `.env` file or expose API keys publicly.**

---

# 💻 Usage

1. Start the FastAPI backend.
2. Start the React frontend.
3. Open:

```text
http://localhost:3000
```

4. Drag nodes from the toolbar onto the workflow canvas.
5. Configure the node values.
6. Connect the nodes.
7. Click **Run Workflow**.
8. View execution details in the **Execution Monitor**.

Example workflow:

```text
Input
  │
  ▼
LLM
  │
  ▼
Output
```

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

The LLM processes the request and returns the generated answer to the Output node.

---

## Conditional Workflow

```text
                ┌──── TRUE ────► Output 1
                │
Input → Condition
                │
                └──── FALSE ───► Output 2
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

The API node sends the request to the configured HTTP endpoint and passes the response downstream.

---

# 🧱 Backend Architecture

The backend is organized into separate layers:

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

### API Layer

Handles incoming workflow execution requests and exposes backend endpoints.

### Models Layer

Defines workflow-related data structures such as:

- Nodes
- Edges
- Workflow inputs

### Services Layer

Contains the core workflow logic:

- Graph validation
- DAG execution
- Conditional routing
- LLM execution
- API execution
- Node processing
- Execution logging

---

# 🎨 Frontend Architecture

The frontend follows a modular node-based architecture.

```text
React Application
       │
       ├── Toolbar
       │
       ├── Workflow Canvas
       │       │
       │       └── React Flow
       │
       ├── Node Components
       │
       ├── Zustand Store
       │
       ├── Execution Request
       │
       └── Execution Monitor
```

Each workflow node is implemented as an independent React component and shares common handle and visual behavior through `BaseNode`.

---

# 🧩 Reusable Frontend Components

Graphinity uses reusable components to keep the workflow editor modular.

Examples include:

- `BaseNode.js`
- `ExecutionPanel.js`
- `useNodeField.js`
- `DraggableNode`
- Individual workflow node components

The shared node structure allows new workflow nodes to be added without rewriting the entire workflow editor.

---

# 🔍 Graph Execution Engine

Graphinity treats the workflow as a directed graph.

The execution engine uses graph relationships to determine dependencies between nodes and calculates a valid execution order.

For example:

```text
Input → Text → LLM → Output
```

becomes:

```text
1. Input
2. Text
3. LLM
4. Output
```

Before execution, the graph is checked for cycles.

Cyclic workflows are rejected because the execution engine expects a Directed Acyclic Graph.

---

# 📌 Project Highlights

- Full-stack workflow execution platform
- Visual node-based workflow editor
- React Flow integration
- Zustand state management
- FastAPI backend
- NetworkX graph processing
- DAG-based execution
- Conditional branch routing
- Real Groq LLM integration
- HTTP API execution
- Workflow input/output propagation
- Node-level execution logs
- Execution timing
- Error handling
- Interactive workflow canvas
- Modular architecture
- Reusable workflow node components

---

# 📸 Screenshots

## Workflow Canvas

Add your actual Graphinity screenshot here:

```markdown
![Workflow Canvas](./assets/workflow-canvas.png)
```

---

## Conditional Workflow

```markdown
![Conditional Workflow](./assets/condition-workflow.png)
```

---

## Execution Monitor

```markdown
![Execution Monitor](./assets/execution-monitor.png)
```

---

# 🔮 Future Scope

Potential future improvements include:

- Workflow persistence
- Save and load workflows
- Workflow templates
- Additional LLM providers
- More advanced branching
- Parallel node execution
- Authentication
- Cloud deployment
- Workflow versioning
- Database-backed workflow storage
- Execution history
- Real-time execution visualization

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

Interested in Software Engineering, Artificial Intelligence, Data Science, and Full-Stack Development.

### GitHub

https://github.com/DIXANTOFFICIAL1/Graphinity

---

<div align="center">

### ⭐ If you found Graphinity useful, consider giving the repository a star!

**Build. Connect. Execute. 🚀**

</div>
