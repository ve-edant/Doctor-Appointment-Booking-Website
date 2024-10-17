import { createContext, useState } from "react";
import { doctors } from "../assets/assets";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  const value = {
    doctors,
    currencySymbol,
  };
  

  const [user, setUser] = useState(null); // Store logged-in user details

  const login = (userData) => {
    setUser(userData); // Set user data after login
  };

  const updateUserDetails = (newDetails) => {
    setUser((prev) => ({ ...prev, ...newDetails }));
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

AppContextProvider.prototype = {
  children: PropTypes.string,
};

export default AppContextProvider;
