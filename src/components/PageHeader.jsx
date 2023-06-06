import React, { useState, useContext, useEffect } from "react";

function PageTop() {
  return (
    <React.Fragment>
      <div className="PageTop h-16 shadow-sm bg-white z-50">
        <img className="h-8 mr-2 ml-16" src="/parrot.svg"></img>
        <h1 className="font-black text-2xl fill-primary">Parrot</h1>
      </div>
    </React.Fragment>
  );
}

export default PageTop;
