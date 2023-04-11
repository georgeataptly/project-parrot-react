import React, { useState, useEffect, useContext } from "react";
import Sliders from "./Sliders";

function OptionsFinal() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 max-w-sm w-1/4 min-w-sm">
        <Sliders></Sliders>
      </div>
    </React.Fragment>
  );
}

export default OptionsFinal;
