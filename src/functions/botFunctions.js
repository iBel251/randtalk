// Function to close the Web App
export function closeWebApp() {
  if (window.Telegram) {
    window.Telegram.WebApp.close();
    console.log("window closed");
  } else {
    console.log("This is not on telegram");
  }
}

// Function to send data back to the bot
export function sendActionToBot(action) {
  if (window.Telegram && window.Telegram.WebApp) {
    const data = JSON.stringify({ action });
    window.Telegram.WebApp.sendData(data);
  } else {
    console.log("Telegram.WebApp is not available.");
  }
}
