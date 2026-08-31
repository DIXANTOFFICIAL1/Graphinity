from collections import deque
from typing import Dict, List, Tuple

from models.workflow import Edge, Node

def build_graph(
    nodes: List[Node],
    edges: List[Edge]
) -> Tuple[Dict[str, List[str]], Dict[str, int]]:
    """Build adjacency list and indegree map."""

    graph = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        if edge.source not in graph or edge.target not in graph:
            continue

        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    return graph, indegree


def get_execution_order(
    nodes: List[Node],
    edges: List[Edge]
) -> Tuple[bool, List[str]]:
    """Return DAG status and topological execution order."""

    graph, indegree = build_graph(nodes, edges)

    queue = deque(
        node_id
        for node_id, degree in indegree.items()
        if degree == 0
    )

    execution_order = []

    while queue:
        current = queue.popleft()
        execution_order.append(current)

        for neighbor in graph[current]:
            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = len(execution_order) == len(nodes)

    return is_dag, execution_order


def analyze_graph(
    nodes: List[Node],
    edges: List[Edge]
) -> Tuple[bool, List[str]]:
    return get_execution_order(nodes, edges)