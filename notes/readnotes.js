import fs from 'fs';
import path, { parse } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUDED_ITEMS = [ 'node_modules', 'package-lock.json', 'package.json', 'readnotes.js', '.vscode' ];
const LINES_PER_PAGE = 100; // Number of lines to show per page

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

const navigateTo = async (dirPath, directoryStack) => {
	if (!dirPath) {
		console.error('Invalid directory path provided.');
		return;
	}

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
			return navigateTo(previousDir, directoryStack); // Navigate to previous directory
		} else {
			console.log('No previous directory.');
			return navigateTo(directoryStack[ 0 ], directoryStack); // Stay in the current directory
		}
	}

	if (fs.statSync(selection).isDirectory()) {
		directoryStack.push(selection); // Save the new directory to the stack
		await navigateTo(selection, directoryStack); // Navigate to the selected directory
	} else if (selection.endsWith('.md')) {
		await displayMarkdown(selection, dirPath, directoryStack); // Display Markdown file
	}
};

const displayMarkdown = async (filePath, dirPath, directoryStack) => {
	const markdownContent = readFileLines(filePath);
	const lines = markdownContent.split('\n');
	/**@type {[{content: [], level: number, headers: []}]} */
	const topics = [];
	let parentStack = []; // Stack to keep track of parent topics
	let currentLine = 0;

	// Extract topics from the Markdown content
	while (currentLine < lines.length) {
		if (lines[ currentLine ].startsWith('#')) {
			// Determine the heading level
			const level = lines[ currentLine ].match(/^#+/)[ 0 ].length;
			// let topicContent = lines[ currentLine ] + '\n';
			let topicContent = '';

			// Update the parent stack for the current level
			parentStack[ level - 1 ] = lines[ currentLine ];
			currentLine++;

			parentStack = parentStack.slice(0, level);
			
			// for(let i = level; i < 5; i++) {
			// 	parentStack[i] = 
			// }

			// Add content under the current heading
			let i = -1, out = [];
			while (currentLine < lines.length && !lines[ currentLine ].startsWith('#')) {
				let c = lines[ currentLine ];
				if (c.startsWith('---')) {
					i++;
					out[i] = '';
					currentLine++;
					continue;
				}
				if(out[i] !== undefined) out[ i ] += lines[ currentLine ] + '\n';
				else topicContent += lines[ currentLine ] + '\n';
				currentLine++;
			}

			if(!out.length) out.push(topicContent.trim());
			else if(topicContent) out.unshift(topicContent.trim());

			// Collect headers up to the current level, max 6 elements
			const headers = parentStack.slice(0, 6).filter(Boolean);

			// Push the topic with level information and headers
			topics.push({ content: out, level, headers });
		} else {
			currentLine++;
		}
	}

	let currentIndex = 0;
	let currentChildIndex = 0;

	const printCurrentTopic = () => {
		if (topics.length === 0) {
			console.log('No topics found');
			return;
		}

		// // Determine the left and right markers based on the current index
		// const hasLeft = currentIndex > 0;
		// const hasRight = currentIndex < topics.length - 1;

		const topic = topics[ currentIndex ];
		let fullContent = '';

		// Concatenate parent topics into fullContent
		// for (let i = 0; i < topic.level - 1; i++) {
		// 	if (parentStack[ i ]) {
		// 		fullContent += parentStack[ i ] + '\n';
		// 	}
		// }

		fullContent = topic.headers.join('\n');



		// Add the current topic's content
		fullContent += topic.content[currentChildIndex];

		// Generate the chunk from the full content
		const chunk = fullContent.split('\n').slice(0, LINES_PER_PAGE).join('\n');

		// Clear console
		process.stdout.write('\x1Bc');

		// Print the chunk with proper formatting
		console.log(formatMarkdownToTerminal(chunk) || 'End of file');

		// Print markers
		// mark(hasLeft, hasRight);
	};

	// const mark = (left, right) => {
	// 	console.log('\n\n');
	// 	if (left && right) console.log('<-- o -->');
	// 	else if (right) console.log('--- o -->');
	// 	else if (left) console.log('<-- o ---');
	// 	else console.log('--- o ---');
	// };

	const handleMarkdownNavigation = async () => {
		const choices = [];

		if (currentIndex < topics.length - 1 || currentChildIndex < topics[ currentIndex ].content.length - 1) {
			choices.push({ name: chalk.green('Next Topic'), value: 'right' });
		}
		if (currentIndex > 0 || currentChildIndex > 0) {
			choices.push({ name: chalk.red('Previous Topic'), value: 'left' });
		}
		choices.push({ name: 'Back to Directory', value: 'back' });

		const { action } = await inquirer.prompt({
			type: 'list',
			name: 'action',
			message: 'Choose an action:',
			choices,
		});

		let currentChild = topics[ currentIndex ].content;
		if (action === 'left') {
			if (currentIndex >= 0) {
				if (currentChildIndex > 0) {
					currentChildIndex--
				} else {
					currentIndex--;
					let currentChild = topics[ currentIndex ].content;
					currentChildIndex = currentChild.length - 1;
				}
				printCurrentTopic();
			}
			await handleMarkdownNavigation();
		} else if (action === 'right') {
			if (currentIndex <= topics.length - 1) {
				if (currentChildIndex < currentChild.length - 1) {
					currentChildIndex++
				} else {
					currentIndex++;
					currentChildIndex = 0;
				}
				printCurrentTopic();
			}
			await handleMarkdownNavigation();
		} else if (action === 'back') {
			// Return to the directory view
			await navigateTo(dirPath, directoryStack);
		}
	};

	printCurrentTopic();
	await handleMarkdownNavigation();
};

const navigate = async (currentPath) => {
	const directoryStack = []; // Stack to manage navigation
	directoryStack.push(currentPath); // Push initial directory

	// Initial navigation to the directory
	await navigateTo(currentPath, directoryStack);
};

// Start the navigation
navigate(__dirname);
