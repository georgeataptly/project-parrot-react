import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Sliders from "./Sliders";
import FileInput from "./FileInput";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import { dataStore } from "../store/data-store";

//FFmpeg variable
const ffmpeg = createFFmpeg({ log: false });

function OptionsInitial() {
  //click StartContext used to switch UI after data submission
  const { setClick } = useStore(basicStore);

  const { files, addTranscript, updateStatus } = useStore(dataStore);

  //Audio list

  //Checks if FFMPEG is ready
  const [ready, setReady] = useState(false);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const load = async () => {
    //loads ffmpeg
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    //loads ffmpeg
    load();
  }, []);

  //mp4 > mp3 converter
  const blinder = async (video_file) => {
    const file_name = video_file.name.replace(".mp4", "");
    //Write audio file to memory
    ffmpeg.FS("writeFile", `${file_name}.mp4`, await fetchFile(video_file));

    //Run FFmpeg
    await ffmpeg.run("-i", `${file_name}.mp4`, "-f", "mp3", `${file_name}.mp3`);

    //Return result
    const data = ffmpeg.FS("readFile", `${file_name}.mp3`);
    const blob = new Blob([data.buffer], { type: "audio/oog" });
    return [file_name, blob];
  };

  //Sends mp3 to python, saves result in "transcripts"
  const fetchTranscript = async (formData, i) => {
    updateStatus(i, 2);
    await fetch("http://localhost:8000/transcript", {
      method: "POST",
      data: "form_data",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => addTranscript(data));
  };

  const Usher = async () => {
    //only runs if there are files loaded
    if (files.length > 0) {
      setClick(true);
      for (let i = 0; i < files.length; i++) {
        updateStatus(i, 0);
        if (i > 0) {
          await delay(15000);
        }
        const mp3_file = await blinder(files.item(i));
        const form = new FormData();
        form.append("audio", mp3_file[1], mp3_file[0]);
        updateStatus(i, 1);
        fetchTranscript(form, i);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col px-10 pb-8 pt-16 lg:pb-16 gap-4 lg:pt-32 lg:w-1/4">
        <Sliders></Sliders>
        <FileInput></FileInput>
        {ready ? (
          <button
            className="btn w-32 mt-auto ml-auto btn-circle btn-success"
            onClick={Usher}
          >
            Start
          </button>
        ) : (
          <p className="mt-auto ml-auto">Transcoder offline...</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default OptionsInitial;
