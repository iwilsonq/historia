let str = ReasonReact.string;

type todo = {
  id: string,
  title: string,
  completed: bool,
};

let component = ReasonReact.statelessComponent("TodoItem");

let make = (~todo, ~onToggle, _children) => {
  ...component,
  render: _self =>
    <li id=todo.id>
      <input type_="checkbox" checked=todo.completed onChange=onToggle />
      (str(todo.title))
    </li>,
};