import React from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import { dataStore } from "../store/data-store";

function MatchDetails() {
  const { detailsAddress, setView } = useStore(basicStore);
  const { matchData } = useStore(dataStore);

  let matchObject = matchData[detailsAddress[0]][detailsAddress[1]];

  const setViewer = (index) => {
    const location = matchObject.videoLocations[index];
    const time = matchObject.seconds[index];
    setView([location, time]);
  };

  return (
    <React.Fragment>
      <div className="flex-row pt-8">
        {matchObject.matches.map((key, index) => {
          return (
            <button
              onClick={() => setViewer(index)}
              key={index}
              className="flex-col h-fit btn btn-outline btn-primary border-2 py-4 mb-4 gap-3"
            >
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <h2 className="font-bold text-left"># {index + 1}</h2>
                </div>
                <div className="inline-flex">
                  <h2 className="inline font-bold mr-2">Time: </h2>
                  <div className="inline font-light mr-2">
                    {matchObject.times[index]}
                  </div>
                </div>
              </div>

              <div className="text-left w-full">
                <h2 className="inline font-bold text-sm">File: </h2>
                <div className="inline font-light">{key}</div>
              </div>
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default MatchDetails;
