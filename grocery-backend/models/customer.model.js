const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    personalDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
    },
    cart: {
      storeId: { type: mongoose.Schema.Types.ObjectId },
      products: [
        {
          id: { type: mongoose.Schema.Types.ObjectId },
          variantId: { type: mongoose.Schema.Types.ObjectId },
          name: { type: String, required: true },
          value: { type: String, required: true },
          price: { type: Number, required: false },
          quantity: { type: Number, required: false },
        },
      ],
      deliveryCharge: { type: Number, required: false },
    },
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
      },
    ],
    address: {
      type: { type: String, required: false },
      street: { type: String, required: false },
      landmark: { type: String, required: false },
      city: { type: String, required: false },
      pincode: { type: Number, required: false },
    },
  },
  {
    timestamps: true,
  }
);

const groceryDB = mongoose.connection.useDb("grocery_db");

const Customer = groceryDB.model("Customer", customerSchema);

module.exports = Customer;
