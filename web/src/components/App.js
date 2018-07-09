import React from 'react'
import PlayerProvider from 'components/PlayerProvider'
import Controls from 'components/Controls'

const App = () => {
	return (
		<div>
			<PlayerProvider>
				<Controls />
			</PlayerProvider>
		</div>
	)
}

export default App
