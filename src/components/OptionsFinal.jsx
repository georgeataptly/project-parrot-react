import React from "react";
import Sliders from "./Sliders";
import FileReview from "./FileReview";
import Legend from "./Legend";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import MatchDetails from "./MatchDetails";

function OptionsFinal() {
  const { details } = useStore(basicStore);

  return (
    <React.Fragment>
      <div className="flex flex-col px-10 pb-8 pt-16 lg:pb-16 gap-4 lg:pt-32 lg:w-1/4">
        {details ? (
          <MatchDetails></MatchDetails>
        ) : (
          <>
            <h1 className="text-4xl font-black">Info</h1>
            <Sliders></Sliders>
            <Legend></Legend>
            <FileReview></FileReview>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default OptionsFinal;
