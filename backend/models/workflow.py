from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Dict[str, Any] = Field(default_factory=dict)


class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class ExecuteRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    inputs: Dict[str, Any] = Field(default_factory=dict)