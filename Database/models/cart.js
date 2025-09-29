export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      items: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("active", "ordered", "cancelled"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      tableName: "cart",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Cart; // <-- Return the model instead of trying another export
};
