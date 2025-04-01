import { ESLint } from 'eslint';
import { exec } from 'child_process';

export async function analyzeCode(code: string) {

    const eslint = new ESLint();

    const results = await eslint.lintText(code);
    const result = results[0];

    const analysis = {
        errors: result.errorCount,
        warnings: result.warningCount,
        messages: result.messages.map(msg => ({
            ruleId: msg.ruleId,
            message: msg.message,
            line: msg.line,
            column: msg.column
        }))
    }

    console.log('🔍 ESLint Analysis:');
    console.log(`❌ Errors: ${analysis.errors}`);
    console.log(`⚠️ Warnings: ${analysis.warnings}`);
    
    if (analysis.messages.length > 0) {
        console.log('\n📌 Issues found:');
        analysis.messages.forEach(msg => {
            console.log(`- Rule: ${msg.ruleId}`);
            console.log(`  Message: ${msg.message}`);
            console.log(`  Location: Line ${msg.line}, Column ${msg.column}`);
            console.log('----------------------');
        });
    } else {
        console.log('✅ No issues found!');
    }

    exec("plato -r -d ./report.js", (err, stdout) => {
        if (err) {
            console.error("Complexity analysis failed: ", err);
        } else {
            console.log("Complexity Report: ", stdout);
        }
    })


}