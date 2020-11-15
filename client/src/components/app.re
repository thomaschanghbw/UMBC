type siteView =
  | Landing
  | Call
  | Loading;

[@react.component]
let make = (~onFormSubmit) => {
  let (view, setView) = React.useState(_ => Landing);
  // const { startSearch } = useContext(SocketContext);

  let onSubmit = (e: ReactEvent.Form.t, p: Landing.person): unit => {
    ReactEvent.Form.preventDefault(e);
    /* code to run on submit */
    setView(_ => Loading);
    onFormSubmit(p);
  };

  <>
    <div
      className={
        switch (view) {
        | Landing => ""
        | _ => "hidden"
        }
      }>
      <Landing onSubmit />
    </div>
    <div
      className={
        switch (view) {
        | Loading => ""
        | _ => "hidden"
        }
      }>
      <LoadingScreen />
    </div>
    <div
      className={
        switch (view) {
        | Call => ""
        | _ => "hidden"
        }
      }
    />
  </>;
};

let default = make;

//   const { updateSelf } = useContext(SocketContext);
//   function clickMe() {
//     debug("UPDATE CLICK ME");
//     updateSelf({
//       name: "bob",
//       hobbies: ["sports", "yoyo"],
//       status: "searching",
//     });
