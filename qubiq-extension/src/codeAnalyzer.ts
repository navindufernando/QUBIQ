import { ESLint } from 'eslint';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
// import config from "eslint.config.mjs";

export async function analyzeCode(code: string) {

    console.log(code);

    // const configPath = require("path").resolve(__dirname, "qubiq-extension", "D:/IIT/Year_2/SDGP/app-final/QUBIQ/qubiq-extension/eslint.config.mjs")
    // console.log("config path: ", configPath)

    // const eslint = new ESLint({
    //     overrideConfigFile: configPath
    // });

    // try{
    //     const results = await eslint.lintText(code);
    //     console.log(results)
    // } catch (err) {
    //     console.error(err);
    // }
    // const result = results[0];

    // const analysis = {
    //     errors: result.errorCount,
    //     warnings: result.warningCount,
    //     messages: result.messages.map(msg => ({
    //         ruleId: msg.ruleId,
    //         message: msg.message,
    //         line: msg.line,
    //         column: msg.column
    //     }))
    // }

    // console.log('🔍 ESLint Analysis:');
    // console.log(`❌ Errors: ${analysis.errors}`);
    // console.log(`⚠️ Warnings: ${analysis.warnings}`);
    
    // if (analysis.messages.length > 0) {
    //     console.log('\n📌 Issues found:');
    //     analysis.messages.forEach(msg => {
    //         console.log(`- Rule: ${msg.ruleId}`);
    //         console.log(`  Message: ${msg.message}`);
    //         console.log(`  Location: Line ${msg.line}, Column ${msg.column}`);
    //         console.log('----------------------');
    //     });
    // } else {
    //     console.log('✅ No issues found!');
    // }

    // exec("plato -r -d ./report.js", (err, stdout) => {
    //     if (err) {
    //         console.error("Complexity analysis failed: ", err);
    //     } else {
    //         console.log("Complexity Report: ", stdout);
    //     }
    // })


}