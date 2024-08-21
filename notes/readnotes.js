import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUDED_ITEMS = [ 'node_modules', 'package-lock.json', 'package.json', 'readnotes.js' ];

const readFileLines = (filePath) => {
	return fs.readFileSync(filePath, 'utf-8').split('\n');
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
	} else {
		const lines = readFileLines(selection);
		let currentLine = 0;

		const readFile = async () => {
			console.log(chalk.green(lines[ currentLine ] || 'End of file'));
			const { action } = await inquirer.prompt({
				type: 'list',
				name: 'action',
				message: 'Action:',
				choices: [ 'Next Line', 'Previous Line', 'Back' ],
			});

			if (action === 'Next Line') {
				if (currentLine < lines.length - 1) currentLine++;
			} else if (action === 'Previous Line') {
				if (currentLine > 0) currentLine--;
			} else {
				return;
			}

			readFile();
		};

		readFile();
	}
};

navigate(__dirname);
