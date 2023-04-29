const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');
const mongoConnect=require('./util/database').mongoConnect
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes=require('./routes/auth')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('644948d10ac6187ed989c221')
    .then(user => {
      console.log(user)
      req.user =user
      next();
    })
    .catch(err => console.log(err));
 
});


app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

mongoose.connect('mongodb+srv://ashutoshballawar:ashutoshballawar@cluster0.cxidpz2.mongodb.net/shop?retryWrites=true&w=majority').then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        name:'Max',
        email:'max@test.com',
        cart:{
          items:[]
        }
       })
      user.save();
    }
  })



app.listen(3000)
}).catch(err=>{
  console.log(err)
})
