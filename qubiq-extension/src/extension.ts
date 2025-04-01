import * as vscode from 'vscode';
import axios from 'axios';
import { analyzeCode } from './codeAnalyzer';

export async function activate(context: vscode.ExtensionContext) {

	

	console.log('Congratulations, your extension "qubiq-extension" is now active!');

	const disposable = vscode.workspace.onDidSaveTextDocument(document => {
		const code = document.getText();
		analyzeCode(code);
	})

	context.subscriptions.push(disposable);
}


export function deactivate() {}
