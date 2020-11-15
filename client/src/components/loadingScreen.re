[@react.component]
let make = () => {
    <Page>
        <div className="flex flex-col justify-center text-center items-center text-4xl my-12">
            <div className="animate-bounce font-bold">{ReasonReact.string("Connecting with your new friends now")}</div>
            <div className="w-62 m-auto">
                <Loader.Loading/>
            </div>
    </div>
   </Page>
}
let default = make;