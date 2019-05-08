import * as React from "react";
import styled from "styled-components";

export interface TestProps {}

const Tester = styled.div`
  font-size: 5em;
`;

const Test: React.SFC<TestProps> = () => {
  return <Tester id="Test">I am the test Page</Tester>;
};

export default Test;
