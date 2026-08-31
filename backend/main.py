from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.pipeline_routes import router as pipeline_router
from api.execution_routes import router as execution_router


app = FastAPI(
    title="Graphinity API",
    description="Visual workflow execution platform.",
    version="2.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    pipeline_router
)

app.include_router(
    execution_router
)


@app.get("/")
def root():
    return {
        "service": "Graphinity API",
        "version": "2.0.0",
        "status": "online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Graphinity API"
    }
