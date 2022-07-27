import app from "./expressServer"
import fs from "fs";
import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

console.log("hello world");
const port = process.env.PORT || 3000;


app.listen(port,"localhost", () => {
    console.log(`listening on ${port}`);
});
