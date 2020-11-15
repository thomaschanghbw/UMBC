[@react.component]
let make = (~interest="hello") => {
    let (isChecked, setIsChecked) = React.useState(_ => false);

    <div className={"px-6 py-2 rounded-md cursor-pointer " ++ (isChecked ? "go" : "bg-button-500")} onClick={_ => setIsChecked(_ => !isChecked)}>
        {ReasonReact.string(interest)}
    </div>
}
let default = make;