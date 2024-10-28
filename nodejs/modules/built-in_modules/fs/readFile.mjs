import {readFile} from "fs";

readFile("sample.txt", "utf-8", function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});