import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import AddTracksModal from '../components/Form/AddTracks'

class TracksPage extends Component {
	state = {
		open: false
	}

	handleOpen = () => {
		this.setState({ open: true })
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	render() {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Query query={TRACKS_QUERY}>
						{({ data, loading, error }) => {
							if (loading) {
								return <div>Loading...</div>
							}

							if (error) {
								console.error(error)
								return <div>An error occurred.</div>
							}

							return (
								<Table>
									<TableHead>
										<TableRow>
											<TableCell />
											<TableCell>ID</TableCell>
											<TableCell>Title</TableCell>
											<TableCell>Media</TableCell>
											<TableCell>Franchise</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.tracks.map(track => (
											<TableRow key={track.id}>
												<TableCell>
													<Icon>play_arrow</Icon>
												</TableCell>
												<TableCell>{track.id}</TableCell>
												<TableCell>{track.name}</TableCell>
												<TableCell>{track.media.name}</TableCell>
												<TableCell>{track.media.franchise}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)
						}}
					</Query>
				</Grid>
				<Grid item xs={12}>
					<Grid container justify="flex-end">
						<Button variant="contained" color="primary" onClick={this.handleOpen}>
							Add Tracks
						</Button>
						<AddTracksModal open={this.state.open} handleClose={this.handleClose} />
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

const TRACKS_QUERY = gql`
	query TracksQuery {
		tracks {
			id
			name
			url
			media {
				name
				franchise
			}
		}
	}
`

export default TracksPage
