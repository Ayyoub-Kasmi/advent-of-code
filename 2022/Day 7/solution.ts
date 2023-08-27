import * as readline from 'readline'
import { processInputFile } from "../../utils";
import { type } from 'os';

type FileSystemNode = {
    name : string;
    type : "dir" | "file";
    size : number;
    children? : FileSystemNode[];
}

const inputPromise = processInputFile<FileSystemNode>("input.txt", async (rl:readline.Interface) => {
    const root:FileSystemNode = {
        name: '/',
        type: 'dir',
        size: 0,
        children: [],
    };

    let treeStack:FileSystemNode[] = [root];
    let currentNode:FileSystemNode | undefined = root;

    for await (const line of rl){
        if(line.startsWith('$')){
            //the line is a command
            const command = line.split(' ');

            if(command.length === 3){
                // command is "cd", since "ls" command will be of length 2
                const targetNodeName = command[2];

                if(targetNodeName === '/'){
                    treeStack = [];
                    currentNode = root;
                    continue;
                }

                if(targetNodeName === '..'){
                    currentNode = treeStack.pop();

                }else{
                    if(currentNode) treeStack.push(currentNode);
    
                    currentNode = searchChildNodeByName(currentNode, targetNodeName);
                    
                }
            }

        }else{
            // the line is a file - dir info from an ls command
            const fileInfo = line.split(' ');
            
            if(fileInfo[0] === 'dir'){
                // this is a directory
                currentNode?.children?.push({
                    name: fileInfo[1],
                    type: 'dir',
                    size: -1,
                    children: []
                })

            }else{
                // this is a file
                currentNode?.children?.push({
                    name: fileInfo[1],
                    type: 'file',
                    size: Number(fileInfo[0]),
                })
            }
        }
    }
    
    return root;
})

inputPromise.then(root => {
    
    setSizes(root);

    // // part 1 answer
    // const result = sumTargetSizes(root, 100_000);
    // console.log(result);
    
    // part 2 answer
    const TOTAL_DISK = 70_000_000;
    const UPDATE_SIZE = 30_000_000;
    const requiredSpace = root.size - (TOTAL_DISK - UPDATE_SIZE) ;
    const nodeToDelete = findNodeToDelete(root, requiredSpace);
    console.log(nodeToDelete);
    
})

function setSizes(root:FileSystemNode):FileSystemNode{

    function calculateNodeSize(root:FileSystemNode):number{
        if(root.children){
            return root.children?.reduce((prev, currentNode) => {
                if(currentNode.type === 'dir') currentNode.size = calculateNodeSize(currentNode);
                
                return prev + currentNode.size;
            }, 0)
        }
        return 0;
    }

    root.size = calculateNodeSize(root);

    return root;
}

function sumTargetSizes(root:FileSystemNode, threashold:number):number{
    return (root.size < threashold ? root.size : 0) + (!root.children ? 0 : root.children.reduce((prev, currentNode) => {
        return currentNode.type === 'dir' ? prev + sumTargetSizes(currentNode, threashold) : prev;
    }, 0));
}

function searchChildNodeByName(node:FileSystemNode | undefined, childName:string):FileSystemNode | undefined{
    if(node){
        if(node.children){
            for(const child of node.children){
                if(child.name === childName){
                    return child;
                }
            }
        }
    }
    
    return undefined;
}

function findNodeToDelete(root:FileSystemNode, requiredSpace:number):FileSystemNode{
    // Use BFS to improve the performance
    const nodesQueue = [root];
    let targetNode = root;
    let currentNode:FileSystemNode | undefined;

    if(root.size < requiredSpace) throw new Error("Can't free up required space");

    while(nodesQueue.length > 0){
        currentNode = nodesQueue.shift();
        if(currentNode){
            if(currentNode.size < requiredSpace) continue;
            if(currentNode.size < targetNode.size) targetNode = currentNode;
            if(currentNode.children) nodesQueue.push(...currentNode.children.filter(child => child.type === 'dir'));
        }
    }

    return targetNode;
}