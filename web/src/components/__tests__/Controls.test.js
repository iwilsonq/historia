import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import Controls from 'components/Controls'

const createProps = props => ({
	isPlaying: false,
	onPlayClick: jest.fn(),
	onPauseClick: jest.fn(),
	onSkipClick: jest.fn(),
	onLikeClick: jest.fn(),
	onRewindClick: jest.fn(),
	onDislikeClick: jest.fn(),
	...props
})

afterEach(cleanup)

// to test state changes, render the app's player component with `Controls` as child
describe('when clicking play button', () => {
	it('invokes onPlayClick handler', () => {
		const props = createProps()
		const { getByTestId } = render(<Controls {...props} />)
		fireEvent(
			getByTestId('play-button'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(props.onPlayClick).toHaveBeenCalledTimes(1)
	})
})

describe('when player is playing', () => {
	const props = createProps({ isPlaying: true })
	it('renders pause', () => {
		const { getByTestId, queryByTestId } = render(<Controls {...props} />)
		expect(queryByTestId('pause-button')).not.toBeNull()
	})

	it('invokes onPauseClick handler', () => {
		const { getByTestId } = render(<Controls {...props} />)
		fireEvent(
			getByTestId('pause-button'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(props.onPauseClick).toHaveBeenCalledTimes(1)
	})
})

it('invokes on skip handler', () => {
	const props = createProps()
	const { getByTestId } = render(<Controls {...props} />)
	fireEvent(
		getByTestId('skip-button'),
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		})
	)

	expect(props.onSkipClick).toHaveBeenCalledTimes(1)
})

it('invokes on like handler', () => {
	const props = createProps()
	const { getByTestId } = render(<Controls {...props} />)
	fireEvent(
		getByTestId('like-button'),
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		})
	)

	expect(props.onLikeClick).toHaveBeenCalledTimes(1)
})

it('invokes on rewind handler', () => {
	const props = createProps()
	const { getByTestId } = render(<Controls {...props} />)
	fireEvent(
		getByTestId('rewind-button'),
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		})
	)

	expect(props.onRewindClick).toHaveBeenCalledTimes(1)
})
