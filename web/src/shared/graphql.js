import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      favoriteGame
      gamesEnjoyed
    }
  }
`
export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout {
      id
      email
    }
  }
`

export const SAMPLE_TRACKS_QUERY = gql`
  query SampleTracks {
    sampleTracks {
      _id
      name
      url
      coverArt
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      favoriteGame
      gamesEnjoyed
    }
  }
`
