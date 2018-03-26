import * as vscode from 'vscode';
import {configuration} from './cultConfiguration';

export function activate(ctx: vscode.ExtensionContext) {
    ctx.subscriptions.push(vscode.languages.setLanguageConfiguration('cult', configuration));
}

export function deactivate() {
}