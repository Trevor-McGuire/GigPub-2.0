
const User = require("./User"),
  Review = require("./Review");

User.hasMany(Review, {
  foreignKey: 'id',
});

Review.belongsTo(User, {
  foreignKey: 'id',
});

module.exports = { User, Review };
