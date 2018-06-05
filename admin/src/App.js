import React from 'react'
import { css } from 'react-emotion'

import Grid from '@material-ui/core/Grid'
import TrackPage from './pages/TrackPage'

const rootStyles = css`
	font-family: 'IBM Plex Sans Condensed', sans-serif;
`

const App = () => {
	return (
		<div className={rootStyles}>
			<Grid container justify="center">
				<Grid item md={8} xs={12}>
					<h1>Admin Historia</h1>
					<TrackPage />
				</Grid>
			</Grid>
		</div>
	)
}

export default App
