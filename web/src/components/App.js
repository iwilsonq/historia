import React from 'react'
import styled from 'react-emotion'
import Player from 'components/Player'
import Controls from 'components/Controls'
import 'normalize.css'

const defaultAlbum = {
	_id: '5b39601e26356a5e00255e8c',
	name: 'Kingdom Hearts Original Soundtrack',
	cover: 'https://historia.blob.core.windows.net/images/kingdom_hearts_by_juankarlos.jpg',
	type: 'game',
	publisher: 'Square Enix',
	releasedate: 1017302400000,
	composer: 'Yoko Shimomura',
	franchise: 'Kingdom Hearts',
	created: 1530486429767,
	updated: 1530486429767
}

const AppContainer = styled('div')({
	height: '100vh',
	fontFamily: 'Avenir Next,Avenir,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
	backgroundColor: '#2b59c6'
})

const BottomBar = styled('div')({
	width: '100%',
	minWidth: 666,
	position: 'fixed',
	bottom: 0,
	height: 66,
	borderTop: '1px solid rgba(255, 255, 255, 0.6)',
	backgroundColor: 'rgb(34, 64, 153)',
	color: 'rgba(255, 255, 255, 0.4)'
})

const App = () => {
	return (
		<AppContainer>
			<BottomBar>
				<Player>
					<Controls />
				</Player>
			</BottomBar>
		</AppContainer>
	)
}

export default App
