import * as readline from 'readline'
import { processInputFile } from "../../utils";

type Stack = string[]

type MoveProcedure = {
    amount: number;
    from: number;
    to: number;
}

type Crane = {
    stacks: Stack[];
    procedures: MoveProcedure[];
}

const stacksPromise = processInputFile<Crane>("input.txt", async (rl:readline.Interface) => {
    const crane:Crane = {
        stacks: [],
        procedures: []
    }

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        if(!line) continue;

        if(line.startsWith("move")){
            const lineSplit = line.split(' ');

            crane.procedures.push({
                amount: Number(lineSplit[1]),
                from: Number(lineSplit[3]) - 1,
                to: Number(lineSplit[5]) - 1,
            });
        
        }else{
            
            let stackNumber = 0;

            for(let i = 0; i < line.length; i+=4){
                const slice = line.slice(i, i+3);

                if(!Number.isNaN(Number(slice))){
                    //skip the numbers line
                    stackNumber++;
                    continue;
                }
                
                // Push the letter (position 1 in the slice) to its respective stack
                if(crane.stacks[stackNumber]) crane.stacks[stackNumber].unshift(slice[1]);
                else crane.stacks[stackNumber] = [slice[1]];

                stackNumber++;
            }
        }
    }
    
    return crane;
})

stacksPromise
.then(crane => {

    // // part 1 answer
    // crane.procedures.forEach(procedure => {
    //     for(let count = 0; count < procedure.amount; count++){
            
    //         const crate = crane.stacks[procedure.from].pop();

    //         if(crate) crane.stacks[procedure.to].push(crate);
    //     }
        
    // })

    // part 2 answer
    crane.procedures.forEach(procedure => crane.stacks[procedure.to].push(...crane.stacks[procedure.from].splice(-procedure.amount)))
    
    let answer = ""
    crane.stacks.forEach(stack => answer += stack.at(stack.length-1));

    console.log("Answer: ", answer);
})