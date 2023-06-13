import React from "react";
import { useStore } from "zustand";
import { dataStore } from "../store/data-store";
import { basicStore } from "../store/basic-store";

function Legend() {
  const { matchAmounts } = useStore(dataStore);
  const { highlightClasses } = useStore(basicStore);

  const highlightRender = (matchAmount) => {
    if (matchAmount > highlightClasses.length - 1) {
      matchAmount = highlightClasses.length - 1;
    }
    const classValue = highlightClasses[matchAmount];
    return classValue;
  };

  return (
    <React.Fragment>
      <h1 className="inline-grid text-xl font-bold">Legend</h1>
      <div className="text-sm">
        {matchAmounts.length > 1
          ? "Script highlighting depending on the amount of matches found:"
          : "Waiting for matches..."}
      </div>
      <div className="">
        {matchAmounts.map((amount, index) => {
          return (
            <div className="inline-flex" key={index}>
              <div
                className={
                  highlightRender(amount) +
                  " w-6 p-1 px-2 m-1 rounded-md text-center"
                }
              >
                {amount}
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Legend;
