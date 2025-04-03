import * as vscode from 'vscode';
import axios from 'axios';
import { analyzeCode } from './codeAnalyzer';

export async function activate(context: vscode.ExtensionContext) {

	

	console.log('Congratulations 🎉, Qubiq Extension Activated!');

	// let disposable = vscode.commands.registerCommand("qubiq-extension.helloWorld", function () {
	// 	console.log("pass")
	// 	vscode.window.showInformationMessage("Test passed!");
	// });

	// context.subscriptions.push(disposable) ;

	const disposable = vscode.workspace.onDidSaveTextDocument(document => {

		// console.log(`✅ File saved: ${document.uri.fsPath}`);
		// console.log('🟢 Qubiq Extension Activated');

		const code = document.getText();
		analyzeCode(code);
	})

	context.subscriptions.push(disposable);
}


export function deactivate() {}
