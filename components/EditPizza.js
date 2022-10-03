import { useEffect, useState } from "react";
import styles from "../styles/EditPizza.module.css";
import axios from "axios";
import Image from "next/image";

const EditPizza = ({ setOpenEdit, editDefault, refreshData }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    setTitle(editDefault?.title);
    setDesc(editDefault?.desc);
    setPrices(editDefault?.prices);
    setExtraOptions(editDefault?.extraOptions);
    return () => {
      setTitle();
      setDesc();
      setPrices();
      setExtraOptions([]);
    };
  }, [editDefault]);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    let newImage;
    try {
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/pizza-haven/image/upload",
          data
        );

        const { url } = uploadRes.data;
        newImage = url;
      }
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: newImage !== "" ? newImage : editDefault?.img,
      };

      await axios.put(
        `https://pizza-haven.herokuapp.com/api/products/${editDefault?._id}`,
        newProduct
      );
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setOpenEdit(false)} className={styles.close}>
          X
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <h1 className={styles.headerTitle}>Update Pizza</h1>
          <div className={styles.item}>
            <label className={styles.label}>Choose an image</label>
            {!showFileInput ? (
              <div className={styles.defaultImg}>
                <Image
                  src={editDefault?.img}
                  width={70}
                  height={70}
                  objectFit="fill"
                  alt=""
                />
                <p
                  className={styles.imageDelete}
                  onClick={() => setShowFileInput(true)}
                >
                  x
                </p>
              </div>
            ) : (
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            )}
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              defaultValue={editDefault?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Desc</label>
            <textarea
              rows={4}
              type="text"
              defaultValue={editDefault?.desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Small"
                defaultValue={editDefault?.prices[0]}
                onChange={(e) => changePrice(e, 0)}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Medium"
                defaultValue={editDefault?.prices[1]}
                onChange={(e) => changePrice(e, 1)}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Large"
                defaultValue={editDefault?.prices[2]}
                onChange={(e) => changePrice(e, 2)}
              />
            </div>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Extra</label>
            <div className={styles.extra}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="text"
                placeholder="Item"
                name="text"
                onChange={handleExtraInput}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleExtraInput}
              />
              <button className={styles.extraButton} onClick={handleExtra}>
                Add
              </button>
            </div>
            <div className={styles.extraItems}>
              {extraOptions?.map((option) => (
                <p key={option.text}>
                  <span className={styles.extraItem}>{option.text}</span>
                  <span
                    className={styles.deleteExtra}
                    onClick={() =>
                      setExtraOptions(
                        extraOptions?.filter(
                          (extra) => extra.text !== option.text
                        )
                      )
                    }
                  >
                    X
                  </span>
                </p>
              ))}
            </div>
          </div>
          <button className={styles.addButton} onClick={handleCreate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPizza;
