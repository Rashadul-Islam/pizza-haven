import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Admin.module.css";
import Pagination from "@mui/material/Pagination";
import ViewOrder from "../../components/ViewOrder";

const Orders = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const [viewOrder, setViewOrder] = useState(null);
  const [getOrder, setGetOrder] = useState([]);
  const status = ["preparing", "on the way", "delivered"];
  const [page, setPage] = useState(1);
  const [paginateItems, setPaginateItems] = useState([]);
  const [close, setClose] = useState(false);

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("https://pizza-haven.herokuapp.com/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (viewOrder) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://pizza-haven.herokuapp.com/api/orders/${viewOrder}`
          );
          setGetOrder(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
    return () => {
      setGetOrder([]);
    };
  }, [viewOrder]);

  useEffect(() => {
    const startIndex = (page - 1) * 10;
    setPaginateItems(orderList?.slice(startIndex, startIndex + 10));
    return () => {
      setPaginateItems([]);
    };
  }, [page, orderList]);

  const handleModal = (data) => {
    setViewOrder(data);
    setClose(true);
  };

  return (
    <div
      className={styles.orderConainer}
      onClick={() => close && setClose(false)}
    >
      <h1 className={styles.headerTitle}>Order List</h1>
      <div className={styles.item}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Customer</th>
              <th>Id</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </tbody>
          {paginateItems?.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order.customer}</td>
                <td>{order._id}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>{order?.address}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleModal(order._id)}
                  >
                    View Order
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={Math.ceil(orders?.length / 10)}
          page={page}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </div>
      {close && <ViewOrder setClose={setClose} getOrder={getOrder} />}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const orderRes = await axios.get("https://pizza-haven.herokuapp.com/api/orders");

  return {
    props: {
      orders: orderRes.data,
      show: true,
    },
  };
};

export default Orders;
