const Address = require('./Address');
const Avatar = require('./Avatar');
const Cart = require('./Cart');
const Cart_item = require('./Cart_item');
const Category = require('./Category');
const Coupon = require('./Coupon');
const Delivery = require('./Delivery');
const Image = require('./Image');
const Log = require('./Log');
const Payment = require('./Payment');
const Product = require('./Product');
const Review = require('./Review');
const Sale = require('./Sale');
const Sale_item = require('./Sale_item');
const Shipment = require('./Shipment');
const Stock = require('./Stock');
const User = require('./User');
const Wishlist = require('./Wishlist');

// User & Avatar | 1:N
User.hasMany(Avatar, { 
    foreignKey: 'idUser',
    as: 'avatarUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Avatar.belongsTo(User, { 
    foreignKey: 'idUser',
    as: 'userAvatar',
    allowNull: false
});

// User & Address | 1:N
User.hasMany(Address, { 
    foreignKey: 'idUser',
    as: 'addressUser',
    onDelete: 'CASCADE' 
});

Address.belongsTo(User, { 
    foreignKey: 'idUser',
    as: 'userAddress',
    allowNull: false
});

// User & Cart | 1:1
User.hasOne(Cart, { 
    foreignKey: 'idUser',
    as: 'cartUser',
    onDelete: 'CASCADE' 
});

Cart.belongsTo(User, { 
    foreignKey: 'idUser',
    as: 'userCart',
    allowNull: false
});

// Cart & Cart_item | 1:N
Cart.hasMany(Cart_item, { 
    foreignKey: 'idCart',
    as: 'cartItemCart',
    onDelete: 'CASCADE' 
});

Cart_item.belongsTo(Cart, { 
    foreignKey: 'idCart',
    as: 'cartCartItem',
    allowNull: false
});

// Product & Cart_item | 1:N
Product.hasMany(Cart_item, { 
    foreignKey: 'idProduct',
    as: 'cartItemProduct',
    onDelete: 'CASCADE' 
});

Cart_item.belongsTo(Product, { 
    foreignKey: 'idProduct',
    as: 'productCartItem',
    allowNull: false
});

// Category & Product | 1:N
Category.hasMany(Product, { 
    foreignKey: 'idCategory',
    as: 'productCategory',
    onDelete: 'SET NULL' 
});

Product.belongsTo(Category, { 
    foreignKey: 'idCategory',
    as: 'categoryProduct',
    allowNull: true
});

// Coupon & Sale | 1:N
Coupon.hasMany(Sale, { 
    foreignKey: 'idCoupon',
    as: 'saleCoupon',
    onDelete: 'SET NULL' 
});

Sale.belongsTo(Coupon, { 
    foreignKey: 'idCoupon',
    as: 'couponSale',
    allowNull: true
});

// User & Sale | 1:N
User.hasMany(Sale, { 
    foreignKey: 'idUser',
    as: 'saleUser',
    onDelete: 'CASCADE' 
});

Sale.belongsTo(User, { 
    foreignKey: 'idUser',
    as: 'userSale',
    allowNull: false
});

// Sale & Sale_item | 1:N
Sale.hasMany(Sale_item, { 
    foreignKey: 'idSale',
    as: 'saleItemSale',
    onDelete: 'CASCADE' 
});

Sale_item.belongsTo(Sale, {
    foreignKey: 'idSale',
    as: 'saleSaleItem',
    allowNull: false
});

// Product & Sale_item | 1:N
Product.hasMany(Sale_item, { 
    foreignKey: 'idProduct',
    as: 'saleItemProduct',
    onDelete: 'CASCADE' 
});

Sale_item.belongsTo(Product, {
    foreignKey: 'idProduct',
    as: 'productSaleItem',
    allowNull: false
});

// User & Wishlist | 1:N
User.hasMany(Wishlist, { 
    foreignKey: 'idUser',
    as: 'wishlistUser',
    onDelete: 'CASCADE' 
});

Wishlist.belongsTo(User, { 
    foreignKey: 'idUser',
    as: 'userWishlist',
    allowNull: false
});