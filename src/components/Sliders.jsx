import React, { useState, useContext, useEffect } from "react";
import { SliderContext, FilesContext } from "../App";

function Sliders() {
  const [sliderData, setSliderData] = useContext(SliderContext);

  const [files, setFiles] = useContext(FilesContext);

  const SliderUpdate = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log([value, name]);
    setSliderData({
      ...sliderData,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <div>
        <p>Minimum match length</p>
        <input
          name="minLength"
          type="range"
          min="3"
          max="7"
          defaultValue={sliderData.minLength}
          className="range range-info"
          step="1"
          onChange={SliderUpdate}
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
        <p>Missed word tollerance</p>
        <input
          name="wordSkip"
          type="range"
          min="0"
          max="4"
          defaultValue={sliderData.wordSkip}
          className="range range-info"
          step="1"
          onChange={SliderUpdate}
        />
        <div className="flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>
      <div>
        <p>Word shuffle</p>
        <input
          name="wordShuffle"
          type="range"
          min="0"
          max="2"
          defaultValue={sliderData.wordShuffle}
          className="range range-info"
          step="1"
          onChange={SliderUpdate}
        />
        <div className="flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sliders;
