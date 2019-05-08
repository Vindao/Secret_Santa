import * as React from "react";

import styled from "styled-components";
import LoadedComponent from "../LoadedComponent";

// context
import { SWContext } from "../../contexts/contexts";

const OnSWupdate = LoadedComponent(() => import("./OnUpdate"));
const OnSWsuccess = LoadedComponent(() => import("./OnSuccess"));
const OnNoInternet = LoadedComponent(() => import("./OnNoInternet"));

const types = {
  updated: <OnSWupdate />,
  success: <OnSWsuccess />,
  offline: <OnNoInternet />
};

export interface SWpopUpsProps {}

const SWpopUps: React.SFC<SWpopUpsProps> = () => {
  const context = React.useContext(SWContext);
  const handleSWPopUps = () => {
    for (let type in context) {
      if (context[type]) {
        return types[type];
      }
    }
    return null;
  };
  console.log(context);
  const SWPopUpWrapper = styled.div`
    position: absolute;
    z-index: 999;
    top: 0;
  `;
  return <SWPopUpWrapper>{handleSWPopUps()}</SWPopUpWrapper>;
};

export default SWpopUps;
