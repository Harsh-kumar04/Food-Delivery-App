module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Restaurants", {
      restaurant_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING },
      phone_number: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, unique: true },
      opening_hours: { type: Sequelize.TIME },
      closing_hours: { type: Sequelize.TIME },
      status: {
        type: Sequelize.ENUM("active", "inactive", "closed"),
        defaultValue: "active",
      },
      review: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Restaurants");
  },
};
