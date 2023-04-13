import React, { useState, useEffect, useContext } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { StartContext, TranscriptContext, FilesContext } from "../App";
import Sliders from "./Sliders";
import FileInput from "./FileInput";

//FFmpeg variable
const ffmpeg = createFFmpeg({ log: false });

function OptionsInitial() {
  //click StartContext used to switch UI after data submission
  const [clicked, setClicked] = useContext(StartContext);
  const [transcript, setTranscripts] = useContext(TranscriptContext);

  const addTranscript = (transcript_data) => {
    setTranscripts((transcript) => [...transcript, transcript_data]);
  };

  const [files, setFiles] = useContext(FilesContext);

  //Audio list

  //Checks if FFMPEG is ready
  const [ready, setReady] = useState(false);

  const load = async () => {
    //loads ffmpeg
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    //loads ffmpeg
    load();
  }, []);

  function updateStatus(index, statusNumber) {
    let tempFiles = files;
    if (index !== "length") {
      tempFiles[index].fileStatus = statusNumber;
    }
    setFiles(tempFiles);
  }

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
  const fetchTranscript = async (formData) => {
    for (let i = 0; i < formData.length; i++) {
      updateStatus(i, 2);
      await delay(1500);
      await fetch("http://localhost:8000/transcript", {
        method: "POST",
        data: "form_data",
        body: formData[i],
      })
        .then((res) => res.json())
        .then((data) => addTranscript(data))
        .then(updateStatus(i, 3));
    }
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const Usher = async () => {
    //only runs if there are files loaded
    const mp3_temp = [];
    if (files.length > 0) {
      setClicked(true);
      for (let i = 0; i < files.length; i++) {
        updateStatus(i, 0);
        await delay(1500);
        const mp3_file = await blinder(files.item(i));
        const form = new FormData();
        form.append("audio", mp3_file[1], mp3_file[0]);
        mp3_temp.push(form);
        updateStatus(i, 1);
      }
      fetchTranscript(mp3_temp);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 w-1/4 min-w-sm">
        <Sliders></Sliders>
        <FileInput></FileInput>
        {ready ? (
          <button
            className="btn w-32 btn-success mt-auto ml-auto"
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
