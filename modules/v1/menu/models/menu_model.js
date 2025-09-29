import db from "../../../../Database/models/index.js";
const Restaurant = db.Restaurant;
const Menu = db.Menu;

export const menu_model = {
  async additem(decryptData, user) {
    if (!user) throw new Error("User not found");
    if (!decryptData.restaurant_id)
      throw new Error("Restaurant ID is required");

    const restaurant = await Restaurant.findByPk(decryptData.restaurant_id);
    if (!restaurant) throw new Error("Restaurant not found");

    return await Menu.create(decryptData);
  },

  async getitems(restaurant_id) {
    const where = restaurant_id ? { restaurant_id } : {};
    return await Menu.findAll({ where });
  },

  async updateitem(id, updateData, user) {
    const item = await Menu.findByPk(id);
    if (!item) throw new Error("Menu item not found");

    // Optional: only allow owner to update
    await item.update(updateData);
    return item;
  },

  async deleteitem(id, user) {
    const item = await Menu.findByPk(id);
    if (!item) throw new Error("Menu item not found");

    await item.destroy();
    return true;
  },
};
