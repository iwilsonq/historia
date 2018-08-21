import React from 'react'
import { navigate } from '@reach/router'
import { Box, Flex, H1, CoverArt } from 'components/Layout'
import { ROUTES } from 'config'

export default class NowPlaying extends React.Component {
  componentDidMount() {
    const { uri } = this.props
    if (uri !== `/${ROUTES.play}`) {
      navigate('play')
    }
  }

  render() {
    const { track } = this.props
    if (!track) {
      return null
    }

    return (
      <Box pt={64}>
        <Flex justifyContent="center">
          <Box>
            <Box>
              <Flex flexDirection="column" alignItems="center">
                <CoverArt src={track.coverArt} alt={track.name} />
                <H1 color="#000">{track.name}</H1>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    )
  }
}
