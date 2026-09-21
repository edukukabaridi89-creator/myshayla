export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { answers, signature, timestamp } = req.body || {};

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: "Invalid answers" });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: "Telegram environment variables are not configured." });
    }

    const eatTime = new Date(timestamp || Date.now()).toLocaleString("en-KE", {
  timeZone: "Africa/Nairobi",
  dateStyle: "medium",
  timeStyle: "medium"
});

const lines = [
  "❤️ SHYLAAA LOVE SITE — NEW COMPLETION",
  "",
  `Time: ${eatTime} EAT`,
  "",
  ...answers.map((item, i) =>
    `${i + 1}. ${item.answer === "YES" ? "✅ YES" : "❌ NO"}\n${item.question}`
  )
];

    const text = lines.join("\n\n");

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const tg = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text
      })
    });

    if (!tg.ok) {
      const detail = await tg.text();
      console.error("Telegram error:", detail);
      return res.status(502).json({ error: "Telegram rejected the message." });
    }

    // Send the signature as a photo if one was provided.
    if (typeof signature === "string" && signature.startsWith("data:image/png;base64,")) {
      const base64 = signature.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64, "base64");

      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("caption", "✍️ Shylaaa's signature");
      form.append(
        "photo",
        new Blob([buffer], { type: "image/png" }),
        "shylaaa-signature.png"
      );

      const photoResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto`,
        { method: "POST", body: form }
      );

      if (!photoResponse.ok) {
        console.error("Telegram signature upload failed:", await photoResponse.text());
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
}
