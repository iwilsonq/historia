import gql from 'graphql-tag'

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
