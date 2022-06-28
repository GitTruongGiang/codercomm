import Link from "./Link";
import Card from "./Card";
import Tabs from "./Tabs";

function customizeComponenets(theme) {
  return { ...Link(theme), ...Card(theme), ...Tabs(theme) };
}
export default customizeComponenets;
