// const Address = require('./Address');
const Avatar = require('./Avatar');
// const Cart = require('./Cart');
// const Cart_item = require('./Cart_item');
// const Category = require('./Category');
// const Coupon = require('./Coupon');
// const Delivery = require('./Delivery');
// const Image = require('./Image');
// const Log = require('./Log');
// const Payment = require('./Payment');
// const Product = require('./Product');
// const Review = require('./Review');
// const Sale = require('./Sale');
// const Sale_item = require('./Sale_item');
// const Shipment = require('./Shipment');
// const Stock = require('./Stock');
const User = require('./User');
// const Wishlist = require('./Wishlist');

// Avatar & User | 0:N
Avatar.hasMany(User, {
    as: 'userAvatar',
    foreignKey: 'avatar_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.belongsTo(Avatar, {
    as: 'avatarUser',
    foreignKey: 'avatar_id'
})

module.exports = { Avatar, User }