import React from 'react'
import { Input, Flex, Box, H1, Text, Button } from 'components'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <Box maxWidth={380} mx="auto" pt={180}>
        <Box backgroundImage="linear-gradient(135deg, transparent 38px, #545454 0)">
          <Flex flexDirection="column" alignItems="center">
            <H1>Sign In</H1>
            <Box maxWidth={300} mb={32}>
              <Text textAlign="center">
                Listen to some of the best music in video gaming.
              </Text>
            </Box>

            <Box maxWidth={300} width="100%" mb={32}>
              <Input
                name="email"
                label="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Box>
            <Box maxWidth={300} width="100%" mb={32}>
              <Input
                name="password"
                label="password"
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Box>

            <Box mb={32}>
              <Button>Sign In</Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    )
  }
}

export default Login
