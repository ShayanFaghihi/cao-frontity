import { connect } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";

import logo from "../static/images/logo-mobile.png";

const Header = ({ state }) => {
  return (
    <>
      <header>
        <div className="container">
          <Link link="/">
            <img className="logo" src={logo} alt="CAO Logo" />
          </Link>
          <MobileMenu />
          <Nav />
        </div>
      </header>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);
