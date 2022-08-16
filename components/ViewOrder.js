import React from "react";
import styles from "../styles/ViewOrder.module.css";
import Image from "next/image";

const ViewOrder = ({ setClose, getOrder }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(false)} className={styles.close}>
          X
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <h1 className={styles.headerTitle}>View Order</h1>
          <div className={styles.item}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.trTitle}>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Quantity</th>
                </tr>
              </tbody>
              {getOrder?.products?.map((order) => (
                <tbody key={order._id}>
                  <tr className={styles.trTitle}>
                    <td>
                      <Image
                        src={order?.item?.img}
                        width={50}
                        height={50}
                        objectFit="fill"
                        alt=""
                      />
                    </td>
                    <td>{order?.item?.title}</td>
                    <td>
                      {order?.extras?.length
                        ? order?.extras?.map((option, i, arr) => (
                            <span key={i}>
                              {option}
                              {i !== arr.length - 1 ? ", " : ""}
                            </span>
                          ))
                        : "none"}
                    </td>
                    <td>{order?.quantity}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
