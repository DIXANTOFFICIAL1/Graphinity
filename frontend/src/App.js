import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import ExecutionPanel from "./components/ExecutionPanel";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <ExecutionPanel />
    </div>
  );
}

export default App;
