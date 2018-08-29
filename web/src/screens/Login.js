import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Input, Flex, Box, H1, Text, Link, Button } from 'components'
import { navigate } from '@reach/router'
import { theme } from '../shared/theme'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`

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
                  console.log(mutationResult)
                  navigate('onboarding')
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
              <Box mb={32}>{this.renderLoginButton()}</Box>

              <Link to="/register">
                <Text>Create an account</Text>
              </Link>
            </Flex>
          </Form>
        </Box>
      </Box>
    )
  }
}

export { Login }
