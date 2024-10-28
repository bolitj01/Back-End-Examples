import express from "express";
import { appendFile } from "fs";
import cookieParser from "cookie-parser";

const app = express();

import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// app.use(express.static("images"))
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.cookies.cats === "true") {
    console.log("Loves cats");
  }
  req.likesCats = req.cookies.cats === "true";
  next();
});

//Statically serve all images in the images folder
app.use(express.static("images"));

app.get("/", (req, res) => {
  res.send("<h1>Welcome Home!</h1>");
});

app.get("/image", (req, res) => {
  res
    .cookie("cats", "true")
    //Send a random file from the images folder
    .sendFile("images/" + Math.floor(Math.random() * 3) + ".gif", {
      root: __dirname,
    });
});

app.post("/signup", (req, res) => {
  let user = {...req.body, likesCats: req.likesCats};
  
  let userText = JSON.stringify(user);
  console.log(`Writing ${userText} to users.txt`);

  appendFile("users.txt", `${userText}\n`, (err) => {
    if (err) throw err;
  });

  res.send("User saved");
});

app.delete("/cookies", (req, res) => {
  res.clearCookie("cats").send("Cookies cleared");
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
