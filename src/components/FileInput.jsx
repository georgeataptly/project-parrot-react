import React, { useState, useContext, useEffect } from "react";
import { FilesContext } from "../App";

function FileInput() {
  //Video file list
  const [files, setFiles] = useContext(FilesContext);

  //Video url list
  const [urls, setURLs] = useState([]);

  //gets URLs for local files when file objects are available
  useEffect(() => {
    console.log(files);
    const location_list = [];
    for (let i = 0; i < files.length; i++) {
      location_list.push(URL.createObjectURL(files.item(i)));
    }
    setURLs(location_list);
  }, [files]);

  return (
    <React.Fragment>
      <input
        type="file"
        className="shrink-1 file-input file-input-bordered file-input-ghost min-h-12 bg-slate-50"
        multiple
        onChange={(list) => setFiles(list.target.files)}
      />
      <div className="grid grid-cols-3 gap-3 overflow-auto scrollbar-hide">
        {urls.map((url) => {
          return (
            <div key={url} className="overflow-hidden rounded h-16">
              <video className="w-full">
                <source src={url} type="video/mp4"></source>
              </video>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default FileInput;
