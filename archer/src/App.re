let str = ReasonReact.string;

module GetTracks = [%graphql {|
  query GetTracks($limit: Int) {
      tracks(limit: $limit) {
          id
          name
          url
          coverArt
      }
  }
|}]; 

module GetTracksQuery = ReasonApollo.CreateQuery(GetTracks);

/* State declaration */
type state = {
  todos: list(TodoItem.todo),
  newTodo: string,
  tracks: list(Track.track),
};

/* Action declaration */
type action =
  | AddTodo
  | ChangeTodo(string)
  | Toggle(TodoItem.todo);

let component = ReasonReact.reducerComponent("TodoApp");

let make = _children => {
  ...component,
  initialState: () => {
    newTodo: "",
    todos: [
      {id: "0", title: "Write this ReasonReact app", completed: false},
    ],
    tracks: [],
  },
  reducer: (action, state) =>
    switch (action) {
    | AddTodo =>
      let nextId = string_of_int(List.length(state.todos) + 1);
      let title = String.trim(state.newTodo);
      let todos = state.todos @ [{id: nextId, completed: false, title}];
      ReasonReact.Update({...state, newTodo: "", todos});
    | ChangeTodo(newTodo) => ReasonReact.Update({...state, newTodo})
    | Toggle(todoToToggle) =>
      let todos =
        List.map(
          todo =>
            todo == todoToToggle ?
              {...todo, TodoItem.completed: !TodoItem.(todo.completed)} : todo,
          state.todos,
        );
      ReasonReact.Update({...state, todos});
    },
  render: ({state, send}) => {
    let tracksQuery = GetTracks.make(~limit=10, ());
    
    <div>
      <input
        type_="text"
        placeholder="What to do?"
        value=state.newTodo
        onKeyDown=(
          event =>
          if (ReactEvent.Keyboard.keyCode(event) === 13) {
            ReactEvent.Keyboard.preventDefault(event);
            send(AddTodo);
          }
        )
        onChange=(
          event => send(ChangeTodo(ReactEvent.Form.target(event)##value))
        )
        autoFocus=true
      />

      <button onClick=(_event => send(AddTodo))> (str("Add Todo")) </button>

      <GetTracksQuery variables=tracksQuery##variables>
        ...(({ result }) => {
          switch result {
          | Loading => <div> (str("Loading")) </div>
          | Error(error) => <div> (str(error##message)) </div>
          | Data(response) => {
              switch (response##tracks) {
                | None => "No Track Data" |> str
                | Some(tracks) => {
                  let arr = Array.map(track =>
                      <div>
                        (track##name |> str)
                        <br />
                        <p> ("ID: " ++ "track##id" |> str) </p>
                      </div>,
                      tracks
                    );
                  <div>
                    (ReasonReact.array( arr ))
                  </div>;
                }
              }
            }      
          }
        })
      </GetTracksQuery>
    </div>;
  },
};