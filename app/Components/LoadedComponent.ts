import importedComponent from "react-imported-component";

import Loading from "./Loading";
import Error from "./Error";

const LoadedComponent = (component: any) => {
  return importedComponent(component, {
    //@ts-ignore
    Loading,
    Error
  });
};

export default LoadedComponent;
