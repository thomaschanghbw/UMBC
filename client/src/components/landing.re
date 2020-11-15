[@react.component]
let make = (~onSubmit) => {
  let (userName, setUserName) = React.useState(_ => "");

  <>
    <Header />
    <form className="flex flex-col justify-center w-full" onSubmit>
      <div className="mx-auto">
        <label className="block text-center">
          {React.string("What is your name?")}
        </label>
        <input
          type_="text"
          name="name"
          value=userName
          onChange={target =>
            setUserName(target->ReactEvent.Form.target##value)
          }
        />
      </div>
      <div className="text-center">
        <div> {ReasonReact.string("What are your interests?")} </div>
        <div className="inline-grid grid-cols-2 gap-3 w-24 justify-center">
          <CheckButton />
          <CheckButton />
          <CheckButton />
        </div>
      </div>
      <button className="m-auto bg-green-200" type_="submit">
        {React.string("submit")}
      </button>
    </form>
  </>;
};
let default = make /*   */;
