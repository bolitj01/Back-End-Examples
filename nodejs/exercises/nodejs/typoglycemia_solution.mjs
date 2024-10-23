import { readFile } from "node:fs/promises";
try {
  const contents = await readFile("words.txt", { encoding: "utf8" });
  const words = contents.split(" ");
  const shuffledWords = [];
  for (let word of words) {
    if (word.length >= 3) {
      var shuffled = word
        .replace(/[.,\/#!?'$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .substring(1, word.length - 1)
        .split("")
        .sort((letter) => {
          return 0.5 - Math.random();
        })
        .join("");
      shuffledWords.push(
        word.charAt(0) + shuffled + word.charAt(word.length - 1)
      );
    } else {
      shuffledWords.push(word);
    }
  }
  console.log(shuffledWords.join(" "));
} catch (err) {
  console.error(err.message);
}
