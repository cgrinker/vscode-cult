const vscode = require('vscode');
const os = require('os');
const configuration = require('./cultConfiguration').configuration;
const path = require('path');

const { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } = require('vscode-languageclient');


function activate(ctx) {
    //TransportKind.stdio
    let serverModule = ctx.asAbsolutePath(path.join('src/server', 'server.cult'));

    let serverOptions = {
        command: (os.platform() === 'win32') ? "cult.exe" : "cult",
        args: [serverModule],
	};

    
    let clientOptions = {
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

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}