from fastapi import APIRouter, HTTPException
from models.workflow import ExecuteRequest
from services.execution_service import execute_workflow

router = APIRouter(
    prefix="/pipelines",
    tags=["Execution"]
)

@router.post("/execute")
def execute_pipeline(
    data: ExecuteRequest
):

    try:
        return execute_workflow(
            nodes=data.nodes,
            edges=data.edges,
            workflow_inputs=data.inputs
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Execution failed: {error}"
        )