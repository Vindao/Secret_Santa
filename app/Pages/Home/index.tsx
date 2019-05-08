import * as React from "react";
import { Link } from "react-router-dom";

// assets

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <div id="Home">
      <Link to="/test">Test</Link> This is a test page
    </div>
  );
};

export default Home;
