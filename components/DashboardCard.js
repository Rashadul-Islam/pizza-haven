import CountUp from "react-countup";
import styles from "../styles/DashboardCard.module.css";

const DashboardCard = ({ amount, text, dollar }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {dollar && "$ "}
        <CountUp end={amount} duration={2.75} />
      </h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default DashboardCard;
