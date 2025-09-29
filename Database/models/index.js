import Sequelize from "sequelize";
import { createRequire } from "module";

// Import Models
import UserModel from "./users.js";
import AddressModel from "./address.js";
import MenuModel from "./menu_items.js";
import RestaurantModel from "./restaurant.js";
import CartModel from "./cart.js";
import OrderModel from "./order.js";

const require = createRequire(import.meta.url);
const configFile = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// DB connection
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// DB object
const db = {};

// Models init
db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Address = AddressModel(sequelize, Sequelize.DataTypes);
db.Menu = MenuModel(sequelize, Sequelize.DataTypes);
db.Restaurant = RestaurantModel(sequelize, Sequelize.DataTypes);
db.Cart = CartModel(sequelize, Sequelize.DataTypes);
db.Order = OrderModel(sequelize, Sequelize.DataTypes);
// Associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync (avoid force true unless dev only)
sequelize
  .sync({ alter: false })
  .then(() => console.log(" Database synced"))
  .catch((err) => console.error(" Sync error:", err));

export default db;
