import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder, setClose }) => {
  const cart = useSelector((state) => state.cart);
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    const products = cart?.products?.map((data) => ({
      item: data?._id,
      quantity: parseInt(data?.quantity),
      extras: data?.extras?.map((extra) => extra?.text),
    }));
    createOrder({ products, customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(false)} className={styles.close}>
          X
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <h1 className={styles.title}>You will pay $10 after delivery.</h1>
          <div className={styles.item}>
            <label className={styles.label}>Name Surname</label>
            <input
              placeholder="Rashadul Islam"
              type="text"
              className={styles.input}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="text"
              placeholder="01780788117"
              className={styles.input}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Address</label>
            <textarea
              rows={5}
              placeholder="Shahzadpur, Gulshan, Dhaka"
              type="text"
              className={styles.textarea}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className={styles.button} onClick={handleClick}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
