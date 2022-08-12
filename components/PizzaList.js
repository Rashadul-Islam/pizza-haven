import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container} id="products">
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Order your food or groceries from Pizza Haven Delivery in Dhaka ✓
        Delivery to your home or office ✓ Check full menu and items ✓ Safe &
        easy payment.
      </p>
      <div className={styles.wrapper}>
        {pizzaList?.map((pizza) => (
          <PizzaCard key={pizza?._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
