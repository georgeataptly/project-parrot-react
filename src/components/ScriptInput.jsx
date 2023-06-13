import React from "react";
import PageHeader from "./PageHeader.jsx";
import { useStore } from "zustand";
import { dataStore } from "../store/data-store";

function Input() {
  const { setScript, initMatchData } = useStore(dataStore);

  const saveText = (event) => {
    setScript(event.target.value);
    initMatchData();
  };

  return (
    <React.Fragment>
      <PageHeader></PageHeader>
      <div className="flex flex-col w-full lg:h-auto min-h-96">
        <textarea
          placeholder="Paste your script here"
          className="font-mono lg:mt-16 pt-16 px-16 text-lg grow textarea rounded-none w-full resize-none overflow-y-scroll overflow-x-hidden"
          onChange={saveText}
        ></textarea>
      </div>
    </React.Fragment>
  );
}

export default Input;
