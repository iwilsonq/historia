import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Input, Flex, Box, H1, Text, Link, Button } from 'components'
import { navigate } from '@reach/router'
import { theme } from '../shared/theme'

const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
    }
  }
`

class Register extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  renderRegisterButton() {
    return (
      <Mutation mutation={REGISTER_MUTATION}>
        {(register, { loading }) => {
          if (loading) {
            return <Button>Creating Account...</Button>
          }

          return (
            <Button
              onClick={() => {
                register({ variables: this.state }).then(mutationResult => {
                  // put token into localStorage
                  console.log('mutationResult', mutationResult)
                  navigate('onboarding')
                })
              }}
            >
              Register
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
          backgroundImage={`linear-gradient(225deg, transparent 38px, ${
            theme.colors.turquoise
          } 0)`}
        >
          <Form>
            <Flex flexDirection="column" alignItems="center">
              <H1>Create Account</H1>
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

              <Box mb={32}>{this.renderRegisterButton()}</Box>

              <Link to="/login">
                <Text>Back to sign in</Text>
              </Link>
            </Flex>
          </Form>
        </Box>
      </Box>
    )
  }
}

export { Register }
