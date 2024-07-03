import { useEffect, useState } from 'react';

import { Grid, Divider } from '@mui/material';
import Description from './review/Description';
import OverviewTable from './review/OverviewTable';
import FrequencyChart from './review/FrequencyChart';

function Review() {
	const [isLoading, setLoading] = useState(true);

	return (
		<Grid container spacing={3} sx={{ backgroundColor: '#eceff1' }}>
			<Grid item xs={12} md={3} sx={{ m: 1 }}>
				<Description />
			</Grid>
			<Grid item xs={12} md={4} sx={{ m: 1 }}>
				<OverviewTable />
			</Grid>
			<Grid item xs={12} md={4} sx={{ m: 1 }}>
				<FrequencyChart />
			</Grid>
		</Grid>
	);
}

export default Review;
