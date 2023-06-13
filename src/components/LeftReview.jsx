import React from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";
import PageHeader from "./PageHeader.jsx";
import TextReview from "./TextReview";
import ViewFile from "./ViewFile";
import BackButton from "./BackButton";

function LeftReview() {
  const { view, details } = useStore(basicStore);

  function viewStyle() {
    if (view) {
      return "opacity-0 ";
    } else {
      return "opacity-0 ";
    }
  }

  return (
    <React.Fragment>
      <div className="transition-all relative flex flex-col lg:h-full w-full lg:w-3/4">
        <PageHeader></PageHeader>
        {view ? <ViewFile></ViewFile> : ""}
        {details ? <BackButton></BackButton> : ""}
        <div className="mt-16 pt-20 px-20 grow textarea textarea-md w-full resize-none overflow-y-scroll overflow-x-hidden">
          <div
            className={
              view ? "opacity-0 transition-opacity" : "transition-opacity"
            }
          >
            <TextReview></TextReview>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LeftReview;
