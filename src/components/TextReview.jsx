import React, { useState, useEffect } from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import { dataStore } from "../store/data-store";

function TextReview() {
  const {
    files,
    transcript,
    script,
    updateStatus,
    initMatchData,
    setMatchData,
    matchData,
    tSearchObjects,
    sSearchObjects,
    transcriptIndex,
    setTranscriptIndex,
  } = useStore(dataStore);

  const { minLength, wordSkip, highlightClasses, setDetails } =
    useStore(basicStore);

  useEffect(() => {
    initMatchData();
    //resets file status if conditions are changed mid/after search
    if (transcriptIndex > 0) {
      for (let i in files) updateStatus(i, 3);
      setTranscriptIndex(0);
    }
  }, [wordSkip, minLength, script]);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function getInitPointers(transcriptWord) {
    let pointers = [];

    for (let i in sSearchObjects) {
      if (sSearchObjects[i].word === transcriptWord) {
        pointers.push(Number(i));
      }
    }
    return pointers;
  }

  const getNextPointers = (transcriptWord, pointers) => {
    let nextPointers = [];

    for (let pointer in pointers) {
      const nextPos = pointers[pointer] + 1;
      if (sSearchObjects[nextPos].word === transcriptWord)
        nextPointers.push(nextPos);
    }
    return nextPointers;
  };

  const writeMatchData = (pointers, time, second, matchStreak) => {
    let matchDataTemp = matchData;
    let pointerList = pointers;

    if (matchStreak == minLength) {
      pointerList = [];
      for (let i = 0; i < minLength; i++) {
        let retro = i - minLength + 1;
        for (let pointer in pointers) {
          pointerList.push(pointers[pointer] + retro);
        }
      }
    }

    if (matchStreak < minLength) {
      for (let pointer in pointerList) {
        pointerList[pointer]++;
      }
    }

    for (let pointer in pointerList) {
      let [p, i] = sSearchObjects[pointerList[pointer]].pointer;
      let word = sSearchObjects[pointerList[pointer]].word;
      let filename = files[transcriptIndex].name;
      matchData[p][i].matches.push(filename);
      matchData[p][i].times.push(time);
      matchData[p][i].matchedWords.push(word);
      matchData[p][i].videoLocations.push(transcriptIndex);
      matchData[p][i].seconds.push(second);
    }

    setMatchData(matchDataTemp);
    return pointerList;
  };

  const wordZipper = (transcriptSearchObject) => {
    let matchStreak = 0;
    let missStreak = 0;
    let pointersSustain = [];
    let matchStreakSustain = 0;
    let pointers = [];

    for (let i = 0; i < transcriptSearchObject.text.length; i++) {
      const transcriptWord = transcriptSearchObject.text[i];
      if (pointers.length < 1) {
        matchStreak = 0;
        missStreak++;
        pointers = getInitPointers(transcriptWord);
      } else {
        missStreak = 0;
        matchStreak++;

        if (matchStreak >= minLength) {
          writeMatchData(
            pointers,
            transcriptSearchObject.times[i],
            transcriptSearchObject.seconds[i],
            matchStreak
          );
        }

        pointersSustain = pointers;
        pointers = getNextPointers(transcriptWord, pointers);

        if (pointers.length === 0) {
          i--;
        }

        //writes match data for last word at the end of loop
        if (i + 1 == transcriptSearchObject.text.length) {
          writeMatchData(
            pointers,
            transcriptSearchObject.times[i],
            transcriptSearchObject.seconds[i],
            matchStreak
          );
        }
      }
    }
    //console.log(tSearchObjects);
    //console.log(sSearchObjects);
    //console.log(matchData);
    //console.log(transcript);
  };

  //Formats the data for each transcript into a word/time in video object
  //Sends the search objext to the wordZipper function
  const searchObjectDelivery = () => {
    if (tSearchObjects[transcriptIndex]) {
      wordZipper(tSearchObjects[transcriptIndex]);
    }
    updateStatus(transcriptIndex, 4);
    setTranscriptIndex(transcriptIndex + 1);
  };

  //Calls searchObjectDelivery when there are pending searches
  useEffect(() => {
    if (transcript.length > transcriptIndex) {
      updateStatus(transcript.length - 1, 3);
      delay(100);
      searchObjectDelivery();
    } else {
      if (transcript.length > 0 && transcriptIndex == files.length - 1) {
        updateStatus(transcript.length - 1, 4);
      }
    }
  }, [tSearchObjects, transcriptIndex]);

  const highlightRender = (matchAmount, zIndex) => {
    if (matchAmount > highlightClasses.length - 1) {
      matchAmount = highlightClasses.length - 1;
    }
    const classValue = highlightClasses[matchAmount] + zIndex;
    return classValue;
  };

  function showDetails(paragraph, word) {
    let matchDataTemp = matchData;
    matchDataTemp[paragraph][word].z = " z-20";
    if (matchData[paragraph][word].matches.length > 0) {
      setDetails([paragraph, word]);
    }
    setMatchData(matchDataTemp);
  }

  return (
    <React.Fragment>
      {Object.keys(matchData).map((paragraph) => {
        return (
          <div className="flex-column" key={paragraph}>
            {Object.keys(matchData[paragraph]).map((key) => {
              return (
                <div className="inline-flex max-w-3/4" key={key}>
                  <div className="relative flex-col flex-shrink scroll-m-0">
                    <button
                      className={`font-mono sticky text-lg m-0 pr-1 pl-1 overflow-visible
                            ${highlightRender(
                              matchData[paragraph][key].matches.length,
                              matchData[paragraph][key].z
                            )}`}
                      onClick={() => showDetails(paragraph, key)}
                    >
                      {matchData[paragraph][key].word}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default TextReview;
