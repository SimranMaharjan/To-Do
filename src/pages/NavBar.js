import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="nav_bar">
        
        <Link to="/">
            <div>To-Do</div>
          </Link>
        <div className="menu_items">
          <Link to="/home">
            <div>Home</div>
          </Link>
          <Link to="/login">
            <div>Login</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
