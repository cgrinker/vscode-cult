import * as vscode from 'vscode';
import {configuration} from './cultConfiguration';
import * as path from 'path';

import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';


export function activate(ctx: vscode.ExtensionContext) {
    //TransportKind.stdio
    let serverModule = ctx.asAbsolutePath(path.join('src/server', 'server.cult'));

    let serverOptions: ServerOptions = {
        command: "cultlsp.exe",
        args: [serverModule],
	};

    
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [{scheme: 'file', language: 'cult'}],
        
		synchronize: {
			// Synchronize the setting section 'lspSample' to the server
			configurationSection: 'cultlsp',
		}
    };

    //let disposable = new LanguageClient()
    let disposable = new LanguageClient('cult', 'Cultlang Server', serverOptions, clientOptions).start();
    ctx.subscriptions.push(disposable);
    ctx.subscriptions.push(vscode.languages.setLanguageConfiguration('cult', configuration));
}

export function deactivate() {
}