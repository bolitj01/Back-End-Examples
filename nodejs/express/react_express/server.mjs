import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();

// Get __dirname in es6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildFolder = "dist";
console.log('__dirname: ', __dirname);

//Accept outside requests
// app.use(cors()); Or set changeOrigin in the vite config proxy

// Server build folder from React
app.use(express.static(path.join(__dirname, buildFolder)));
app.use(express.json());

// Serve index.html from React build folder
app.get('/', (req, res) => {
    console.log("Home Page");
    res.sendFile(path.resolve(__dirname, buildFolder, 'index.html'));
});

app.get("/talk-to-backend", (req, res) => {
    res.send("Hello from the backend!");
});

app.post("/login", (req, res) => {
    res.json("Login Success");
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
