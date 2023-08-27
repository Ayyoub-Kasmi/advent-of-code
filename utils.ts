import * as readline from 'readline'
import * as fs from 'fs'

//setup file reading line by line
export function processInputFile<T>(fileName="input.txt", callback:(rl: readline.Interface) => Promise<T>):Promise<T>{

    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })
    
    return callback(rl);
}