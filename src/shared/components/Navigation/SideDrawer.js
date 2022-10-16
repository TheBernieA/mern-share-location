import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={props.onClick} className="side-drawer">{props.children}</aside>
    </CSSTransition>
  );
  const sideElement = document.querySelector(".drawer-hook");

  return ReactDOM.createPortal(content, sideElement);
};

export default SideDrawer;
