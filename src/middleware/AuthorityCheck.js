import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthorityCheck = () => {
  const history = useHistory();

  // Check if the user is logged in from localStorage
  if (!localStorage.getItem("loggedIn")) {
    history.replace("/login");  // Redirect to login page if not logged in
  }
};

export default AuthorityCheck;
