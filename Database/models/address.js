export default (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("home", "office"), // address ka type
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Address;
};
