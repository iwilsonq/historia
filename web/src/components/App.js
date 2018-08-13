import React from 'react'
import styled from 'react-emotion'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Player from 'components/Player'
import Controls from 'components/Controls'
import NowPlaying from 'components/NowPlaying'
import { CreateStation } from 'components/CreateStation'

import 'normalize.css'

const AppContainer = styled('div')({
  height: '100vh',
  width: '100vw',
  fontFamily:
    'Avenir Next,Avenir,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
  backgroundColor: '#2b59c6'
})

const BottomBar = styled('footer')({
  width: '100%',
  minWidth: 666,
  position: 'fixed',
  bottom: 0,
  height: 66,
  borderTop: '1px solid rgba(255, 255, 255, 0.6)',
  backgroundColor: 'rgb(34, 64, 153)',
  color: 'rgba(255, 255, 255, 0.4)'
})

const TopBar = styled('header')({
  width: '100%',
  minWidth: 666
})

const TopBarContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 1000,
  padding: 16,
  margin: '0 auto'
})

const BrandLogo = styled('h1')({
  color: '#fff',
  fontWeight: 'normal',
  margin: 0
})

class App extends React.Component {
  state = {
    tracks: [],
    trackIndex: 0
  }

  componentDidMount() {
    this.fetchTracks()
  }

  // replaces previous 4 tracks with next 4 tracks and resets the index
  fetchTracks = () => {
    return this.props.client.query({ query: SAMPLE_TRACKS_QUERY, fetchPolicy: 'no-cache' }).then(res => {
      this.setState({ tracks: res.data.sampleTracks, trackIndex: 0 })
      return res
    })
  }

  nextTrack = async () => {
    const { tracks, trackIndex } = this.state
    const nextIndex = trackIndex + 1
    if (tracks.length === nextIndex) {
      this.fetchTracks()
    } else {
      this.setState({ trackIndex: this.state.trackIndex + 1 })
    }
  }

  render() {
    const { tracks, trackIndex } = this.state
    if (!tracks) {
      return null
    }

    return (
      <AppContainer>
        <TopBar>
          <TopBarContent>
            <CreateStation />
            <BrandLogo>Historia</BrandLogo>
          </TopBarContent>
        </TopBar>

        <NowPlaying track={tracks[trackIndex]} />
        <BottomBar>
          <Player track={tracks[trackIndex]} onSkip={this.nextTrack}>
            <Controls />
          </Player>
        </BottomBar>
      </AppContainer>
    )
  }
}

const SAMPLE_TRACKS_QUERY = gql`
  query SampleTracks {
    sampleTracks {
      _id
      name
      url
      coverArt
    }
  }
`

export default withApollo(App)
