export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    fullName,
    phone,
    service,
    duration,
    price,
    ktv,
    dateTime,
    note
  } = req.body;

  const message = `
📌 BOOKING MỚI

👤 Họ tên: ${fullName}
📞 SĐT: ${phone}
💆 Dịch vụ: ${service}
⏱ Thời gian: ${duration}
💰 Giá: ${price}
👩‍🦰 KTV: ${ktv}
📅 Ngày giờ: ${dateTime}
📝 Ghi chú: ${note || "Không có"}
`;

  const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message
    })
  });

  if (!response.ok) {
    return res.status(500).json({ message: "Send Telegram failed" });
  }

  return res.status(200).json({ message: "Success" });
}