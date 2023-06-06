import React, { useState, useContext, useEffect } from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";

function Sliders() {
  const { minLength, wordSkip, wordShuffle, setLength, setSkip, setShuffle } =
    useStore(basicStore);

  const LengthUpdate = (event) => setLength(event.target.value);

  const SkipUpdate = (event) => setSkip(event.target.value);

  const ShuffleUpdate = (event) => setShuffle(event.target.value);

  return (
    <React.Fragment>
      <h1 className="text-xl font-bold">Search parameters</h1>
      <div>
        <p className="text-sm pb-1">Min valid match length</p>
        <input
          name="minLength"
          type="range"
          min="3"
          max="7"
          defaultValue={minLength}
          className="range"
          step="1"
          onChange={LengthUpdate}
        />
        <div className="flex justify-between text-xs px-2">
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>
      </div>
      <div>
        <p className="text-sm pb-1">Missed word tollerance</p>
        <input
          name="wordSkip"
          type="range"
          min="0"
          max="4"
          defaultValue={wordSkip}
          className="range"
          step="1"
          onChange={SkipUpdate}
        />
        <div className="flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>
      {/* 
      <div>
        <p className="text-sm pb-1">Word shuffle</p>
        <input
          name="wordShuffle"
          type="range"
          min="0"
          max="2"
          defaultValue={wordShuffle}
          className="range"
          step="1"
          onChange={ShuffleUpdate}
        />
        <div className="flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
        </div>
  </div> */}
    </React.Fragment>
  );
}

export default Sliders;
