import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import PlayerProvider from 'components/PlayerProvider'
import Controls from 'components/Controls'

afterEach(cleanup)

it('renders the Controls component with play button by default', () => {
	const { getByTestId } = render(
		<PlayerProvider>
			<Controls />
		</PlayerProvider>
	)

	expect(getByTestId('play-button')).not.toBeNull()
})

describe('when clicking play followed by pause', () => {
	it('calls handlePlay and handlePause', () => {
		const { getByTestId, queryByTestId } = render(
			<PlayerProvider>
				<Controls />
			</PlayerProvider>
		)

		fireEvent(
			getByTestId('play-button'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(queryByTestId('play-button')).toBeNull()
		expect(queryByTestId('pause-button')).not.toBeNull()

		fireEvent(
			getByTestId('pause-button'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true
			})
		)

		expect(queryByTestId('pause-button')).toBeNull()
		expect(queryByTestId('play-button')).not.toBeNull()
	})
})
