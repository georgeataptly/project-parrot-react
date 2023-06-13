import React from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import { dataStore } from "../store/data-store";

function BackButton() {
  const { view, setView, setDetails, detailsAddress } = useStore(basicStore);

  const { matchData, setMatchData } = useStore(dataStore);

  const handler = () => {
    let matchDataTemp = matchData;
    if (view) {
      setView([]);
    } else {
      matchDataTemp[detailsAddress[0]][detailsAddress[1]].z = " z-0";
      setDetails([]);
    }
    setMatchData(matchDataTemp);
  };

  return (
    <React.Fragment>
      <button
        onClick={handler}
        className="absolute top-24 right-10 btn btn-primary ml-auto z-30"
      >
        <img src="back.svg" className="w-6"></img>
      </button>
      <div className="z-10 backdrop-brightness-50 pt-16 backdrop-grayscale backdrop-contrast-125 absolute w-full h-full"></div>
    </React.Fragment>
  );
}

export default BackButton;
