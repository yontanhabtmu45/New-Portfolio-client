// Import React and the Hooks we need here
import React, { useState, useEffect, createContext, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage
import getAuth from "../util/auth";
// Create a context object
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuth());
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const auth = getAuth();
    if (auth.admin_token) {
      setIsLogged(true);
      setIsAdmin(auth.role_id === 1);
      setIsManager(auth.role_id === 2);
    } else {
      setIsLogged(false);
      setIsAdmin(null);
      setIsManager(null);
    }
  }, [auth]);

  const login = (newAuth) =>{
    // Store the raw token; getAuth will decode it and provide role information
    localStorage.setItem("admin", JSON.stringify(newAuth));
    setAuth(getAuth());
  }

  const logout = () => {
    localStorage.removeItem("admin");
    setAuth({});
  }

  const value = {
    auth,
    isLogged,
    isAdmin,
    isManager,
    login,
    logout,
    setAuth
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
