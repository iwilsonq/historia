let str = ReasonReact.string;

type route =
  | Home
  | NewTracks;

let mapUrlToRoute = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | [] => Home
  | ["new"] => NewTracks
  | _ => Home
  };

type state = {route};

type action =
  | ChangeRoute(route);

let component = ReasonReact.reducerComponent("ArcherApp");

let make = _children => {
  ...component,
  initialState: () => {route: Home},
  reducer: (action, _state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({route: route})
    },
  didMount: self => {
    let watcherID =
      ReasonReact.Router.watchUrl(url =>
        self.send(ChangeRoute(url |> mapUrlToRoute))
      );

    self.onUnmount(() => ReasonReact.Router.unwatchUrl(watcherID));
  },
  render: ({state}) =>
    <div className=Styles.pageContainer>
      (
        switch (state.route) {
        | Home =>
          <div>
            <TrackData.GetTracksQuery>
              ...(
                   ({result}) =>
                     switch (result) {
                     | Loading => <div> (str("Loading")) </div>
                     | Error(error) => <div> (str(error##message)) </div>
                     | Data(response) => <Tracks tracks=response##tracks />
                     }
                 )
            </TrackData.GetTracksQuery>
            <div style=Styles.newTracksButtonWrapper>
              <button
                style=Styles.basicButton
                onClick=(_event => ReasonReact.Router.push("/new"))>
                (str("New Tracks"))
              </button>
            </div>
          </div>
        | NewTracks =>
          <div>
            <button
              style=Styles.basicButton
              onClick=(_event => ReasonReact.Router.push("/"))>
              (str("Home"))
            </button>
            <span> ("New Tracks!!!" |> str) </span>
          </div>
        }
      )
    </div>,
};