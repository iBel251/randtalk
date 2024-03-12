/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();

exports.sendTelegramMessage = functions.firestore
  .document("submissions/{submissionId}")
  .onCreate(async (snap, context) => {
    const submission = snap.data();
    const chatId = submission.chatId; // Assuming you store chatId in the submission
    const messageText =
      "Thanks for submitting your details! Here’s what you can do next...";

    const telegramToken = "6389919920:AAGtICZ4LdgQjG31BHGz2fL-fbCEDtoulf8";
    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    await axios
      .post(telegramUrl, {
        chat_id: chatId,
        text: messageText,
      })
      .then((response) => {
        console.log("Message sent: ", response.data);
      })
      .catch((error) => {
        console.error("Error sending message: ", error);
      });
  });
