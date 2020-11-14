[@react.component]
let make = () => {
    <div className="text-center">
        <div className="animate-bounce">{ReasonReact.string("Please wait")}</div>
        <div className="w-48 m-auto">
            <Loader.Loading/>
        </div>
   </div>
}
let default = make;