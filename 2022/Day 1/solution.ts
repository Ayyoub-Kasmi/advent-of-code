import * as readline from 'readline'
import { processInputFile } from '../../utils';

type Elve = {
    index: number;
    calories: number;
}

// get elves data from the input file
async function getElves(rl: readline.Interface):Promise<Elve[]>{
    const elves:Elve[] = [{calories: 0, index: 0}];
    let elvesCount:number = 0;

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        if(line){
           elves[elvesCount].calories += Number(line);

        }else{
            //line break: elve data ended
            elvesCount++;
            elves[elvesCount] = {
                calories : 0,
                index : elvesCount,
            }
        }
    }

    return elves;
}


const elvesPromise = processInputFile<Elve[]>("input.txt", getElves);

// // part one answer
// elvesPromise
// .then(elves => console.log(getMaxCalories(elves)))
// .catch(err => console.log(err))

// part two answer
elvesPromise
.then( (elves:Elve[]) => {
    const topThree = getTopThree(elves);

    console.log(getTotalCalories(topThree));
    
})

function getMaxCalories(elves:Elve[]):number{
   const maxElve = elves.reduce((prevElve: Elve, currentElve: Elve) => prevElve.calories > currentElve.calories ? prevElve : currentElve); 
    
    return maxElve.calories;
}

function getTopThree(elves:Elve[]):[Elve, Elve, Elve]{
    let result:[Elve, Elve, Elve] = [{calories: 0, index: 0},{calories: 0, index: 0},{calories: 0, index: 0}];

    elves.forEach( (elve:Elve) => {
        
        if(elve.calories > result[0].calories){
            result = [elve, result[0], result[1]];
        }

        else if(elve.calories > result[1].calories) {    
            result = [result[0], elve, result[1]];
        }

        else if(elve.calories > result[2].calories) {
            result[2] = elve;
        
        }
    })

    return result;
}

function getTotalCalories(elves:Elve[]):number{
    return elves.reduce( (previousElves:Elve, currentElve: Elve) => {return {calories: previousElves.calories + currentElve.calories, index: 0}}).calories
}