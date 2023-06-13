import React from "react";
import Sliders from "./Sliders";
import FileReview from "./FileReview";
import Legend from "./Legend";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import MatchDetails from "./MatchDetails";
import ContextStrip from "./ContextStrip";

function OptionsFinal() {
  const { details } = useStore(basicStore);

  return (
    <React.Fragment>
      <div className="flex relative lg:w-1/4 flex-col h-full overflow-clip">
        <div className="flex items-center pl-8 min-h-16 bg-white z-50 shadow-sm">
          <h1 className="text-2xl font-bold">
            {details ? "Details" : "Search"}
          </h1>
        </div>

        {!details && (
          <div className="absolute pt-16 flex flex-col h-full top-0 left-0 w-1">
            <ContextStrip></ContextStrip>
          </div>
        )}

        <div className="flex flex-col pb-0 gap-4 w-full overflow-y-auto grow">
          {details ? (
            <div className="flex flex-col  pl-10 pr-10">
              <MatchDetails></MatchDetails>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pl-8 pt-8 pr-10">
              <Sliders></Sliders>
              <Legend></Legend>
              <FileReview></FileReview>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default OptionsFinal;
