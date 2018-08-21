import React from 'react'
import styled from 'react-emotion'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { Router } from '@reach/router'
import { ROUTES } from 'config'

import Login from 'screens/Login'
import NowPlaying from 'screens/NowPlaying'
import Header from 'components/Header'
import Player from 'components/Player'
import 'normalize.css'

const AppContainer = styled('div')({
  height: '100vh',
  width: '100vw',
  fontFamily:
    'Avenir Next,Avenir,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
  backgroundColor: '#e4e4e4'
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
    return this.props.client
      .query({ query: SAMPLE_TRACKS_QUERY, fetchPolicy: 'no-cache' })
      .then(res => {
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
        <Router primary={false}>
          <Header path={ROUTES.play} />
        </Router>

        <Router>
          <Login path={ROUTES.login} />
          <NowPlaying default path={ROUTES.play} track={tracks[trackIndex]} />
        </Router>

        <Router primary={false}>
          <Player path={ROUTES.play} track={tracks[trackIndex]} onSkip={this.nextTrack} />
        </Router>
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
