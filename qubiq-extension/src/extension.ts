import * as vscode from 'vscode';
import axios from 'axios';

export async function activate(context: vscode.ExtensionContext) {

	

	console.log('Congratulations, your extension "qubiq-extension" is now active!');

	const disposable = vscode.commands.registerCommand('qubiq-extension.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World from Qubiq-extension!');
	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
