import React from 'react'
import { withApollo } from 'react-apollo'
import { navigate } from '@reach/router'

import { H1, H2, Button, Box, Form, Checkboxes, Input, Segment } from 'components'
import { UPDATE_USER_MUTATION } from 'shared/graphql'

const QUESTION_OPTIONS = {
  gamesEnjoyed: [
    { label: 'Zelda', value: 'zelda' },
    { label: 'Final Fantasy', value: 'final_fantasy' },
    { label: 'Metal Gear Solid', value: 'mgs' },
    { label: 'Pokemon', value: 'pokemon' }
  ]
}

class OnboardingBase extends React.Component {
  state = {
    gamesEnjoyed: [],
    favoriteGame: ''
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleOptionChange = event => {
    const { name, value } = event.target

    this.setState(state => ({
      [name]: state[name].includes(value)
        ? state[name].filter(item => item !== value)
        : state[name].concat(value)
    }))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user } = this.props
    const { gamesEnjoyed, favoriteGame } = this.state
    this.props.client
      .mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: user.id,
          input: {
            gamesEnjoyed,
            favoriteGame
          }
        }
      })
      .then(() => {
        navigate('play')
      })
  }

  render() {
    return (
      <Box>
        <Box p={32} m="0 auto">
          <H1>Some Questions</H1>
          <Form>
            <Segment maxWidth={700}>
              <H2 light>Which of these games have you enjoyed?</H2>
              <Checkboxes
                name="gamesEnjoyed"
                value={this.state.gamesEnjoyed}
                options={QUESTION_OPTIONS.gamesEnjoyed}
                onChange={this.handleOptionChange}
                light
              />

              <H2 light>What is your favorite game ever?</H2>
              <Input
                name="favoriteGame"
                value={this.state.favoriteGame}
                onChange={this.handleChange}
              />

              <Box mt={32} mb={16}>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Box>
            </Segment>
          </Form>
        </Box>
      </Box>
    )
  }
}

export const Onboarding = withApollo(OnboardingBase)
