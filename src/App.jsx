import { createContext, useState } from "react";
import "./App.css";
import PageHeader from "./components/PageHeader";
import ScriptInput from "./components/ScriptInput";
import OptionsInitial from "./components/OptionsInitial";
import OptionsFinal from "./components/OptionsFinal";
import TextReview from "./components/TextReview";

export const StartContext = createContext();
export const ScriptContext = createContext();
export const FilesContext = createContext();
export const TranscriptContext = createContext();
export const SliderContext = createContext();

function App() {
  const [clicked, setClicked] = useState(false);
  const [files, setFiles] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [sliderData, setSliderData] = useState({
    minLength: 3,
    wordSkip: 0,
    wordShuffle: 0,
  });
  const [script, setScript] = useState("");

  return (
    <div className="App">
      <StartContext.Provider value={[clicked, setClicked]}>
        <TranscriptContext.Provider value={[sliderData, setSliderData]}>
          <ScriptContext.Provider value={[script, setScript]}>
            <FilesContext.Provider value={[files, setFiles]}>
              <TranscriptContext.Provider value={[transcript, setTranscript]}>
                <SliderContext.Provider value={[sliderData, setSliderData]}>
                  <PageHeader></PageHeader>
                  <div className="flex h-screen w-screen align-middle p-10 pt-16 gap-6 flex-col lg:flex-row lg:p-24 lg:pt-36 bg-neutral-100">
                    {clicked ? (
                      <>
                        <TextReview></TextReview>
                        <OptionsFinal></OptionsFinal>
                      </>
                    ) : (
                      <>
                        <ScriptInput></ScriptInput>
                        <OptionsInitial></OptionsInitial>
                      </>
                    )}
                  </div>
                </SliderContext.Provider>
              </TranscriptContext.Provider>
            </FilesContext.Provider>
          </ScriptContext.Provider>
        </TranscriptContext.Provider>
      </StartContext.Provider>
    </div>
  );
}

export default App;
