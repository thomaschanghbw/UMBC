[@react.component]
let make = () => {
   <div className="w-full py-12 text-lightgray flex flex-col items-center bg-secondary-500 justify-center">
      <div className="inline-block text-5xl">{ReasonReact.string("Dinner for 12 Strangers")}</div>
      <div className="inline-block">{ReasonReact.string("Come and Eat with Other People!")}</div>
   </div>
}
let default = make;