import React, { useState, useContext, useEffect } from "react";
import { FilesContext } from "../App";

function FileReview() {
  //Video file list
  const [files, setFiles] = useContext(FilesContext);

  //Video url list
  const [urls, setURLs] = useState([]);

  //gets URLs for local files when file objects are available
  useEffect(() => {
    const location_list = [];
    for (let i = 0; i < files.length; i++) {
      location_list.push(URL.createObjectURL(files.item(i)));
    }
    setURLs(location_list);
  }, [files]);

  function getStatus(index) {
    const returnList = [
      "Creating mp3...",
      "Ready to fetch transcript",
      "Fetching transcript",
      "Searching document",
      "Searched ✔️",
      "Standby...",
    ];
    let returnString = "";
    let value = 0;

    let progress;

    if (typeof files[index].fileStatus !== "undefined") {
      value = files[index].fileStatus;
      progress = (
        <p>
          <progress
            className="progress w-8 mr-2"
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
      <h1 className="text-xl font-bold">Video files</h1>
      <div className="grid grid-cols-1 gap-3 w-full scrollbar-hide">
        {urls.map((url, index) => {
          return (
            <div key={index} className="flex flex-row gap-3">
              <div className="overflow-hidden flex-grow-0 flex-shrink-0 w-11 h-fit rounded h-16 my-auto">
                <video>
                  <source src={url} type="video/mp4"></source>
                </video>
              </div>
              <div
                className="flex-shrink tooltip tooltip-left text-left text-sm"
                data-tip={files[index].name}
              >
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
