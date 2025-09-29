import { type } from "os";

// database/models/restaurant.js
export default (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      opening_hours: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      closing_hours: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "closed"),
        defaultValue: "active",
      },
      review: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  Restaurant.associate = (models) => {
    // ek restaurant ke multiple menu items honge
    Restaurant.hasMany(models.Menu, {
      foreignKey: "restaurant_id",
      as: "menus",
    });
  };

  return Restaurant;
};
