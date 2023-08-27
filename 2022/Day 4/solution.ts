import * as readline from 'readline'
import { processInputFile } from "../../utils";

const pairsPromise = processInputFile<string[][]>("input.txt", async (rl:readline.Interface) => {
    const result:string[][] = [];

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        
        result.push(line.split(","))
    }
    
    return result;
})

pairsPromise
.then(pairs => {
    // // part one solution
    // console.log(countContainingPairs(pairs));
    
    // part two solution
    console.log(countOverlappingPairs(pairs));
})

function countOverlappingPairs(pairs:string[][]):number{
    let totalOverlappingPairs = 0;

    pairs.forEach(pair => {
        const assignmentOne = pair[0].split("-");
        const assignmentTwo = pair[1].split("-");

        if( Number(assignmentOne[0]) >= Number(assignmentTwo[0]) && Number(assignmentOne[0]) <= Number(assignmentTwo[1])
            || Number(assignmentOne[1]) >= Number(assignmentTwo[0]) && Number(assignmentOne[1]) <= Number(assignmentTwo[1])
            || Number(assignmentOne[0]) <= Number(assignmentTwo[0]) && Number(assignmentOne[1]) >= Number(assignmentTwo[1])){
                totalOverlappingPairs++;
                
        }
    })

    return totalOverlappingPairs;
}

function countContainingPairs(pairs:string[][]):number{
    let containingPairs = 0;
    
    pairs.forEach(pair => {
        const assignmentOne = pair[0].split("-");
        const assignmentTwo = pair[1].split("-");

        if( Number(assignmentOne[0]) <= Number(assignmentTwo[0]) && Number(assignmentOne[1]) >= Number(assignmentTwo[1])
            || Number(assignmentOne[0]) >= Number(assignmentTwo[0]) && Number(assignmentOne[1]) <= Number(assignmentTwo[1])){
                containingPairs++;
                
        }
    })

    return containingPairs;

}