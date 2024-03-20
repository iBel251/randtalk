import React, { createContext, useContext } from "react";
import supabase from "../supabaseClient";

const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  // Function to update user data in the "users" collection
  const updateUser = async (id, userData, preferenceData) => {
    console.log(id, userData, preferenceData);
    const { data, error } = await supabase
      .from("users")
      .update({
        preferences: preferenceData,
        age: userData.age,
        gender: userData.gender,
        city: userData.city,
        is_registered: true,
      })
      .eq("id", id);

    if (error) {
      console.log("error updating data in supabase : ", error);
      return { success: false, error };
    } else {
      console.log("registration finished");
      return { success: true, data };
    }
  };
  const updateUserProfileOnly = async (id, userData) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        age: userData.age,
        gender: userData.gender,
        city: userData.city,
      })
      .eq("id", id);

    if (error) {
      console.log("error updating data in supabase : ", error);
      return { success: false, error };
    } else {
      console.log("registration finished");
      return { success: true, data };
    }
  };
  const updateUserPreferenceOnly = async (id, preferenceData) => {
    const { data, error } = await supabase
      .from("users")
      .update({
        preferences: preferenceData,
      })
      .eq("id", id);

    if (error) {
      console.log("error updating data in supabase : ", error);
      return { success: false, error };
    } else {
      console.log("Preference update finished");
      return { success: true, data };
    }
  };

  const getUserDataById = async (id) => {
    if (!id) {
      return "Error! userID is required";
    }
    const { data, error } = await supabase
      .from("users")
      .select("gender, city, age,preferences")
      .eq("id", id)
      .single();

    if (error) return error.message;
    return data;
  };

  // Value to be passed to the context consumers
  const value = {
    updateUser,
    updateUserProfileOnly,
    updateUserPreferenceOnly,
    getUserDataById,
  };

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
