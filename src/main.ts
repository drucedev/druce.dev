import "./style.css";
import { FLAGS } from "./flags";
import { initLeaves } from "./leaves";

initLeaves();

if (!FLAGS.ENABLE_NAVIGATION) {
  document.querySelectorAll(".corner-nav").forEach((el) => el.remove());
}
