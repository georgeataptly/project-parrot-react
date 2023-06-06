import React, { useState, useContext, useEffect } from "react";
import { dataStore } from "../store/data-store";
import { useStore } from "zustand";

function FileInput() {
  //Video file list
  const { files, setFiles } = useStore(dataStore);

  //Video url list
  const [urls, setURLs] = useState([]);

  //gets URLs for local files when file objects are available
  useEffect(() => {
    const location_list = [];
    for (let i = 0; i < files.length; i++) {
      location_list.push({
        url: URL.createObjectURL(files.item(i)),
        status: undefined,
      });
    }
    setURLs(location_list);
  }, [files]);

  return (
    <React.Fragment>
      <input
        type="file"
        className="shrink-1 file-input file-input-bordered file-input-ghost min-h-12"
        multiple
        onChange={(list) => setFiles(list.target.files)}
      />
        <div className="grid lg:grid-cols-3 grid-cols-5 gap-3 overflow-auto scrollbar-hide">
        {urls.map((i) => {
          return (
            <div key={i.url} className="overflow-hidden rounded w-fit h-fit">
              <video className="w-full">
                <source src={i.url} type="video/mp4"></source>
              </video>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default FileInput;
