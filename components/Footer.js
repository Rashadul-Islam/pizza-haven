import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Visit our restaurant and have our delicious pizza. Order now!!!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            Sector- 10, Road- 11
            <br /> Uttara, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            Sector- 01, Road- 08
            <br /> Mirpur, 85022
            <br /> (602) 867-1011
          </p>
          <p className={styles.text}>
            Sector- 05, Road- 03
            <br /> Gulshan, 85022
            <br /> (602) 867-1012
          </p>
          <p className={styles.text}>
            Sector- 09, Road- 07
            <br /> Motijheel, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
