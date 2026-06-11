import "./style.css";
import { FLAGS } from "./flags";
import "./leaves";

if (!FLAGS.ENABLE_NAVIGATION) {
  document.querySelectorAll(".corner-nav").forEach((el) => el.remove());
}
