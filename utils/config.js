module.exports = {
    port: parseInt(process.env.PORT) || 3000,
    mongoUrl: process.env.MONGO_URL || 'mongodb+srv://admin:khan321@cluster0.mttqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  }