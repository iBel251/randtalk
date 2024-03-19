import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewUserForm from "./NewUserForm";
import PreferencesForm from "./PreferencesForm";
import { useUserAuth } from "../context/AuthContext";
import useMainStore from "../store/mainStore";
import { useParams } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { closeWebApp, sendActionToBot } from "../functions/botFunctions";

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
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useMainStore();

  const { updateUser } = useUserAuth();
  let { id } = useParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);
    // Cleanup function to remove script if needed
    // return () => document.body.removeChild(script);
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100); // 100 milliseconds delay
  }, []);

  const handleSubmit = async (preferenceData) => {
    setIsLoading(true);
    const { success, error } = await updateUser(id, userData, preferenceData);
    setIsLoading(false);
    if (success) {
      setIsError(false);
      setResponseMessage(
        "Registration successful. Click on start to find a match."
      );
      setPage("success");
      sendActionToBot("registration_successful");
      closeWebApp();
    } else {
      const message = "Something was wrong, Registration not complete.";
      setResponseMessage(
        error || "Something went wrong, registration not complete."
      );
      setIsError(true);
    }
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

  if (page === "success") {
    return (
      <Box sx={styles.container}>
        <Typography
          sx={{
            background: "white",
            margin: "20px",
            padding: "20px",
            fontSize: "25px",
            color: isError ? "red" : "green",
            textAlign: "center",
          }}
        >
          {responseMessage}
        </Typography>
        {!isError && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Logic to redirect back to the bot, or you can close the web app if it's opened in Telegram.
            }}
          >
            Return to Bot
          </Button>
        )}
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={styles.container}>
        <DNA
          visible={true}
          height="250"
          width="250"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Please wait...
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
        <PreferencesForm
          setPage={setPage}
          onSave={handleSubmit}
          globalErrorMessage={responseMessage}
        />
      ) : null}
    </Box>
  );
};

export default Home;

// function closeWebApp() {
//   // Close the Web App after submission
//   if (window.Telegram) {
//     window.Telegram.WebApp.close();
//     console.log("window closed");
//   } else {
//     console.log("this is not on telegram");
//   }
// }

// function sendActionToBot(action) {
//   if (window.Telegram && window.Telegram.WebApp) {
//     const data = JSON.stringify({ action });
//     window.Telegram.WebApp.sendData(data);
//   } else {
//     console.log("Telegram.WebApp is not available.");
//   }
// }
