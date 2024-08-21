import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import keypress from 'keypress';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUDED_ITEMS = [ 'node_modules', 'package-lock.json', 'package.json', 'readnotes.js' ];
const LINES_PER_PAGE = 25; // Number of lines to show per page

// Set up the Markdown renderer
marked.setOptions({
	renderer: new TerminalRenderer(),
});

const formatMarkdownToTerminal = (markdown) => {
	return marked(markdown);
};

const readFileLines = (filePath) => {
	return fs.readFileSync(filePath, 'utf-8');
};

const listDirectory = (dirPath) => {
	return fs.readdirSync(dirPath)
		.filter(item => !EXCLUDED_ITEMS.includes(item))
		.map(item => ({
			name: item,
			isDirectory: fs.statSync(path.join(dirPath, item)).isDirectory(),
		}));
};

const navigate = async (currentPath) => {
	const directoryStack = []; // Stack to manage navigation
	directoryStack.push(currentPath); // Push initial directory

	const navigateTo = async (dirPath) => {
		const items = listDirectory(dirPath);
		const choices = items.map(item => ({
			name: item.isDirectory ? `${chalk.blue(item.name)}/` : item.name,
			value: path.join(dirPath, item.name),
		}));

		choices.push({ name: 'Exit', value: 'exit' });
		choices.push({ name: 'Back', value: 'back' });

		// Clear console before output
		process.stdout.write('\x1Bc'); // Clears the console

		const { selection } = await inquirer.prompt({
			type: 'list',
			name: 'selection',
			message: 'Choose an item:',
			choices,
		});

		if (selection === 'exit') return;

		if (selection === 'back') {
			if (directoryStack.length > 1) {
				directoryStack.pop(); // Remove current directory
				const previousDir = directoryStack.pop(); // Get previous directory
				return navigateTo(previousDir); // Navigate to previous directory
			} else {
				console.log('No previous directory.');
				return navigateTo(directoryStack[ 0 ]); // Stay in current directory
			}
		}

		if (fs.statSync(selection).isDirectory()) {
			directoryStack.push(dirPath); // Save current directory to stack
			await navigateTo(selection); // Navigate to selected directory
		} else if (selection.endsWith('.md')) {
			const markdownContent = readFileLines(selection);
			let currentLine = 0;

			const printLines = () => {
				const lines = markdownContent.split('\n');
				const chunk = lines.slice(currentLine, currentLine + LINES_PER_PAGE).join('\n');
				const renderedContent = formatMarkdownToTerminal(chunk);
				process.stdout.write('\x1Bc'); // Clears the console
				console.log(renderedContent || 'End of file');
			};

			const handleKeyPress = (ch, key) => {
				if (key.name === 'right') {
					if (currentLine + LINES_PER_PAGE < markdownContent.split('\n').length) {
						currentLine += LINES_PER_PAGE;
					} else {
						currentLine = markdownContent.split('\n').length; // Move to end
					}
					printLines();
				} else if (key.name === 'left') {
					if (currentLine - LINES_PER_PAGE >= 0) {
						currentLine -= LINES_PER_PAGE;
					} else {
						currentLine = 0; // Move to start
					}
					printLines();
				} else if (key.name === 'escape') {
					// Clean up and go back
					process.stdin.setRawMode(false);
					process.stdin.removeAllListeners('keypress');
					return navigateTo(dirPath); // Go back to directory view
				} else if (key.name === 'c' && key.ctrl) {
					process.exit(); // Exit on Ctrl+C
				}
			};

			keypress(process.stdin);
			process.stdin.setRawMode(true);
			process.stdin.resume();
			process.stdin.on('keypress', handleKeyPress);

			// Print the initial content
			printLines();
		}
	};

	navigateTo(currentPath);
};

navigate(__dirname);
