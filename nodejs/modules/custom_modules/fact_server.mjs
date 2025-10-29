import { createServer } from "http";
import getRandomFact from "./funFacts.mjs";

createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  const fact = getRandomFact();
  // At / route, give fact in HTML
  if (req.url === "/") {
    res.write(`<h1>Fun Fact:</h1>`);
    res.write(`<p>${fact}</p>`);
  }
  //At /fact route, give just the fact
  else if (req.url === "/fact") {
    res.write(fact);
  }
  res.end();
}).listen(8080);
console.log("waiting on port 8080");
