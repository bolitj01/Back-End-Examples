import m from "mongoose";
import { config } from "dotenv";

config();

export default async function dbconnect() {
    try {
        // Connecting to the database
        await m.connect('mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log("Successfully connected to database");
            })
    }
    catch (error) {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    };
}