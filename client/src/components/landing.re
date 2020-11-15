type person = {
  name: string,
  hobbies: list(string),
  status: string
};

[@react.component]
let make = (~onSubmit) => {
  let (userName, setUserName) = React.useState(_ => "");

   <>
    <Header/>
    <Page>
        <img className="absolute" src="sun.svg"/>

        <div className="w-full h-12 bg-green-200 absolute right-0 bottom-0 rounded-full"></div>

        <div className="relative">
//         <div className="mx-auto bg-white border border-solid border-black min-w-landing max-w-landing p-8">
//             {ReasonReact.string("Tell us about yourself and you will be matched with new people to chat and eat together.
// Icebreaker questions will be given to start the conversation! ")}

//         </div>
        <div className="m-auto bg-white border border-solid border-black min-w-landing max-w-landing p-8">
        <form className="flex flex-col justify-center w-full " onSubmit={e => onSubmit(e, {name: userName, hobbies: [], status: "searching"})}>
            <div className="mx-auto mb-6">
                <label className="block text-center"> {React.string("What is your name?")} </label> 
                <input className="border border-solid border-black rounded-md" type_="text" name="name" value=userName onChange={target => setUserName(target->ReactEvent.Form.target##value)}/>
            </div>

            <div className="text-center">
                <div className="mb-2">{ReasonReact.string("What are your interests?")}</div>
                <div className="inline-grid grid-cols-4 gap-3 mb-10 rounded-sm justify-center">
                    <CheckButton interest={js| Fire 🔥 |js}/>
                    <CheckButton interest={js| Fire 💩 |js}/>
                    <CheckButton interest={js| Fire 🥺 |js}/>
                    <CheckButton interest={js| Fire 🥺 |js}/>
                    <CheckButton interest={js| Fire 🥺 |js}/>
                    <CheckButton interest={js| Fire 🥺 |js}/>
                    <CheckButton interest={js| Fire 🥺 |js}/>
                    <CheckButton interest={js| Fire 🥺 |js}/>
                </div>
            </div>
            <button className="m-auto bg-submit-500 py-2 px-12 text-white" type_="submit"> {React.string("submit")} </button> 
        </form>
        </div>
        </div>
                

    </Page>
   </>
}
let default = make;
