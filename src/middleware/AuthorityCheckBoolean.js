const AuthorityCheckBoolean = () => {
  // Check if the user is logged in using localStorage
  return !!localStorage.getItem("loggedIn");
};

export default AuthorityCheckBoolean;
