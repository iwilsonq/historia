import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
	paper: {
		position: 'absolute',
		top: '36%',
		left: '28%',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	}
})

class AddTracks extends Component {
	state = {
		name: '',
		media: ''
	}

	handleChange = event => {
		if (event.target.type === 'file') {
		}

		this.setState({
			[event.target.id]: event.target.value
		})
	}

	render() {
		const { classes, open, handleClose } = this.props

		return (
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div className={classes.paper}>
					<Typography variant="title" id="modal-title">
						Add new tracks
					</Typography>
					<form noValidate>
						<TextField
							id="name"
							label="Name"
							className={classes.textField}
							value={this.state.name}
							onChange={this.handleChange}
							margin="normal"
						/>

						<Input
							type="file"
							id="url"
							label="url"
							value={this.state.url}
							onChange={this.handleChange}
							margin="normal"
						/>

						<Select
							value={this.state.age}
							onChange={this.handleChange}
							inputProps={{
								name: 'age',
								id: 'age-simple'
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</form>
				</div>
			</Modal>
		)
	}
}

export default withStyles(styles)(AddTracks)
