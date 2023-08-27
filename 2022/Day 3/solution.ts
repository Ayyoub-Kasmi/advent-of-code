import * as readline from 'readline'
import { processInputFile } from "../../utils";

const rucksacksPromise = processInputFile<string[]>("input.txt", async (rl:readline.Interface) => {
    const result:string[] = [];

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        result.push(line)
    }
    
    return result;
})

rucksacksPromise
.then(rucksacks => {
    // // part one solution
    // console.log(totalPrioritiesOfDuplicateItems(rucksacks));
    
    // part two solution
    console.log(totalPrioritiesOfBadges(rucksacks));
    
})

function totalPrioritiesOfBadges(rucksacks: string[]):number{
    let totalPriorities = 0;

    // iterate over rucksacks groups
    for(let i = 0; i < rucksacks.length; i+=3){
        // register items of first rucksack
        const itemsMap:Map<string, boolean | undefined> = new Map();
        
        const firstRucksack = rucksacks[i];
        let itemsList:string[] = firstRucksack.split("");
        

        for(let k = 0; k < firstRucksack.length; k++){
            itemsMap.set(firstRucksack[k], true);
        }

        // iterate over the next rucksacks and filter out uncommon items
        for(let j = i+1; j <i+3; j++){
            const currentRucksack = rucksacks[j];
            // const items = itemsMap.keys;

            for(let k = 0; k < currentRucksack.length; k++){
                itemsList = itemsList.filter(character => currentRucksack.indexOf(character) !== -1);
            }

        }
        totalPriorities += getCharacterPriority(itemsList[0]);    
        
        // console.log(`items list length for group ${i / 3} is ${itemsList.length}. items list: `, itemsList);
    }

    return totalPriorities;
}

function totalPrioritiesOfDuplicateItems(rucksacks: string[]):number{
    let totalPriorities = 0;
    
    rucksacks.forEach(rucksack => {
        const rucksackLength = rucksack.length;
        const itemsList:Record<string, boolean | undefined> = {}

        // register items of the first comparment
        for(let i = 0; i < rucksackLength / 2; i++){
            itemsList[rucksack[i]] = true;
        }

        // traverse items of the first comparment
        for(let i = rucksackLength / 2; i < rucksackLength; i++){

            if(rucksack[i] in itemsList){
                // item belongs to the first compartment too ==> duplicate found
                const duplicate =  rucksack[i];
                const priority = getCharacterPriority(duplicate);
                
                // console.log(`duplicate: ${duplicate} ; priority: ${priority}`);
                totalPriorities += priority;
                break;
            }
        }

    })

    return totalPriorities;
}

function getCharacterPriority(character:string):number{
    // Note that ASCII code for 'A' is 65 and for 'a' is 97
    if(character === character.toUpperCase()){
        // the character is uppercase
        return character.charCodeAt(0) - 65 + 27;

    }else{
        // the character is lowercase
        return character.charCodeAt(0) - 97 + 1;
    }
}