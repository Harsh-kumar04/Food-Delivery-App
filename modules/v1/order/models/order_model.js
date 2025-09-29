import db from "../../../../Database/models/index.js";
const { Cart, Menu, User } = db;

const createOrder = async (user) => {
  // 1️⃣ Find active cart
  const cart = await Cart.findOne({
    where: { user_id: user.id, status: "active" },
  });
  if (!cart || !cart.items.length) throw new Error("Cart is empty");

  // 2️⃣ Create order object
  const order = await db.Order.create({
    user_id: user.id,
    items: cart.items,             // JSON array
    total: cart.total,
    status: "pending",             // ENUM: pending, confirmed, delivered, cancelled
  });

  // 3️⃣ Clear cart
  cart.items = [];
  cart.total = 0;
  cart.status = "ordered";         // mark cart as ordered
  await cart.save();

  return order;
};

const getUserOrders = async (user) => {
  const orders = await db.Order.findAll({
    where: { user_id: user.id },
    order: [["created_at", "DESC"]],
  });
  return orders;
};

export default { createOrder, getUserOrders };
