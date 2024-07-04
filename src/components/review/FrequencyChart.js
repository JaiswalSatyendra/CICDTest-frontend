import { useState } from 'react';
import {
	Box,
	Paper,
	Typography,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Chart from 'react-apexcharts';

function FrequencyChart() {
	const [age, setAge] = useState('');

	const [state, setState] = useState({
		options: {
			colors: ['#2196f3'],
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: [
					1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
				],
				title: {
					text: 'Year',
					style: {
						color: undefined,
						fontSize: '12px',
						fontFamily: 'Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-yaxis-title',
					},
				},
			},
			yaxis: {
				title: {
					text: 'Frequency',
					style: {
						color: undefined,
						fontSize: '12px',
						fontFamily: 'Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-yaxis-title',
					},
				},
			},
		},
		series: [
			{
				name: 'People Born',
				data: [30, 40, 45, 50, 49, 60, 70, 91],
				title: {
					text: 'Frequency',
					style: {
						color: undefined,
						fontSize: '12px',
						fontFamily: 'Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-yaxis-title',
					},
				},
			},
		],
	});
	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<Box
			sx={{
				width: '100%',
				bgcolor: 'background.paper',
				boxShadow: 1,
			}}
		>
			<Paper sx={{ width: '100%', mb: 2, p: 2 }}>
				<Typography
					sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Distribution
				</Typography>

				<FormControl sx={{ m: 1, minWidth: 100 }}>
					<InputLabel id="demo-simple-select-autowidth-label">
						Column
					</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={age}
						onChange={handleChange}
						autoWidth
						label="Age"
					>
						<MenuItem value={10}>Twenty</MenuItem>
						<MenuItem value={21}>Twenty one</MenuItem>
						<MenuItem value={22}>Twenty one and a half</MenuItem>
					</Select>
				</FormControl>
				<Chart
					options={state.options}
					series={state.series}
					type="bar"
				/>

				<Box
					sx={{
						width: '100%',
						bgcolor: '#eceff1',
					}}
				>
					<TableContainer
						component={Paper}
						sx={{ bgcolor: '#f5f5f5' }}
					>
						<Typography
							sx={{ flex: '1 1 100%', fontWeight: 'bold', p: 1 }}
							id="tableTitle"
							component="div"
						>
							Column Details
						</Typography>
						<Table aria-label="simple table" size={'medium'}>
							<TableHead>
								<TableRow>
									<TableCell>Type</TableCell>
									<TableCell align="left">
										Empty Cells
									</TableCell>
									<TableCell align="left">
										Unique Values
									</TableCell>
									<TableCell align="left">
										Ideal for Prediction?
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{'Number'}
									</TableCell>
									<TableCell align="left">{'0%'}</TableCell>
									<TableCell align="left">{7043}</TableCell>
									<TableCell align="left">
										<Button
											variant="contained"
											size="small"
											sx={{
												backgroundColor: '#d50000',
											}}
											startIcon={<CancelIcon />}
										>
											No
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Paper>
		</Box>
	);
}

export default FrequencyChart;
