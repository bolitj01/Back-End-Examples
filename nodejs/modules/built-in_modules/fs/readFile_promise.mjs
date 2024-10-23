import {readFile} from "fs/promises";

(async () => {
    try {
        const entireFile = await readFile("words.txt", "utf-8");
        console.log(entireFile);
    } catch (error) {
        console.error(error);
    }
})();