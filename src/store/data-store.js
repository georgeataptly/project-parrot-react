import {create} from "zustand";

//creates a linear array with start, end and length input
function linspace(start, end, length) {
    if (length > 1) {
        const step = (end - start) / (length - 1);
        return Array.from({ length }, (_, i) => start + step * i);
    } else if (end > 0) {
        return start / end;
    } else {
        return 0;
    }
  }

//for formatting transcript search object text
function formatTText(text) {
    //splits text into list of words
    //removes empty spaces from list
    return text.toLowerCase()
    .replace(/-/g, " -")
    .replace(/\//g, " /")
    .replace(/[^a-zA-Z\s]/g, "")
    .split(" ")
    .filter((word) => word);
}

//for formatting script text for matchData object
function formatSText(text) {
    //removes new line formatting from text
    //splits text into list of words
    //removes empty spaces from list
    return text.replace(/(\r\n|\n|\r)/gm, " \n")
    .replace(/-/g, " -")
    .split(" ")
    .filter((word) => word);
}

//for stripping text formatting pre-search
function stripText(text) {
    //removes new line formatting from text
    return text.replace(/(\r\n|\n|\r)/gm, "")
    .replace(/[^a-zA-Z\s]/g, "")
    .toLowerCase()
}

function toTime(number) {
    const timeMinutes = new Date(number * 1000).toISOString().slice(11, 19);
    return timeMinutes;
};

export const dataStore = create((set) => ({
    files: {},
    urls: [],
    transcript: [],
    tSearchObjects: [],
    script: '',
    sSearchObjects: [],
    matchData: {},
    matchAmounts: [],
    transcriptIndex: 0,
    contextList: [],

    setFiles: (val) => set(() => {
        const location_list = [];
        const transcript_pockets = [];
        for (let i = 0; i < val.length; i++) {
            location_list.push(URL.createObjectURL(val.item(i)));
            transcript_pockets.push([])
        }
        
        return {files: val, urls: location_list, transcript: transcript_pockets}}),

    setScript: (val) => set(() => ({script: val})),

    setMatchData: (val) => set(() => {
        let list = [];
        let allMatches = [];
        let contextRes = [];

        for (let paragraph in val) {
            for (let word in val[paragraph]) {
              const matchLength = val[paragraph][word].matches.length;
              allMatches.push(matchLength);
              if (!list.includes(matchLength) && matchLength !== 0) {
                list.push(matchLength);
              }
            }
          }
        list.sort();

        let interval = Math.floor(allMatches.length / 80);
        let localMax = 0;

        for (let i = 0; i < allMatches.length; i++) {
            if (allMatches[i] > localMax) {
                localMax = allMatches[i];
            }
            if (i % interval == 0) {
                contextRes.push(localMax);
                localMax = 0;
            }
        }

        return {matchData: val, matchAmounts: list, contextList: contextRes }
    }),

    addTranscript: (val) => set((state) => {
        //adds transcript to transcript list
        //creates search objects and adds them to tSearchObjects list

        console.log("transcript Received")
        console.log(state.transcript)
        let transcriptSearchObject = {
            text: [],
            times: [],
            seconds: [],
            file: 0,
         };

        for (let i = 0; i < Object.keys(val[0]).length; i++) {
            const splitText = formatTText(val[0][i].text);
            transcriptSearchObject.text =
            transcriptSearchObject.text.concat(splitText);
            transcriptSearchObject.seconds = transcriptSearchObject.seconds.concat(
            linspace(
                val[0][i].start,
                val[0][i].end,
                splitText.length
            ));
            transcriptSearchObject.file = val[1];
        }
        //formats new time values to hours / minutes
        for (let i = 0; i < transcriptSearchObject.seconds.length; i++) {
            let number = transcriptSearchObject.seconds[i];
            transcriptSearchObject.times.push(toTime(number));
        }

        let tempTranscript = state.transcript;
        tempTranscript[val[1]] = val[0];

        return {transcript: tempTranscript, tSearchObjects: [...state.tSearchObjects, transcriptSearchObject]}
    }),

    updateStatus: (index, statusNumber) => {
        set((state) => {
            let tempFiles = state.files;
            //the end of the file list has an object for length, if we accidentally try to update this it causes a crash
            if (index !== "length" && index < tempFiles.length) {
                tempFiles[index].fileStatus = statusNumber;
            }
            return {files: tempFiles};
        })},

    initMatchData: () => {
        set((state) => {
        let initMatchDataObject = { 0: {} };
        let initSSearchObjects= [];
        
        const wordList = formatSText(state.script)

        let paragraphCount = 0;
        let searchObjectCount = 0;

        for (let i in wordList) {

            if (/\n/.exec(wordList[i])) {
            paragraphCount++;
            initMatchDataObject[paragraphCount] = {};
            }

            initMatchDataObject[paragraphCount][i] = {
                word: wordList[i],
                matches: [],
                times: [],
                seconds: [],
                init: false,
                matchedWords: [],
                videoLocations: [],
                z: " z-0",
            };
            
            if (stripText(wordList[i]) !== "") {
                initSSearchObjects[searchObjectCount] = {
                    word : stripText(wordList[i]),
                    pointer : [paragraphCount, i]
                };
                searchObjectCount++
            }

            }
        return {matchData: initMatchDataObject, sSearchObjects: initSSearchObjects}
    })},

    setTranscriptIndex: (val) => set(() => ({transcriptIndex: val}))
}))