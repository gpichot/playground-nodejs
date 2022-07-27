import {createReadStream} from "fs";
import {cwd} from "process";

const filePathDir = cwd() + '/src/files/'

function readFile(fileName) {
    const readable = createReadStream(filePathDir + fileName, {encoding: 'utf8'})
    return readable
}

export default readFile