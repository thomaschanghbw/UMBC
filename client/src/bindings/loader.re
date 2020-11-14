module Loading = {
    [@bs.module "src/js/Loading"]
    [@react.component]
    external make: _ => React.element = "default";
}