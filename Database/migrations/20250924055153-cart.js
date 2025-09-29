"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("cart", {
    cart_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // your Users table name
        key: "id", // primary key of Users
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
      type: Sequelize.ENUM("active", "ordered", "cancelled"),
      allowNull: false,
      defaultValue: "active",
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("cart");
}
