import React from 'react'
import styled from 'react-emotion'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Player from 'components/Player'
import Controls from 'components/Controls'
import 'normalize.css'

const AppContainer = styled('div')({
  height: '100vh',
  fontFamily:
    'Avenir Next,Avenir,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
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
        <Query query={TRACKS_QUERY}>
          {({ data, loading, error }) => {
            if (error) {
              console.error(error)
              return <div>an error ocurred</div>
            }

            if (loading) {
              return <div>loading...</div>
            }

            return (
              <Player tracks={data.tracks}>
                <Controls />
              </Player>
            )
          }}
        </Query>
      </BottomBar>
    </AppContainer>
  )
}

const TRACKS_QUERY = gql`
  query TracksQuery {
    tracks {
      id
      name
      url
      coverArt
    }
  }
`

export default App
