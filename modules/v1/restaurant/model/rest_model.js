import db from "../../../../Database/models/index.js";

const Restaurant = db.Restaurant;
const User = db.User;

export const rest_model = {
  async add(decryptData, user) {
    try {
      // Check if user exists
      if (!user) throw new Error("User not found");

      // Copy email & phone from chef
      decryptData.email = user.email;
      decryptData.phone_number = user.phone;

      // Check duplicate email in restaurants
      const isEmailExist = await Restaurant.findOne({
        where: { email: decryptData.email },
      });
      if (isEmailExist) {
        throw new Error("Restaurant email already exists");
      }

      // Create restaurant
      const newRestaurant = await Restaurant.create(decryptData);

      // Update user's restaurant_id
      user.restaurant_id = newRestaurant.restaurant_id;
      await user.save();

      return newRestaurant;
    } catch (error) {
      throw error;
    }
  },
};
