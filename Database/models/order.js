// Database/models/order_model.js
export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      items: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
      total: { type: DataTypes.FLOAT, allowNull: false },
      status: {
        type: DataTypes.ENUM("pending","confirmed","delivered","cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      restaurant_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: "orders",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Order;
};
