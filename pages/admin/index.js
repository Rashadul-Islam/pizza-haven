import axios from "axios";
import DashboardCard from "../../components/DashboardCard";
import DashboardChart from "../../components/DashboardChart";
import styles from "../../styles/Admin.module.css";

const Index = ({ products, orders, totalSell, todaySell, report }) => {
  return (
    <div className={styles.dashContainer}>
      <div className={styles.wrapper}>
        <DashboardCard amount={products ? products : 0} text={"Total Pizza"} />
        <DashboardCard amount={orders ? orders : 0} text={"Total Order"} />
        <DashboardCard
          amount={todaySell ? todaySell : 0}
          text={"Sell Today"}
          dollar={true}
        />
        <DashboardCard
          amount={totalSell ? totalSell : 0}
          text={"Total Sell"}
          dollar={true}
        />
      </div>
      <div className={styles.wrapper}>
        <DashboardChart
          report={report}
          text="Last 7 days income"
          depends={true}
        />
        <DashboardChart
          report={report}
          text="Last 7 days sell"
          depends={false}
        />
      </div>
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

  const productRes = await axios.get("https://pizza-haven.herokuapp.com/api/dashboard");
  return {
    props: {
      products: productRes?.data?.products,
      orders: productRes?.data?.orders[0]?.orders,
      totalSell: productRes?.data?.orders[0]?.totalSell,
      todaySell: productRes?.data?.orders[0]?.todaySell,
      report: productRes?.data?.orders[0]?.report,
      show: true,
    },
  };
};

export default Index;
