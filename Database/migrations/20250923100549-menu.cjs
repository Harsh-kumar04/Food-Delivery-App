"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menus", {
      item_id: {
        type: Sequelize.INTEGER,     // INTEGER hona chahiye
        primaryKey: true,
        autoIncrement: true,        // auto increment allowed only on integer
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "restaurants",
          key: "restaurant_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      item_name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING },
      price: { type: Sequelize.FLOAT, allowNull: false },
      category: { type: Sequelize.STRING },
      subcategory: { type: Sequelize.STRING },
      img_url: { type: Sequelize.STRING },
      is_available: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("menus");
  },
};
