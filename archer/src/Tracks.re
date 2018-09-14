let str = ReasonReact.string;

let component = ReasonReact.statelessComponent("Track");

let make = (~tracks, _children) => {
  ...component,
  render: _self => {
    let trackItems =
      tracks
      |> Array.mapi((index, track) =>
           <li id=track##id style=Styles.trackItem>
             <div style=Styles.flex>
               <div style=Styles.listItemIndex>
                 (index |> string_of_int |> str)
               </div>
               <div> <a href=track##url> (track##name |> str) </a> </div>
             </div>
             <div>
               <img style=Styles.listItemCoverArt src=track##coverArt />
             </div>
           </li>
         )
      |> ReasonReact.array;

    <ul style=Styles.trackList> trackItems </ul>;
  },
};