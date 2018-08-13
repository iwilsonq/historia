import React from 'react'
import { Box, Flex, H1, CoverArt } from 'components/Layout'

export default class NowPlaying extends React.Component {
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
                <H1>{track.name}</H1>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    )
  }
}
