import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewUserForm from "./NewUserForm";
import PreferencesForm from "./PreferencesForm";
import { useUserAuth } from "../context/AuthContext";
import useMainStore from "../store/mainStore";
import { useParams } from "react-router-dom";

const styles = {
  container: {
    height: "100vh",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "calc(100vh - 25px)",
    background: "goldenrod",
  },
};

const Home = () => {
  const [page, setPage] = useState("userform");
  const { userData, preferenceData } = useMainStore();

  const { updateUser } = useUserAuth();
  let { id } = useParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);
    // Cleanup function to remove script if needed
    // return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    console.log("formdata from home ", userData);
  }, [userData]);

  const handleSubmit = async () => {
    const { success, error } = await updateUser(id, userData, preferenceData);
    if (success) {
      const message =
        "Registration successfull, Click on start to find a match.";
      sendFollowUpMessage(id, message);
    } else {
      const message = "Something was wrong, Registration not complete.";
      sendFollowUpMessage(id, message);
    }
    // // Close the Web App after submission
    // if (window.Telegram) {
    //   window.Telegram.WebApp.close();
    // } else {
    //   console.log("this is not on telegram");
    // }
  };
  if (!id) {
    return (
      <Box sx={styles.container}>
        <Typography
          sx={{
            background: "white",
            margin: "20px",
            padding: "20px",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          Sorry, Page can only be accessed directly from telegram RandXtalk bot.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          background: "black",
          color: "goldenrod",
          padding: "10px",
          marginBottom: "20px",
          borderTopLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <Typography sx={{ fontSize: "45px" }}>RandTalk</Typography>
      </Box>
      {page === "userform" ? (
        <NewUserForm setPage={setPage} />
      ) : page === "preferences" ? (
        <PreferencesForm setPage={setPage} onSave={handleSubmit} />
      ) : null}
    </Box>
  );
};

export default Home;

// This function sends a follow-up message request to the server
function sendFollowUpMessage(chatId, message) {
  fetch("http://localhost:3000/follow-up", {
    // Use localhost for testing, but this needs to be updated for production
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId: chatId,
      message: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}
