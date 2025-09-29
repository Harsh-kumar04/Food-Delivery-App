export default (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ✅ correct
      },
      restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
      item_name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      price: { type: DataTypes.FLOAT, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: true },
      subcategory: { type: DataTypes.STRING, allowNull: true },
      img_url: { type: DataTypes.STRING, allowNull: true },
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    { timestamps: true, underscored: true }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant, {
      foreignKey: "restaurant_id",
      as: "restaurant",
    });
  };

  return Menu;
};
