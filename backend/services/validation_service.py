from typing import List
from models.workflow import Edge, Node
from services.graph_service import analyze_graph

def validate_pipeline(
    nodes: List[Node],
    edges: List[Edge]
) -> dict:

    errors: List[str] = []

    node_ids = [node.id for node in nodes]
    node_id_set = set(node_ids)

    if not nodes:
        errors.append("Workflow must contain at least one node.")

    if len(node_ids) != len(node_id_set):
        errors.append("Workflow contains duplicate node IDs.")

    for edge in edges:

        if edge.source not in node_id_set:
            errors.append(
                f"Unknown source node: {edge.source}"
            )

        if edge.target not in node_id_set:
            errors.append(
                f"Unknown target node: {edge.target}"
            )

        if edge.source == edge.target:
            errors.append(
                f"Self-loop detected on node: {edge.source}"
            )

    if errors:
        is_dag = False
        execution_order = []
    else:
        is_dag, execution_order = analyze_graph(
            nodes,
            edges
        )

        if not is_dag:
            errors.append(
                "Workflow contains a cycle."
            )

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag,
        "execution_order": execution_order,
        "errors": errors
    }