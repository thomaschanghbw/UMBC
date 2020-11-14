open GoodbyeStyles;
open Css;

[@react.component]
let make = () => <div className=merge([testStyle, "text-6xl"])>{ReasonReact.string("Goodbye  thomas")}</div>

let default = make;