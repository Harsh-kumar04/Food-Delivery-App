"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      items: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("pending", "completed", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
