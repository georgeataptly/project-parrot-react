import React from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import { dataStore } from "../store/data-store";

function ViewFile() {
  const { viewAddress } = useStore(basicStore);
  const { urls, files, transcript } = useStore(dataStore);

  const handleVideoMounted = (element) => {
    if (element !== null) {
      if (viewAddress[1] - 1 > 0) {
        element.currentTime = viewAddress[1] - 1;
      } else {
        element.currentTime = viewAddress[1];
      }
    }
  };

  function toTime(number) {
    const timeMinutes = new Date(number * 1000).toISOString().slice(14, 19);
    return timeMinutes;
  }

  console.log(transcript[viewAddress[0]]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-7 h-full z-40 pt-24 mx-32 left-0 right-0 absolute">
        <div className="flex bg-white rounded-lg">
          <video
            className="w-1/2 h-fit rounded-lg"
            ref={handleVideoMounted}
            controls
            autoPlay={true}
          >
            <source src={urls[viewAddress[0]]} type="video/mp4"></source>
          </video>
          <div className="flex flex-col gap-5 w-1/2 p-5 h-full text-sm font-bold">
            <h3>{files[viewAddress[0]].name}</h3>
            <p>{files[viewAddress[0]].fileStatus}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-white w-full h-1/2 p-4 rounded-lg">
          <div className="font-bold">Transcript:</div>
          <div className="flex w-full h-full bg-slate overflow-y-auto overflow-x-auto">
            <table className="table table-compact max-w-full overflow-clip w-full">
              <tbody>
                {transcript[viewAddress[0]].map((object, key) => {
                  return (
                    <tr className="" key={key}>
                      <td className="font-mono text-xs">
                        {toTime(object.start) + "-" + toTime(object.end)}
                      </td>
                      <td className="text-sm whitespace-pre-wrap">
                        {object.text}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewFile;
