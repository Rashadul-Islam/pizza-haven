import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import Order from "../../../models/Order";
import moment from "moment";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const today = moment().format("YYYY-MM-DD");
      const week = moment().subtract(6, "days").format("YYYY-MM-DD");
      const products = await Product.countDocuments();
      const orders = await Order.aggregate([
        {
          $facet: {
            total: [{ $count: "total" }],
            totalSell: [
              {
                $group: {
                  _id: "null",
                  sum: { $sum: "$total" },
                },
              },
            ],
            todaySell: [
              {
                $match: {
                  $expr: { $eq: [{ $substr: ["$createdAt", 0, 10] }, today] },
                },
              },
              {
                $group: {
                  _id: "null",
                  sum: { $sum: "$total" },
                },
              },
            ],
            weekSellAmount: [
              { $unwind: "$products" },
              {
                $match: {
                  $expr: { $gte: [{ $substr: ["$createdAt", 0, 10] }, week] },
                },
              },
              {
                $group: {
                  _id: { $substr: ["$createdAt", 0, 10] },
                  sum: { $sum: "$total" },
                  quantity: { $sum: "$products.quantity" },
                },
              },
            ],
          },
        },
        { $unwind: "$total" },
        { $unwind: "$totalSell" },
        { $unwind: "$todaySell" },
        {
          $project: {
            orders: "$total.total",
            totalSell: "$totalSell.sum",
            todaySell: "$todaySell.sum",
            report: "$weekSellAmount",
          },
        },
      ]);
      res.status(200).json({ products: products, orders: orders });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
