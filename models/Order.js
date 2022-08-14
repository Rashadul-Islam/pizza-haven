import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: {
          type: Number,
          required: true,
        },
        extras: [
          {
            type: String,
            default: "none",
            required: true,
          },
        ],
      },
    ],
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
