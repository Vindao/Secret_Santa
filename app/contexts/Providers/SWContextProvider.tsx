import * as React from "react";

import { SWContext } from "../contexts";

export interface SWContextProviderProps {}

export interface SWContextProviderState {
  offline: boolean;
  success: boolean;
  updated: boolean;
}

class SWContextProvider extends React.Component<
  SWContextProviderProps,
  SWContextProviderState
> {
  state = { offline: !navigator.onLine, success: false, updated: false };
  componentWillMount() {
    window.addEventListener("serviceWorker", this.handleSWEvent, true);
  }
  componentWillUpdate() {
    for (let type in this.state) {
      if (this.state[type]) {
        //@ts-ignore
        this.setState({ [type]: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("serviceWorker", this.handleSWEvent, true);
  }
  handleSWEvent = e => {
    //@ts-ignore
    this.setState({ [e.detail]: true });
  };
  render() {
    return (
      <SWContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SWContext.Provider>
    );
  }
}

export default SWContextProvider;
