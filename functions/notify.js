exports.handler = async (event) => {
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

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  return {
    statusCode: 200,
    body: "ok",
  };
};
