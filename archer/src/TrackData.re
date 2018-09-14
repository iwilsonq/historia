type track = {
  id: string,
  name: string,
  url: string,
  coverArt: string,
};

module GetTracks = [%graphql
  {|
    query GetTracks($limit: Int) {
      tracks(limit: $limit) {
        id
        name
        url
        coverArt
      }
    }
  |}
];

module GetTracksQuery = ReasonApollo.CreateQuery(GetTracks);