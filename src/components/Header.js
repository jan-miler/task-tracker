//import PropTypes from "prop-types";
import Button from "./Button";

import { useLocation } from "react-router-dom";

const Header = ({ showAddTask, onAdd }) => {
  const location = useLocation();
  console.log(location);
  return (
    <header className="header">
      <h1>Task Tracker</h1>
      {location.pathname === "/" && (
        <Button
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

/* Header.propTypes = {
  title: PropTypes.string.isRequired,
}; */

export default Header;
