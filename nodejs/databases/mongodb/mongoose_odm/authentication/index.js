import app from "./app.js";
import {config} from "dotenv";

config();

const port = "8080";
// server listening 
app.listen(port);
console.log(`Server running on port ${port}`);