// database/models/users.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    social_id: { type: DataTypes.STRING, allowNull: true }, // social_id optional
    role: { type: DataTypes.STRING, allowNull: false },
    restaurant_id: { type: DataTypes.INTEGER, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true }, // STRING better for phone
    otp: { type: DataTypes.INTEGER, allowNull: true },
    bio: { type: DataTypes.STRING, allowNull: true },
    token: { type: DataTypes.STRING, allowNull: true },
  });

  // Associations set karne ke liye ek function
  User.associate = (models) => {
    User.hasMany(models.Address, { foreignKey: "userId", as: "addresses" });
  };

  return User;
};
