import React, { useState, useContext, useEffect } from "react";
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
