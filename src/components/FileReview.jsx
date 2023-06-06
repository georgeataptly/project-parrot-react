import React, { useState, useEffect } from "react";
import { dataStore } from "../store/data-store";
import { useStore } from "zustand";

function FileReview() {
  //Video file list
  const { files, urls } = useStore(dataStore);

  function getStatus(index) {
    const returnList = [
      "Creating mp3...",
      "Ready to fetch transcript",
      "Fetching transcript",
      "Searching document",
      "Searched ✔️",
    ];

    let progress;

    if (typeof files[index].fileStatus !== "undefined") {
      let value = files[index].fileStatus;
      progress = (
        <p>
          <progress
            className="progress w-8 mr-2 progress-secondary"
            value={value}
            max="4"
          ></progress>
          {returnList[value]}
        </p>
      );
    } else {
      progress = <p>Standby...</p>;
    }

    return progress;
  }

  return (
    <React.Fragment>
      <h1 className="text-xl font-bold">Files</h1>
      <div className="flex-row w-full h-full overflow-y-auto align-start">
        {urls.map((url, index) => {
          return (
            <div key={index} className="flex flex-row gap-3 mb-5 h-fit">
              <div className="overflow-hidden flex-grow-1 w-1/6 rounded h-fit my-auto">
                <video className="w-full">
                  <source src={url} type="video/mp4"></source>
                </video>
              </div>
              <div className="flex-shrink text-left w-5/6 text-sm">
                <p className="line-clamp-1-fix h-6 max-w-full overflow-hidden font-semibold">
                  {files[index].name}
                </p>
                {getStatus(index)}
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default FileReview;
