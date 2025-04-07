"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeCode = analyzeCode;
const axios_1 = __importDefault(require("axios"));
async function analyzeCode(code) {
    try {
        const response = await axios_1.default.post('http://localhost:3000/dev/devcode', { code });
        console.log("Code sent to backend");
    }
    catch (err) {
        console.error("Error sending code: ", err);
    }
}
//# sourceMappingURL=codeAnalyzer.js.map