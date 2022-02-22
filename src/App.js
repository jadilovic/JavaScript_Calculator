import React, { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Container, Box, Paper, Grid, Typography, Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const btnSigns = [
	{
		id: 'clear',
		sign: 'AC',
	},
	{
		id: 'backspace',
		sign: '<=',
	},
	{
		id: 'zero',
		sign: '0',
	},
	{
		id: 'one',
		sign: '1',
	},
	{
		id: 'two',
		sign: '2',
	},
	{
		id: 'three',
		sign: '3',
	},
	{
		id: 'four',
		sign: '4',
	},
	{
		id: 'five',
		sign: '5',
	},
	{
		id: 'six',
		sign: '6',
	},
	{
		id: 'seven',
		sign: '7',
	},
	{
		id: 'eight',
		sign: '8',
	},
	{
		id: 'nine',
		sign: '9',
	},
	{
		id: 'subtract',
		sign: '-',
	},
	{
		id: 'add',
		sign: '+',
	},
	{
		id: 'decimal',
		sign: '.',
	},
	{
		id: 'multiply',
		sign: '*',
	},
	{
		id: 'divide',
		sign: '/',
	},
	{
		id: 'equals',
		sign: '=',
	},
];

function App() {
	const [text, setText] = useState('0');
	const [input, setInput] = useState('0');

	const handleButton = (signValue) => {
		const isDigit = /[0-9]/.test(signValue);
		const isOperator = /[*/+-]/.test(signValue);
		let digit, operator;
		if (isDigit) {
			digit = signValue;
		}

		if (isOperator) {
			operator = signValue;
		}

		switch (signValue) {
			case 'AC':
				setText('0');
				setInput('0');
				break;
			case digit:
				setText(text === '0' || /=/g.test(text) ? signValue : text + signValue);
				setInput(
					input === '0' || /[*/+-]/.test(input) || /=/g.test(text)
						? signValue
						: input + signValue
				);

				break;
			case operator:
				setText(
					/=/g.test(text)
						? text.match(/[-0-9.e+-]+$/) + signValue
						: /\.$/.test(text)
						? text.slice(0, -1) + signValue
						: /[*/+]$/.test(text) && signValue === '-'
						? text + '-'
						: /[-]$/.test(text) && signValue === '-'
						? text
						: /[*/+][-]$/.test(text) && signValue !== '-'
						? text.slice(0, -2) + signValue
						: /[*/+-]$/.test(text) && signValue !== '-'
						? text.slice(0, -1) + signValue
						: text + signValue
				);
				setInput(signValue);
				break;
			case '.':
				setText(
					/=/g.test(text)
						? '0.'
						: /[*/+-]$/.test(text)
						? text + '0.'
						: /\./g.test(text.match(/[0-9]*\.?[0-9]*$/)[0])
						? text
						: text + '.'
				);
				setInput(
					/=/g.test(text)
						? '0.'
						: /[*/+-]/.test(input)
						? '0.'
						: /\./g.test(input)
						? input
						: input + '.'
				);
				break;
			case '=':
				setText(
					/[=]/g.test(text) || /[*/+-]$/.test(text)
						? text
						: /[*/+-]/g.test(text)
						? // eslint-disable-next-line no-eval
						  text + '=' + eval(text)
						: text
				);

				setInput(
					/[=]/g.test(text) || /[*/+-]/.test(input) || input === '0.'
						? input
						: /[*/+-]/g.test(text)
						? // eslint-disable-next-line no-eval
						  '' + eval(text)
						: input
				);
				break;
			case '<=':
				setText(backspace(text));
				setInput(backspace(text, input));
				break;
			default:
				return null;
		}

		function backspace(arg1, arg2 = arg1) {
			return /[=]/g.test(arg1)
				? '0'
				: arg2.length === 1
				? '0'
				: arg2.slice(0, -1);
		}
	};

	return (
		<Container id="drum-machine" className="App" maxWidth="sm">
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={{ xs: 2, md: 3 }}>
					<Grid item xs={12}>
						<Item>
							<Typography variant="h6" align="center">
								Free Code Camp Calculator
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={12}>
						<Item>
							<Typography align="right">{text}</Typography>
						</Item>
					</Grid>
					<Grid item xs={12}>
						<Item>
							<Typography align="right" id="display">
								{input}
							</Typography>
						</Item>
					</Grid>
					{btnSigns.map((item, index) => (
						<Grid item xs={4} key={index}>
							<Item>
								<Button
									size="large"
									variant="contained"
									key={item.id}
									id={item.id}
									onClick={() => handleButton(item.sign)}
								>
									{item.sign}
								</Button>
							</Item>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}

export default App;
