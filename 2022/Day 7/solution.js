"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var inputPromise = (0, utils_1.processInputFile)("/writeups/advent-of-code/2022/Day 7/input.txt", function (rl) { var _a, rl_1, rl_1_1; return __awaiter(void 0, void 0, void 0, function () {
    var root, treeStack, currentNode, line, command, targetNodeName, fileInfo, e_1_1;
    var _b, e_1, _c, _d;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                root = {
                    name: '/',
                    type: 'dir',
                    size: 0,
                    children: [],
                };
                treeStack = [root];
                currentNode = root;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 6, 7, 12]);
                _a = true, rl_1 = __asyncValues(rl);
                _g.label = 2;
            case 2: return [4 /*yield*/, rl_1.next()];
            case 3:
                if (!(rl_1_1 = _g.sent(), _b = rl_1_1.done, !_b)) return [3 /*break*/, 5];
                _d = rl_1_1.value;
                _a = false;
                try {
                    line = _d;
                    if (line.startsWith('$')) {
                        command = line.split(' ');
                        if (command.length === 3) {
                            targetNodeName = command[2];
                            if (targetNodeName === '/') {
                                treeStack = [];
                                currentNode = root;
                                return [3 /*break*/, 4];
                            }
                            if (targetNodeName === '..') {
                                currentNode = treeStack.pop();
                            }
                            else {
                                if (currentNode)
                                    treeStack.push(currentNode);
                                currentNode = searchChildNodeByName(currentNode, targetNodeName);
                            }
                        }
                    }
                    else {
                        fileInfo = line.split(' ');
                        if (fileInfo[0] === 'dir') {
                            // this is a directory
                            (_e = currentNode === null || currentNode === void 0 ? void 0 : currentNode.children) === null || _e === void 0 ? void 0 : _e.push({
                                name: fileInfo[1],
                                type: 'dir',
                                size: -1,
                                children: []
                            });
                        }
                        else {
                            // this is a file
                            (_f = currentNode === null || currentNode === void 0 ? void 0 : currentNode.children) === null || _f === void 0 ? void 0 : _f.push({
                                name: fileInfo[1],
                                type: 'file',
                                size: Number(fileInfo[0]),
                            });
                        }
                    }
                }
                finally {
                    _a = true;
                }
                _g.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _g.trys.push([7, , 10, 11]);
                if (!(!_a && !_b && (_c = rl_1.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _c.call(rl_1)];
            case 8:
                _g.sent();
                _g.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12: return [2 /*return*/, root];
        }
    });
}); });
inputPromise.then(function (root) {
    setSizes(root);
    // // part 1 answer
    // const result = sumTargetSizes(root, 100_000);
    // console.log(result);
    // part 2 answer
    var TOTAL_DISK = 70000000;
    var UPDATE_SIZE = 30000000;
    var requiredSpace = root.size - (TOTAL_DISK - UPDATE_SIZE);
    var nodeToDelete = findNodeToDelete(root, requiredSpace);
    console.log(nodeToDelete);
});
function setSizes(root) {
    function calculateNodeSize(root) {
        var _a;
        if (root.children) {
            return (_a = root.children) === null || _a === void 0 ? void 0 : _a.reduce(function (prev, currentNode) {
                if (currentNode.type === 'dir')
                    currentNode.size = calculateNodeSize(currentNode);
                return prev + currentNode.size;
            }, 0);
        }
        return 0;
    }
    root.size = calculateNodeSize(root);
    return root;
}
function sumTargetSizes(root, threashold) {
    return (root.size < threashold ? root.size : 0) + (!root.children ? 0 : root.children.reduce(function (prev, currentNode) {
        return currentNode.type === 'dir' ? prev + sumTargetSizes(currentNode, threashold) : prev;
    }, 0));
}
function searchChildNodeByName(node, childName) {
    if (node) {
        if (node.children) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.name === childName) {
                    return child;
                }
            }
        }
    }
    return undefined;
}
function findNodeToDelete(root, requiredSpace) {
    // Use BFS to improve the performance
    var nodesQueue = [root];
    var targetNode = root;
    var currentNode;
    if (root.size < requiredSpace)
        throw new Error("Can't free up required space");
    while (nodesQueue.length > 0) {
        currentNode = nodesQueue.shift();
        if (currentNode) {
            if (currentNode.size < requiredSpace)
                continue;
            if (currentNode.size < targetNode.size)
                targetNode = currentNode;
            if (currentNode.children)
                nodesQueue.push.apply(nodesQueue, currentNode.children.filter(function (child) { return child.type === 'dir'; }));
        }
    }
    return targetNode;
}
