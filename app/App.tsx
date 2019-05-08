import * as React from "react";

import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";

// contexts
import SWContextProvider from "./contexts/Providers/SWContextProvider";

// Pages
import Home from "./Pages/Home";
import Test from "./Pages/Test";

// components
import SWpopUps from "./Components/ServiceWorker_PopUps";
import Nav from "./Components/Nav";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const toReturn = () => {
    return process.env.NODE_ENV === "production" ? (
      <BrowserRouter>
        <SWContextProvider>
          <SWpopUps />
        </SWContextProvider>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    ) : (
      <HashRouter>
        <Nav />
        <SWContextProvider>
          <SWpopUps />
        </SWContextProvider>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </HashRouter>
    );
  };
  return toReturn();
};

export default App;
