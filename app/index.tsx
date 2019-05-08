import * as React from "react";
import * as ReactDOM from "react-dom";
import { GlobalStyles } from "./Theme/GlobalStyles";
import App from "./App";
import { register } from "./serviceWorker";

const element = document.getElementById("app");

const app = (
  <React.Fragment>
    <GlobalStyles />
    <App />
  </React.Fragment>
);

ReactDOM.render(app, element);

const onSWupdate = () => {
  const event = new CustomEvent("serviceWorker", {
    detail: "updated"
  });
  window.dispatchEvent(event);
  console.info("service-worker updated");
};
const onSWsuccess = async () => {
  localStorage.setItem("serviceWorker", "success");
  const event = new CustomEvent("serviceWorker", {
    detail: "success"
  });
  await window.dispatchEvent(event);
  console.info("service-worker success");
};

register({
  onUpdate: onSWupdate,
  onSuccess: onSWsuccess
});
