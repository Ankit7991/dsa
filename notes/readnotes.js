import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUDED_ITEMS = [ 'node_modules', 'package-lock.json', 'package.json', 'readnotes.js' ];

const formatMarkdownLine = (line) => {
	if (line.startsWith('# ')) {
		return chalk.bold.yellow(line); // Heading 1
	}
	if (line.startsWith('## ')) {
		return chalk.bold.underline.yellow(line); // Heading 2
	}
	if (line.startsWith('### ')) {
		return chalk.bold.italic.yellow(line); // Heading 3
	}
	if (line.startsWith('- ')) {
		return chalk.cyan.yellow(line); // Bullet point
	}
	return chalk.yellow(line); // Default
};

const readFileLines = (filePath) => {
	const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
	return lines.map(line => formatMarkdownLine(line));
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
	const items = listDirectory(currentPath);
	const choices = items.map(item => ({
		name: item.isDirectory ? `${chalk.blue(item.name)}/` : item.name,
		value: path.join(currentPath, item.name),
	}));

	choices.push({ name: 'Exit', value: 'exit' });

	const { selection } = await inquirer.prompt({
		type: 'list',
		name: 'selection',
		message: 'Choose an item:',
		choices,
	});

	if (selection === 'exit') return;

	if (fs.statSync(selection).isDirectory()) {
		await navigate(selection);
	} else if (selection.endsWith('.md')) {
		const lines = readFileLines(selection);
		let currentLine = 0;

		const printLines = () => {
			const chunk = lines.slice(currentLine, currentLine + 10).join('\n');
			console.log(chunk || 'End of file');
		};

		const readFile = async () => {
			printLines();
			const { action } = await inquirer.prompt({
				type: 'list',
				name: 'action',
				message: 'Action:',
				choices: [ 'Next 10 Lines', 'Previous 10 Lines', 'Back' ],
			});

			if (action === 'Next 10 Lines') {
				if (currentLine + 10 < lines.length) {
					currentLine += 10;
				} else {
					currentLine = lines.length; // Move to end
				}
			} else if (action === 'Previous 10 Lines') {
				if (currentLine - 10 >= 0) {
					currentLine -= 10;
				} else {
					currentLine = 0; // Move to start
				}
			} else {
				return; // Exit
			}

			readFile();
		};

		readFile();
	}
};

navigate(__dirname);
