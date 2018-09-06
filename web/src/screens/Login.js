import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, Input, Flex, Box, H1, Text, Link, Button } from 'components'
import { navigate } from '@reach/router'
import { theme } from 'shared/theme'
import { LOGIN_MUTATION } from 'shared/graphql'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  renderLoginButton() {
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(login, { loading }) => {
          if (loading) {
            return <Button>Signing in...</Button>
          }

          return (
            <Button
              onClick={() => {
                login({ variables: this.state }).then(mutationResult => {
                  this.props.setCurrentUser(mutationResult.data.login)
                  if (!mutationResult.data.login.favoriteGame) {
                    navigate('onboarding')
                  } else {
                    navigate('play')
                  }
                })
              }}
            >
              Sign In
            </Button>
          )
        }}
      </Mutation>
    )
  }

  render() {
    return (
      <Box maxWidth={380} mx="auto" pt={180}>
        <Box
          backgroundImage={`linear-gradient(135deg, transparent 38px, ${
            theme.colors.dark
          } 0)`}
        >
          <Form>
            <Flex flexDirection="column" alignItems="center">
              <H1 light>Sign In</H1>
              <Box maxWidth={300} mb={32}>
                <Text light textAlign="center">
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
              <Box mb={32}>{this.renderLoginButton()}</Box>

              <Link to="/register">
                <Text light>Create an account</Text>
              </Link>
            </Flex>
          </Form>
        </Box>
      </Box>
    )
  }
}

export { Login }
