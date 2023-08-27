"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processInputFile = void 0;
var readline = require("readline");
var fs = require("fs");
//setup file reading line by line
function processInputFile(fileName, callback) {
    if (fileName === void 0) { fileName = "input.txt"; }
    var fileStream = fs.createReadStream(fileName);
    var rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    return callback(rl);
}
exports.processInputFile = processInputFile;
