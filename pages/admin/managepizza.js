import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Admin.module.css";
import Pagination from "@mui/material/Pagination";
import EditPizza from "../../components/EditPizza";
import { useRouter } from "next/router";

const Managepizza = ({ products }) => {
  const router = useRouter();
  const [pizzaList, setPizzaList] = useState(products);
  const [page, setPage] = useState(1);
  const [paginateItems, setPaginateItems] = useState([]);
  const [editDefault, setEditDefault] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    setPizzaList(products);
    return () => {
      setPizzaList(products);
    };
  }, [products]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "https://pizza-haven.herokuapp.com/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (data) => {
    setEditDefault(data);
    setOpenEdit(true);
  };

  useEffect(() => {
    const startIndex = (page - 1) * 10;
    setPaginateItems(pizzaList?.slice(startIndex, startIndex + 10));
    return () => {
      setPaginateItems([]);
    };
  }, [page, pizzaList]);

  const refreshData = () => {
    router.replace(router.asPath);
    setOpenEdit(false);
  };

  return (
    <div
      className={styles.orderConainer}
      onClick={() => openEdit && setOpenEdit(false)}
    >
      <h1 className={styles.headerTitle}>Manage Pizza</h1>
      <div className={styles.item}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Extras</th>
              <th>Action</th>
            </tr>
          </tbody>
          {paginateItems?.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="fill"
                    alt=""
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>
                  ${product.prices[0]} (small), ${product.prices[1]} (medium), $
                  {product.prices[2]} (large)
                </td>
                <td>
                  {product?.extraOptions?.map((option, i, arr) => (
                    <span key={i}>
                      {option?.text}
                      {i !== arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={Math.ceil(products?.length / 10)}
          page={page}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </div>
      {openEdit && (
        <EditPizza
          setOpenEdit={setOpenEdit}
          editDefault={editDefault}
          refreshData={refreshData}
        />
      )}
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

  const productRes = await axios.get("https://pizza-haven.herokuapp.com/api/products");

  return {
    props: {
      products: productRes.data,
      show: true,
    },
  };
};

export default Managepizza;
