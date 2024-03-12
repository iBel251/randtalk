import React, { createContext, useContext } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  // Function to update user data in the "users" collection
  const updateUser = async (userId, data) => {
    console.log(userId, data);
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, data);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Value to be passed to the context consumers
  const value = { updateUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the context
export const useUserAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }

  return context;
};
