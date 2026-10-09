exports.handler = async (event) => {
  // 1. CORS Headers: Sirf aapki Netlify site ko API call karne ki permission hai
  const headers = {
    "Access-Control-Allow-Origin": "https://grand-pudding-756588.netlify.app", 
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Browser preflight request handle karna
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "ok" };
  }

  // 2. HTTP Method restrict karein: Sirf POST requests allow karein
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  // Aapka Telegram Bot Token aur Chat ID
  const token = "8909291431:AAG0Ja6pvHmNRdUB54ZuxVAPksIA8nz2Cv8";
  const chatId = "1129888576";

  const ip =
    event.headers["x-forwarded-for"] ||
    event.headers["client-ip"] ||
    "Unknown";

  const ua = event.headers["user-agent"] || "Unknown Device";

  const message = `🚨 Website Visitor Alert!
IP: ${ip}
Device: ${ua}
Time: ${new Date().toLocaleString()}`;

  // 3. Try-Catch ke sath Secure API Call
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Telegram message failed");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "Success", message: "Alert sent" }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ status: "Error", message: "Internal Server Error" }),
    };
  }
};
