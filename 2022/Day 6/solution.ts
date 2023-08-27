import * as readline from 'readline'
import { processInputFile } from "../../utils";
import { type } from 'os';

type ComparisonResult = {
    success: boolean;
    firstDuplicateIndex: number;
}

const streamPromise = processInputFile<string>("input.txt", async (rl:readline.Interface) => {
    let result = '';

    for await (const line of rl){
        result = line;
    }
    
    return result;
})

streamPromise.then(stream => {
    let currentIndex = 0;
    let comparisonResult:ComparisonResult;
    let amount = 4;

    // part 1 answer
    while(!(comparisonResult = checkDistinctChars(stream, amount, currentIndex)).success && currentIndex < stream.length)
        currentIndex = comparisonResult.firstDuplicateIndex + 1;

    console.log('part one marker: ', currentIndex + amount);

    // part 2 answer
    amount = 14
    while(!(comparisonResult = checkDistinctChars(stream, amount, currentIndex)).success && currentIndex < stream.length)
        currentIndex = comparisonResult.firstDuplicateIndex + 1;

    console.log('part two marker: ', currentIndex + amount);
})

function checkDistinctChars(data:string, amount:number, startIndex:number):ComparisonResult{
    const result:ComparisonResult = {
        success: false,
        firstDuplicateIndex: -1
    }

    for(let i = startIndex; i < startIndex + amount; i++){
        for(let j = i+1; j < startIndex + amount; j++){
            if(data[i] === data[j]){
                result.firstDuplicateIndex = i;
                return result;
            }
        }
    }

    result.success = true;
    return result;
}