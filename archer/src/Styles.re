open Css;

let make = ReactDOMRe.Style.make;
let combine = ReactDOMRe.Style.combine;

let pageContainer =
  style([
    maxWidth(px(600)),
    margin2(~v=zero, ~h=auto),
    paddingTop(px(64)),
  ]);

/* make(~maxWidth="600px", ~margin="0 auto", ~paddingTop="64px", ()); */

let flex = make(~display="flex", ());

let listItemIndex = make(~marginRight="12px", ());

let listItemCoverArt = make(~height="40px", ~width="40px", ());

let listItem =
  make(
    ~padding="4px 16px",
    ~flexDirection="row",
    ~justifyContent="space-between",
    ~alignItems="center",
    ~listStyle="none",
    ~borderBottom="1px solid rgba(100,121,143,0.122)",
    (),
  );

let trackItem = combine(flex, listItem);

let trackList = make(~margin="0", ~padding="0", ~marginBottom="12px", ());

let newTracksButtonWrapper =
  make(~marginBottom="12px", ~justifyContent="flex-end", ())
  |> (flex |> combine);

let basicButton =
  make(
    ~padding="4px 8px",
    ~borderRadius="2px",
    ~border="1px solid #2196f3",
    ~borderColor="#2196f3",
    (),
  );