import React from 'react'
import { css } from 'react-emotion'
import { withApollo } from 'react-apollo'
import { Router } from '@reach/router'

import { ROUTES, SAMPLE_TRACKS_QUERY } from 'shared'
import { Login, Register, NowPlaying, Onboarding } from 'screens'
import { Header, Player } from 'components'
import 'normalize.css'

const appContainer = css({
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
      <main className={appContainer}>
        <Router primary={false}>
          <Header path={ROUTES.play} />
        </Router>

        <Router>
          <Register path={ROUTES.register} />
          <Login path={ROUTES.login} />
          <Onboarding path={ROUTES.onboarding} />
          <NowPlaying
            default
            path={ROUTES.play}
            fetchTracks={this.fetchTracks}
            track={tracks[trackIndex]}
          />
        </Router>
        <Router primary={false}>
          <Player path={ROUTES.play} track={tracks[trackIndex]} onSkip={this.nextTrack} />
        </Router>
      </main>
    )
  }
}

export default withApollo(App)
