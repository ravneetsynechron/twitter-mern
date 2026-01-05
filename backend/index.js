const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');
const http = require('http'); 
const { Server } = require('socket.io'); 
const dbConnect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const PORT = 4900;
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());
dbConnect();

app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use("/api/message", messageRoutes);

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

io.on("connection", (socket) => {
    // console.log("⚡ New client connected:", socket.id); // Removed
    // Join a room for user ID (for private messaging)
    socket.on("join", (userId) => {
        socket.join(userId);
        // console.log(`✅ User joined room: ${userId}`); // Removed
    });
    socket.on("disconnect", () => {
        // console.log("❌ Client disconnected:", socket.id); // Removed
    });
});

// ✅ Export io so you can use it in controllers
app.set("io", io);

// ✅ Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`.green.bold);
});