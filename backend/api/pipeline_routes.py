from fastapi import APIRouter

from models.workflow import PipelineRequest
from services.validation_service import validate_pipeline


router = APIRouter(
    prefix="/pipelines",
    tags=["Pipelines"]
)


@router.post("/parse")
def parse_pipeline(
    data: PipelineRequest
):
    return validate_pipeline(
        data.nodes,
        data.edges
    )