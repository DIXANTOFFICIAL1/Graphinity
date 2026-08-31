import os
import time
from typing import Any, Dict, List, Optional

import requests
from dotenv import load_dotenv
from groq import Groq

from models.workflow import Edge, Node
from services.graph_service import get_execution_order

load_dotenv()

# GROQ
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

groq_client = (
    Groq(api_key=GROQ_API_KEY)
    if GROQ_API_KEY
    else None
)

# NODE TYPE
def get_node_type(node: Node) -> str:
    return (
        node.type
        or node.data.get("nodeType")
        or ""
    ).lower()

# VARIABLE RESOLUTION
def resolve_variables(
    template: str,
    variables: Dict[str, Any]
) -> str:
    result = str(template)

    for key, value in variables.items():
        result = result.replace(
            f"{{{{{key}}}}}",
            str(value)
        )

    return result

# LLM
def execute_llm(
    node: Node,
    input_values: List[Any]
) -> str:
    if not groq_client:
        raise ValueError(
            "GROQ_API_KEY is not configured."
        )

    data = node.data or {}

    system_prompt = data.get(
        "systemPrompt",
        "You are a helpful AI assistant."
    )

    prompt = data.get(
        "prompt",
        "Answer the user's request clearly."
    )

    model = data.get(
        "model",
        "openai/gpt-oss-20b"
    )

    if input_values:
        upstream_value = input_values[-1]

        prompt = prompt.replace(
            "{{input}}",
            str(upstream_value)
        )

        prompt = prompt.replace(
            "{{value}}",
            str(upstream_value)
        )

        if (
            "{{input}}" not in prompt
            and "{{value}}" not in prompt
        ):
            prompt = (
                f"{prompt}\n\n"
                f"Input: {upstream_value}"
            )

    response = (
        groq_client
        .chat
        .completions
        .create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )
    )

    content = (
        response
        .choices[0]
        .message
        .content
    )

    if not content:
        raise ValueError(
            "LLM returned an empty response."
        )

    return content

# API
def execute_api(
    node: Node,
    input_values: List[Any]
) -> Any:
    data = node.data or {}

    method = str(
        data.get(
            "method",
            "GET"
        )
    ).upper()

    url = str(
        data.get(
            "url",
            ""
        )
    ).strip()

    if not url:
        raise ValueError(
            "API node requires a URL."
        )

    if not (
        url.startswith("http://")
        or url.startswith("https://")
    ):
        raise ValueError(
            "API URL must start with http:// or https://"
        )

    headers = data.get(
        "headers",
        {}
    )

    if not isinstance(headers, dict):
        headers = {}

    input_value = (
        input_values[-1]
        if input_values
        else None
    )

    kwargs = {
        "method": method,
        "url": url,
        "headers": headers,
        "timeout": 10,
    }

    if method == "GET":
        if input_value is not None:
            kwargs["params"] = {
                "input": input_value
            }
    else:
        if input_value is not None:
            kwargs["json"] = input_value

    response = requests.request(
        **kwargs
    )

    response.raise_for_status()

    content_type = (
        response
        .headers
        .get(
            "content-type",
            ""
        )
        .lower()
    )

    if "application/json" in content_type:
        return response.json()

    return response.text

# CONDITION EVALUATION
def evaluate_condition(
    value: Any,
    condition: str
) -> bool:
    condition = str(condition).strip()

    try:
        numeric_value = float(value)

        if ">=" in condition:
            threshold = float(
                condition
                .split(">=")[-1]
                .strip()
            )

            return (
                numeric_value
                >= threshold
            )

        if "<=" in condition:
            threshold = float(
                condition
                .split("<=")[-1]
                .strip()
            )

            return (
                numeric_value
                <= threshold
            )

        if "==" in condition:
            threshold = float(
                condition
                .split("==")[-1]
                .strip()
            )

            return (
                numeric_value
                == threshold
            )

        if ">" in condition:
            threshold = float(
                condition
                .split(">")[-1]
                .strip()
            )

            return (
                numeric_value
                > threshold
            )

        if "<" in condition:
            threshold = float(
                condition
                .split("<")[-1]
                .strip()
            )

            return (
                numeric_value
                < threshold
            )

    except (
        TypeError,
        ValueError
    ):
        pass

    return bool(value)

# NODE EXECUTION
def execute_node(
    node: Node,
    input_values: Dict[str, Any],
    variables: Dict[str, Any],
    workflow_inputs: Dict[str, Any]
) -> Any:
    node_type = get_node_type(node)
    data = node.data or {}

    # INPUT
    if node_type == "custominput":
        input_name = data.get(
            "inputName",
            node.id
        )

        return workflow_inputs.get(
            input_name,
            data.get(
                "value",
                ""
            )
        )

    # TEXT
    if node_type == "text":
        text = data.get(
            "text",
            ""
        )

        variables_with_inputs = {
            **variables,
            **input_values,
        }

        text = resolve_variables(
            text,
            variables_with_inputs
        )

        if "in" in input_values:
            text = text.replace(
                "{{input}}",
                str(
                    input_values["in"]
                )
            )

            text = text.replace(
                "{{value}}",
                str(
                    input_values["in"]
                )
            )

        elif input_values:
            first_value = next(
                iter(
                    input_values.values()
                )
            )

            text = text.replace(
                "{{input}}",
                str(first_value)
            )

            text = text.replace(
                "{{value}}",
                str(first_value)
            )

        return text

    # MATH
    if node_type == "math":
        operation = data.get(
            "operation",
            "add"
        )

        a = input_values.get(
            "a",
            0
        )

        b = input_values.get(
            "b",
            0
        )

        try:
            a = float(a)
            b = float(b)

        except (
            TypeError,
            ValueError
        ):
            raise ValueError(
                "Math inputs A and B must be numeric."
            )

        if operation == "add":
            return a + b

        if operation == "subtract":
            return a - b

        if operation == "multiply":
            return a * b

        if operation == "divide":
            if b == 0:
                raise ValueError(
                    "Cannot divide by zero."
                )

            return a / b

        raise ValueError(
            f"Unsupported math operation: {operation}"
        )

    # FILTER
    if node_type == "filter":
        value = input_values.get(
            "input"
        )

        keyword = str(
            data.get(
                "keyword",
                ""
            )
        ).strip()

        if not keyword:
            return value

        if value is None:
            return None

        if keyword.lower() in str(
            value
        ).lower():
            return value

        return None

    # CONDITION
    if node_type == "condition":
        value = input_values.get(
            "value"
        )

        if value is None and input_values:
            value = next(
                iter(
                    input_values.values()
                )
            )

        return value

    # DELAY
    if node_type == "delay":
        delay = int(
            data.get(
                "delay",
                1000
            )
        )

        delay = min(
            max(delay, 0),
            5000
        )

        time.sleep(
            delay / 1000
        )

        if input_values:
            return next(
                iter(
                    input_values.values()
                )
            )

        return None

    # LLM
    if node_type == "llm":
        values = list(
            input_values.values()
        )

        return execute_llm(
            node,
            values
        )

    # API
    if node_type == "api":
        values = list(
            input_values.values()
        )

        return execute_api(
            node,
            values
        )

    # OUTPUT
    if node_type == "customoutput":
        if input_values:
            return next(
                iter(
                    input_values.values()
                )
            )

        return None

    # FALLBACK
    if input_values:
        return next(
            iter(
                input_values.values()
            )
        )

    return None

# WORKFLOW EXECUTION
def execute_workflow(
    nodes: List[Node],
    edges: List[Edge],
    workflow_inputs: Dict[str, Any]
) -> Dict[str, Any]:
    started_at = time.time()

    is_dag, execution_order = (
        get_execution_order(
            nodes,
            edges
        )
    )

    if not is_dag:
        raise ValueError(
            "Workflow cannot be executed because it contains a cycle."
        )

    node_map = {
        node.id: node
        for node in nodes
    }

    # INCOMING EDGES
    incoming: Dict[
        str,
        List[Edge]
    ] = {
        node.id: []
        for node in nodes
    }

    # OUTGOING EDGES
    outgoing: Dict[
        str,
        List[Edge]
    ] = {
        node.id: []
        for node in nodes
    }

    for edge in edges:
        incoming[
            edge.target
        ].append(edge)

        outgoing[
            edge.source
        ].append(edge)

    values: Dict[
        str,
        Any
    ] = {}

    branch_results: Dict[
        str,
        str
    ] = {}

    logs = []

    active_nodes = set(
        execution_order
    )

    # EXECUTION
    for node_id in execution_order:
        node = node_map[node_id]

        # SKIPPED CONDITIONAL BRANCH
        if node_id not in active_nodes:
            logs.append({
                "node_id": node_id,
                "node_type": node.type,
                "status": "skipped",
                "inputs": [],
                "output": None,
                "duration_ms": 0
            })

            continue

        node_started = time.time()

        try:
            input_values: Dict[
                str,
                Any
            ] = {}

            # COLLECT INPUTS BY HANDLE
            for edge in incoming[node_id]:
                source_id = edge.source

                if source_id not in values:
                    continue

                if source_id in branch_results:
                    selected_branch = (
                        branch_results[source_id]
                    )

                    source_handle = (
                        edge.sourceHandle
                        or ""
                    ).lower()

                    if source_handle != selected_branch:
                        continue

                value = values[source_id]

                target_handle = (
                    edge.targetHandle
                    or "input"
                )

                input_values[
                    target_handle
                ] = value

            # DETERMINE INPUT AVAILABILITY
            if incoming[node_id]:
                has_active_input = any(
                    edge.source in values
                    for edge in incoming[node_id]
                )

                if not has_active_input:
                    logs.append({
                        "node_id": node_id,
                        "node_type": node.type,
                        "status": "skipped",
                        "inputs": [],
                        "output": None,
                        "duration_ms": 0
                    })

                    continue

            # VARIABLES
            variables = {
                key: value
                for key, value in values.items()
            }

            # EXECUTE
            output = execute_node(
                node=node,
                input_values=input_values,
                variables=variables,
                workflow_inputs=workflow_inputs
            )

            values[node_id] = output

            # LOG
            logs.append({
                "node_id": node_id,
                "node_type": node.type,
                "status": "completed",
                "inputs": list(
                    input_values.values()
                ),
                "input_handles": input_values,
                "output": output,
                "duration_ms": round(
                    (
                        time.time()
                        - node_started
                    ) * 1000,
                    2
                )
            })

            # CONDITIONAL ROUTING
            if (
                get_node_type(node)
                == "condition"
            ):
                condition_value = output

                condition_expression = str(
                    node.data.get(
                        "condition",
                        "value > 10"
                    )
                )

                condition_result = evaluate_condition(
                    condition_value,
                    condition_expression
                )

                selected_branch = (
                    "true"
                    if condition_result
                    else "false"
                )

                branch_results[node_id] = (
                    selected_branch
                )

                logs[-1]["condition"] = (
                    condition_expression
                )

                logs[-1]["condition_result"] = (
                    condition_result
                )

                logs[-1]["branch"] = (
                    selected_branch
                )

                for edge in outgoing[node_id]:
                    source_handle = (
                        edge.sourceHandle
                        or ""
                    ).lower()

                    if source_handle != selected_branch:
                        active_nodes.discard(
                            edge.target
                        )

        except Exception as error:
            logs.append({
                "node_id": node_id,
                "node_type": node.type,
                "status": "failed",
                "inputs": list(
                    input_values.values()
                )
                if "input_values"
                in locals()
                else [],
                "error": str(error),
                "duration_ms": round(
                    (
                        time.time()
                        - node_started
                    ) * 1000,
                    2
                )
            })

            return {
                "status": "failed",
                "nodes_executed": len([
                    log
                    for log in logs
                    if log["status"]
                    != "skipped"
                ]),
                "execution_order": execution_order,
                "node_values": values,
                "outputs": {},
                "logs": logs,
                "error": str(error),
                "duration_ms": round(
                    (
                        time.time()
                        - started_at
                    ) * 1000,
                    2
                )
            }

    # OUTPUT NODES
    output_nodes = [
        node_id
        for node_id in execution_order
        if get_node_type(
            node_map[node_id]
        ) == "customoutput"
    ]

    outputs = {
        node_id: values.get(
            node_id
        )
        for node_id in output_nodes
        if node_id in values
    }

    # FINAL RESULT
    return {
        "status": "completed",
        "nodes_executed": len([
            log
            for log in logs
            if log["status"]
            == "completed"
        ]),
        "nodes_skipped": len([
            log
            for log in logs
            if log["status"]
            == "skipped"
        ]),
        "execution_order": execution_order,
        "node_values": values,
        "outputs": outputs,
        "logs": logs,
        "duration_ms": round(
            (
                time.time()
                - started_at
            ) * 1000,
            2
        )
    }