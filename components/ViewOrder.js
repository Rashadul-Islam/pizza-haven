import React from "react";
import styles from "../styles/ViewOrder.module.css";

const ViewOrder = ({ setClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(false)} className={styles.close}>
          X
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <h1>Add a new Pizza</h1>
          <div className={styles.item}>
            <label className={styles.label}>Choose an image</label>
            <input type="file" />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input className={styles.input} type="text" />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Desc</label>
            <textarea rows={4} type="text" />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
              <input type="number" placeholder="Small" />
            </div>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Extra</label>
            <div className={styles.extra}>
              <input type="number" placeholder="Price" name="price" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
