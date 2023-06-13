import React from "react";
import { useStore } from "zustand";
import { basicStore } from "../store/basic-store";

function PageTop() {
  const { clicked, details } = useStore(basicStore);

  return (
    <React.Fragment>
      <div className="flex absolute top-0 left-0 h-16 w-full items-center shadow-sm bg-white z-50">
        <div className="flex w-3/4">
          <img className="h-8 mr-2 ml-16" src="/parrot.svg"></img>
          <h1 className="font-black text-2xl fill-primary">Parrot</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PageTop;
