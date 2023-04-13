import React, { useState, useEffect, useContext } from "react";
import Sliders from "./Sliders";
import FileReview from "./FileReview";

function OptionsFinal() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 max-w-sm w-1/4 min-w-sm">
        <Sliders></Sliders>
        <FileReview></FileReview>
      </div>
    </React.Fragment>
  );
}

export default OptionsFinal;
