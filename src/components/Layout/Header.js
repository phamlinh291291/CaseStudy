import React,{useEffect} from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import PizzaCarousel from "./PizzaCarousel";

const Header = (props) => {
  const {pizzaOrder}=props
  useEffect(()=>{
    console.log(pizzaOrder)
  },[pizzaOrder])
  return (
    <React.Fragment>
      <header className={classes.header}>
        <FontAwesomeIcon icon={faPizzaSlice} className={classes.icon} />
        <h1>
          Pizza
          <span className={classes.liana}>liana</span>
        </h1>
          {/* <div className="">
            Logout from Admin Panel
          </div> */}
      </header>
    </React.Fragment>
  );
};

export default Header;
