import * as readline from 'readline'
import { processInputFile } from "../../utils";

type Moves = "A" | "B" | "C" | "X" | "Y" | "Z"
type Shapes = "ROCK" | "PAPER" | "SCISSOR"
type roundStatus = "WIN" | "LOSE" | "DRAW"

const opponentCodes : Record<string, Shapes> = {
    A: "ROCK",
    B: "PAPER",
    C: "SCISSOR"
}

const myCodes:Record<string, Shapes> = {
    X: "ROCK",
    Y: "PAPER",
    Z: "SCISSOR",
}

const moveScore:Record<Shapes, number> = {
    "ROCK": 1,
    "PAPER": 2,
    "SCISSOR": 3,
}

const roundScore:Record<roundStatus, number> = {
    "LOSE": 0,
    "DRAW": 3,
    "WIN": 6
}

const isValidMove = (move:string):move is Moves => {
    return ["A", "B", "C", "X", "Y", "Z"].includes(move);
}

const roundOutcome = (shapeOne:Shapes, shapeTwo:Shapes):roundStatus => {
    
    if(shapeOne === shapeTwo) return "DRAW"

    switch(shapeOne){
        case "ROCK": return shapeTwo === "SCISSOR" ? "WIN" : "LOSE";
        case "PAPER": return shapeTwo === "ROCK" ? "WIN" : "LOSE";
        case "SCISSOR": return shapeTwo === "PAPER" ? "WIN" : "LOSE";
    }
}

const roundsPromise = processInputFile<string[][]>("input.txt", async (rl:readline.Interface) => {
    const result:Moves[][] = [];

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        result.push(line.split(' ').map(value => {
            if(!isValidMove(value)) throw new Error("Invalid move code");
            return value;
        }))
        
    }
    
    return result;
})

roundsPromise.then(rounds => {
    // //part one solution
    // followPreviousStategyGuide(rounds);
    
    // part two solution
    followNewStrategyGuide(rounds);
})

function chooseShape(opponentShape: Shapes, myRoundOutcome:roundStatus):Shapes{
    if(myRoundOutcome === "DRAW") return opponentShape;
    switch(opponentShape){
        case "ROCK": return myRoundOutcome === "WIN" ? "PAPER" : "SCISSOR"
        case "PAPER": return myRoundOutcome === "WIN" ? "SCISSOR" : "ROCK"
        case "SCISSOR": return myRoundOutcome === "WIN" ? "ROCK" : "PAPER"
    }
}

const newCode:Record<"X" | "Y" | "Z", roundStatus> = {
    X: "LOSE",
    Y: "DRAW",
    Z: "WIN"
}

function followNewStrategyGuide(rounds:string[][]){
    
    let totalScore = 0;

    rounds.forEach(round => {
        const opponentMove = round[0];
        const roundStatus = newCode[round[1]]

        if(isValidMove(opponentMove)){
            const opponentShape = opponentCodes[opponentMove];
            const myShape = chooseShape(opponentShape, roundStatus);

            const outcome = roundOutcome(myShape, opponentShape);
            const score = roundScore[outcome] + moveScore[myShape];
            console.log("round score: ", score);
            
            totalScore += score;
        
        } else throw new Error("Invalid move code")

    })

    console.log("Total: ", totalScore);
}

function followPreviousStategyGuide(rounds:string[][]){

    let totalScore:number = 0;

    rounds.forEach(round => {
        const opponentMove = round[0];
        const myMove = round[1];

        if(isValidMove(opponentMove) && isValidMove(myMove)){
            const opponentShape = opponentCodes[opponentMove];
            const myShape = myCodes[myMove];

            const outcome = roundOutcome(myShape, opponentShape);
            const score:number = roundScore[outcome] + moveScore[myShape];
            totalScore += score;
        
        } else throw new Error("Invalid move code")

    })

    console.log("Total: ", totalScore);
}