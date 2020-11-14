[@react.component]
let make = (~interest="hello") => {
    let (isChecked, setIsChecked) = React.useState(_ => false);

    <div className={"cursor-pointer " ++ (isChecked ? "go" : "bg-blue-200")} onClick={_ => setIsChecked(_ => !isChecked)}>
        {ReasonReact.string(interest)}
    </div>
}
let default = make;