import React, { useState, useContext, useEffect } from "react";
import {
  ScriptContext,
  TranscriptContext,
  SliderContext,
  FilesContext,
} from "../App";

function TextReview() {
  const [script, setScript] = useContext(ScriptContext);
  const [transcript, setTranscript] = useContext(TranscriptContext);
  const [sliderData, setSliderData] = useContext(SliderContext);
  const [files, setFiles] = useContext(FilesContext);

  //removes new line formatting from text
  //splits text into list of words
  //removes empty spaces from list
  const wordList = script
    .replace(/\n/g, " \n")
    .split(" ")
    .filter((word) => word);

  //creates the initial Match data objext from wordList
  //<i>: {word: "string", matches: [], init: boolean}
  let initMatchDataObjects = { 0: {} };

  let paragraphCount = 0;

  for (let i in wordList) {
    if (/\r|\n/.exec(wordList[i])) {
      paragraphCount++;
      initMatchDataObjects[paragraphCount] = {};
    }
    initMatchDataObjects[paragraphCount][i] = {
      word: wordList[i],
      matches: [],
      times: [],
      init: false,
      justWord: wordList[i]
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\n]/g, ""),
    };
  }

  const [matchData, setMatchData] = useState(initMatchDataObjects);
  //console.log(matchData);

  const [transcriptIndex, setTranscriptIndex] = useState(0);

  //this variable keeps track of the current match length between "findMatches" calls
  //this variable keeps track of the current match length between "findMatches" calls
  let matchStreak = 0;
  let missStreak = 0;

  //creates a linear array with start, end and length input
  function linspace(start, end, length) {
    const step = (end - start) / (length - 1);
    return Array.from({ length }, (_, i) => start + step * i);
  }

  function getIndexes(searchWord, matchingIndexes) {
    let indexes = [];
    if (matchingIndexes.length > 0) {
      for (let i in matchingIndexes) {
        let nextWord = matchingIndexes[i];
        nextWord[1]++;
        const tempObject = matchData[nextWord[0]];
        if (Object.keys(tempObject).includes(String(nextWord[1]))) {
          //we save the words in these variables and remove punctuation in the process
          const documentWord = matchData[nextWord[0]][nextWord[1]].justWord;
          if (documentWord == searchWord) {
            indexes.push(nextWord);
          } /* else { 
            console.log(documentWord, searchWord);
          } */
          //moves to next paragraph if this one doesn't contain
        } else {
          nextWord[0]++;
          i--;
        }
      }
    } else {
      for (let p in matchData) {
        for (let i in matchData[p])
          if (matchData[p][i].justWord === searchWord) {
            indexes.push([p, i]);
          }
      }
    }
    if (indexes.length > 0) {
      matchStreak++;
      missStreak = 0;
    } else {
      matchStreak = 0;
      missStreak++;
      if (sliderData.wordSkip > missStreak) {
        indexes = matchingIndexes.map((v) => v + 1);
      }
    }
    return indexes;
  }

  let matchingIndexesList = [];

  const wordZipper = (transcriptSearchObject) => {
    //console.log(transcriptSearchObject.text);
    for (let i in transcriptSearchObject.text) {
      matchingIndexesList = getIndexes(
        transcriptSearchObject.text[i],
        matchingIndexesList
      );
      //finds indexes in matchData and adds info if matchStreak requirement is met
      if (sliderData.minLength < matchStreak) {
        //adds previous match data
        for (let a in matchingIndexesList) {
          const matchDataTemp = { ...matchData };
          const matchingIndex = matchingIndexesList[a];
          const paragraph = matchingIndex[0],
            index = matchingIndex[1];

          //adds previous match file name
          matchDataTemp[paragraph][index].matches = [
            ...matchDataTemp[paragraph][index].matches,
            files[transcriptIndex].name,
          ];

          //adds previous match times
          matchDataTemp[paragraph][index].times = [
            ...matchDataTemp[paragraph][index].times,
            transcriptSearchObject.times[i],
          ];

          //adds matches that were found before minimum match length
          const oldVal = [];
          const copy = [];
          const count = 0;

          for (let p = matchData.length - 1; p >= 0; p--) {
            for (let i = matchData[p].length - 1; i >= 0; i--) {
              if (count > 0) {
                matchData[p][i].matchAmount = copy;
                count--;
              }
              if (
                (oldVal.length > 1) &
                (matchData[p][i].matches.length === 0)
              ) {
                copy = oldVal;
                count = sliderData.minLength;
                matchData[p][i].init = true;
              }
            }
          }

          setMatchData(matchDataTemp);
        }
      }
    }
  };

  //Formats the data for each transcript into a word/time in video object
  //Sends the search objext to the wordZipper function
  const searchObjectDelivery = () => {
    if (transcript[transcriptIndex]) {
      //each text item should have a corresponding fileURL and time
      const transcriptObject = transcript[transcriptIndex];
      let transcriptSearchObject = {
        text: [],
        times: [],
      };
      for (let i = 0; i < Object.keys(transcriptObject).length; i++) {
        const splitText = transcriptObject[i].text
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/gi, "")
          .split(" ")
          .filter((word) => word);
        transcriptSearchObject.text =
          transcriptSearchObject.text.concat(splitText);
        transcriptSearchObject.times = transcriptSearchObject.times.concat(
          linspace(
            transcriptObject[i].start,
            transcriptObject[i].end,
            splitText.length
          )
        );
      }
      wordZipper(transcriptSearchObject);
    }
    setTranscriptIndex(transcriptIndex + 1);
  };

  //Calls searchObjectDelivery when there are pending searches
  useEffect(() => {
    if (transcript.length > transcriptIndex) {
      searchObjectDelivery();
    }
  }, [transcript, transcriptIndex]);

  useEffect(() => {
    for (let p in matchData) {
      for (let i in matchData[p]) {
        matchData[p][i].matches = [];
      }
    }
    setTranscriptIndex(0);
  }, [sliderData]);

  const highlightRender = (matchAmount) => {
    const returnList = [
      <div className="w-full text-lg h-1"></div>,
      <div className="w-full text-lg h-1 bg-secondary"></div>,
      <div className="w-full text-lg h-1 bg-primary"></div>,
      <div className="w-full text-lg h-1 bg-primary"></div>,
    ];
    if (matchAmount > returnList.length) {
      matchAmount = returnList.length;
    }
    const classValue = returnList[matchAmount];
    return classValue;
  };

  const tooltipRenderer = (matchObject) => {
    let matchString = "";
    for (let i in matchObject.matches) {
      const timeMinutes = new Date(matchObject.times[i] * 1000)
        .toISOString()
        .slice(11, 19);
      const string = String(matchObject.matches[i]) + " " + timeMinutes + "\n";
      matchString = matchString + string;
    }
    return matchString;
  };

  return (
    <React.Fragment>
      <div className="flex flex-col h-full min-w-lg w-3/4">
        <div className="grow textarea textarea-bordered textarea-md w-full mb-3 resize-none overflow-scroll">
          <div>
            {Object.keys(matchData).map((paragraph) => {
              return (
                <div className="flex-column" key={paragraph}>
                  {Object.keys(matchData[paragraph]).map((key) => {
                    return (
                      <div className="inline-flex max-w-3/4" key={key}>
                        <div className="flex-col flex-shrink scroll-m-0">
                          <button
                            className={`text-lg m-0 pr-2 ${
                              //only shows tooltip if there is matches data to display
                              matchData[paragraph][key].matches.length
                                ? "tooltip"
                                : ""
                            }`}
                            data-tip={tooltipRenderer(
                              matchData[paragraph][key]
                            )}
                          >
                            {matchData[paragraph][key].word}
                          </button>
                          {highlightRender(
                            matchData[paragraph][key].matches.length
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TextReview;
