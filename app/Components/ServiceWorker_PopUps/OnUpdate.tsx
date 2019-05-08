import * as React from "react";

import PopUp from "../PopUp";

const OnSWUpdatePopUp = () => {
  return (
    <PopUp
      text="New content is available, please close all tabs of this application to see the new content"
      duration={15}
    />
  );
};

export default OnSWUpdatePopUp;
