let str = ReasonReact.string;

type track = {
  id: string,
  name: string,
  url: string,
  coverArt: string,
};

let component = ReasonReact.statelessComponent("Track");

let make = (~track, _children) => {
  ...component,
  render: _self =>
    <li id=track.id>
      <span>(str(track.name))</span>
    </li>,
};