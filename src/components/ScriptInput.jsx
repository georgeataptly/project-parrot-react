import React, { useState, useContext, useEffect } from "react";
import { ScriptContext } from "../App";

function Input() {
  const [script, setScript] = useContext(ScriptContext);

  const saveText = (event) => {
    console.log("Script text updated");
    setScript(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col grow h-full min-w-[400px] max-w-3/4">
        <textarea
          placeholder="Paste your script here"
          className="grow textarea textarea-bordered textarea-md w-full mb-3 resize-none text-lg"
          onChange={saveText}
        ></textarea>
      </div>
    </React.Fragment>
  );
}

export default Input;
