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
	if (!dirPath) {
		throw new Error('The "dirPath" argument is required and must be a valid string.');
	}

	return fs.readdirSync(dirPath)
		.filter(item => !EXCLUDED_ITEMS.includes(item))
		.map(item => ({
			name: item,
			isDirectory: fs.statSync(path.join(dirPath, item)).isDirectory(),
		}));
};

const navigateTo = async (dirPath) => {
	if (!dirPath) {
		console.error('Invalid directory path provided.');
		return;
	}

	const directoryStack = []; // Stack to manage navigation
	directoryStack.push(dirPath); // Push initial directory

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
		const lines = markdownContent.split('\n');
		const topics = [];
		let currentLine = 0;

		// Extract topics from the Markdown content
		while (currentLine < lines.length) {
			if (lines[ currentLine ].startsWith('#')) {
				let topicContent = lines[ currentLine ] + '\n';
				currentLine++;
				while (currentLine < lines.length && !lines[ currentLine ].startsWith('#')) {
					topicContent += lines[ currentLine ] + '\n';
					currentLine++;
				}
				topics.push(topicContent.trim());
			} else {
				currentLine++;
			}
		}

		let currentIndex = 0;


		const mark = (left, right) => {
			console.log('\n\n');
			if (left && right) console.log('<-- o -->');
			else if (right) console.log('--- o -->');
			else if (left) console.log('<-- o ---');
			else console.log('--- o ---');
		}

		const printCurrentTopic = () => {
			if (topics.length === 0) {
				console.log('No topics found');
				return;
			}


			// Determine the left and right markers based on the current index
			const hasLeft = currentIndex > 0;
			const hasRight = currentIndex < topics.length - 1;

			// Call the mark function with appropriate flags
			
			const topic = topics[ currentIndex ];
			const chunk = topic.split('\n').slice(0, LINES_PER_PAGE).join('\n');
			const renderedContent = formatMarkdownToTerminal(chunk);
			process.stdout.write('\x1Bc'); // Clears the console
			console.log(renderedContent || 'End of file');
			mark(hasLeft, hasRight);
		};


		const handleKeyPress = (ch, key) => {
			if (key.name === 'right') {
				if (currentIndex < topics.length - 1) {
					currentIndex++;
					printCurrentTopic();
				} else {
					console.log('End of topics');
				}
			} else if (key.name === 'left') {
				if (currentIndex > 0) {
					currentIndex--;
					printCurrentTopic();
				} else {
					console.log('Start of topics');
				}
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
		printCurrentTopic();
	}
};

const navigate = async (currentPath) => {
	const directoryStack = []; // Stack to manage navigation
	directoryStack.push(currentPath); // Push initial directory

	await navigateTo(currentPath);
};

// Start the navigation
navigate(__dirname);
