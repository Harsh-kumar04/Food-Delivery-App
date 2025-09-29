import db from "../../../../Database/models/index.js";
const { Cart, Menu } = db;

const addOrUpdateCart = async (data, user) => {
  const menuItem = await Menu.findOne({ where: { item_id: data.menu_id } });
  if (!menuItem) throw new Error("Menu item not found");

  let cart = await Cart.findOne({
    where: { user_id: user.id, status: "active" },
  });

  const newItem = {
    menu_id: menuItem.item_id,
    item_name: menuItem.item_name,
    quantity: data.quantity,
    price: menuItem.price,
  };

  if (!cart) {
    cart = await Cart.create({
      user_id: user.id,
      items: [newItem],
      total: newItem.quantity * newItem.price,
      status: "active",
    });
  } else {
    const items = cart.items ? JSON.parse(JSON.stringify(cart.items)) : [];
    const index = items.findIndex((i) => i.menu_id === newItem.menu_id);

    if (index > -1) {
      items[index].quantity += newItem.quantity;
    } else {
      items.push(newItem);
    }

    cart.setDataValue("items", items);
    cart.total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    await cart.save();
  }

  return cart;
};

const removeFromCart = async (menu_id, user) => {
  const cart = await Cart.findOne({
    where: { user_id: user.id, status: "active" },
  });
  if (!cart) throw new Error("Active cart not found");

  const items = cart.items ? JSON.parse(JSON.stringify(cart.items)) : [];
  const filtered = items.filter((i) => i.menu_id !== menu_id);

  cart.setDataValue("items", filtered);
  cart.total = filtered.reduce((sum, i) => sum + i.quantity * i.price, 0);
  await cart.save();

  return cart;
};

const updateCartItem = async (menu_id, quantity, user) => {
  if (quantity <= 0) throw new Error("Quantity must be greater than 0");

  const cart = await Cart.findOne({
    where: { user_id: user.id, status: "active" },
  });
  if (!cart) throw new Error("Active cart not found");

  const items = cart.items ? JSON.parse(JSON.stringify(cart.items)) : [];
  const index = items.findIndex((i) => i.menu_id == menu_id); // ✅ loose compare

  if (index === -1) throw new Error("Item not found in cart");

  items[index].quantity = quantity;
  cart.setDataValue("items", items);
  cart.total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  await cart.save();

  return cart;
};

const clearCart = async (user) => {
  const cart = await Cart.findOne({
    where: { user_id: user.id, status: "active" },
  });
  if (!cart) throw new Error("Active cart not found");

  cart.setDataValue("items", []);
  cart.total = 0;
  await cart.save();

  return cart;
};

// ✅ Export all functions
export default { addOrUpdateCart, removeFromCart, updateCartItem, clearCart };
