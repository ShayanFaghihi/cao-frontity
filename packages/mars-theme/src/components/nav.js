import { connect, styled } from "frontity";
import Link from "./link";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => (
  <nav className="nav">
    <ul className="nav-list">
      {state.theme.menu.map(([name, link]) => {
        // Check if the link matched the current page url
        const data = state.source.get(state.router.link);
        const isCurrentPage = data.route === link;

        return (
          <li key={name} className="nav-list__item">
            {/* If link url is the current page, add `aria-current` for a11y */}
            <Link
              className="nav-list__link"
              link={link}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default connect(Nav);
