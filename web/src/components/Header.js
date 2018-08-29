import React from 'react'
import styled from 'react-emotion'
import { withApollo } from 'react-apollo'
import { navigate } from '@reach/router'
import { H1, Flex, Box, Button } from 'components'
import { LOGOUT_MUTATION } from 'shared/graphql'

const TopBar = styled('header')({
  width: '100%',
  minWidth: 666
})

class HeaderBase extends React.Component {
  handleLogout = () => {
    this.props.client.mutate({ mutation: LOGOUT_MUTATION }).then(mutationResult => {
      this.props.client.resetStore()
      navigate('login')
    })
  }

  render() {
    return (
      <TopBar>
        <Box m="0 auto" p={16} maxWidth={1000}>
          <Flex justifyContent="space-between" alignItems="center">
            <H1 color="#000">Historia</H1>
            <Button onClick={this.handleLogout}>Logout</Button>
          </Flex>
        </Box>
      </TopBar>
    )
  }
}

export const Header = withApollo(HeaderBase)
