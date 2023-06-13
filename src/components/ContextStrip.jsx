import React from "react";
import { useStore } from "zustand";
import { dataStore } from "../store/data-store";
import { basicStore } from "../store/basic-store";

function ContextStrip() {
  const { contextList } = useStore(dataStore);
  const { highlightClasses } = useStore(basicStore);

  const highlightRender = (matchAmount) => {
    if (matchAmount > highlightClasses.length - 1) {
      matchAmount = highlightClasses.length - 1;
    }
    const classValue = highlightClasses[matchAmount] + " h-full";
    return classValue;
  };
  return (
    <React.Fragment>
      <div className="flex flex-col h-full blur-sm">
        {contextList.map((key, id) => {
          return <div className={highlightRender(key)} key={id}></div>;
        })}
      </div>
    </React.Fragment>
  );
}

export default ContextStrip;
