import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Theme
import Colors from "../../Theme/Colors";
import { HeaderStyles } from "../../Theme/styleConstants";

export interface NavProps {}

const Header = styled.header`
  height: ${HeaderStyles.height};
  display: flex;
  align-items: center;
  background-color: ${Colors.main};
`;

const Navigation = styled.nav`
  margin-right: 3em;
  width: 70vw;
  height: ${HeaderStyles.height};
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Link = styled.div``;

const Brand = styled.h1`
  width: 30vw;
  margin-left: 1.5em;
  color: ${Colors.darkRed};
  font-weight: bold;
`;

const Nav: React.SFC<NavProps> = () => {
  return (
    <Header>
      <Brand>
        <NavLink to="/">Secret Santa</NavLink>
      </Brand>
      <Navigation>
        <Link>
          <NavLink to="/test">Test</NavLink>
        </Link>
        <Link>
          <NavLink to="/test">Test</NavLink>
        </Link>
        <Link>
          <NavLink to="/test">Test</NavLink>
        </Link>
        <Link>
          <NavLink to="/test">Test</NavLink>
        </Link>
        <Link>
          <NavLink to="/test">Test</NavLink>
        </Link>
      </Navigation>
    </Header>
  );
};

export default Nav;
