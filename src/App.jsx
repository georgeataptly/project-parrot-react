import "./App.css";
import ScriptInput from "./components/ScriptInput";
import OptionsInitial from "./components/OptionsInitial";
import OptionsFinal from "./components/OptionsFinal";
import LeftReview from "./components/LeftReview";
import { useStore } from "zustand";
import { basicStore } from "./store/basic-store";

function App() {
  const { clicked } = useStore(basicStore);

  return (
    <div className="App">
      <div className=" bg-zinc-100 flex h-screen w-screen align-middle pt-16 flex-col lg:flex-row lg:py-0">
        {clicked ? (
          <>
            <LeftReview></LeftReview>
            <OptionsFinal></OptionsFinal>
          </>
        ) : (
          <>
            <ScriptInput></ScriptInput>
            <OptionsInitial></OptionsInitial>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
