const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // 👈 أثناء التطوير، ثم غيّرها إلى نطاق تطبيقك لاحقًا
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("⚡ مستخدم متصل:", socket.id);

  // استقبال رسالة
  socket.on("send_message", (data) => {
    console.log("📩 رسالة:", data);
    // إرسالها لبقية المستخدمين
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ مستخدم غادر:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
