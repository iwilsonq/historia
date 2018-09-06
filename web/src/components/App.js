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
    trackIndex: 0,
    user: null
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

  setCurrentUser = user => {
    this.setState({ user })
  }

  render() {
    const { tracks, trackIndex } = this.state
    if (!tracks) {
      return null
    }

    return (
      <main className={appContainer}>
        <Router primary={false}>
          <Header path={ROUTES.play} user={this.state.user} />
        </Router>

        <Router>
          <Register path={ROUTES.register} setCurrentUser={this.setCurrentUser} />
          <Login path={ROUTES.login} setCurrentUser={this.setCurrentUser} />
          <Onboarding path={ROUTES.onboarding} user={this.state.user} />
          <NowPlaying
            user={this.state.user}
            default
            path={ROUTES.play}
            fetchTracks={this.fetchTracks}
            track={tracks[trackIndex]}
          />
        </Router>
        <Router primary={false}>
          <Player
            path={ROUTES.play}
            track={tracks[trackIndex]}
            onSkip={this.nextTrack}
            user={this.state.user}
          />
        </Router>
      </main>
    )
  }
}

export default withApollo(App)
