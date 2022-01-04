const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy;
const User= require('../../modules/models/user.js');


passport.use(new LocalStrategy({
  usernameField: 'email'
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) return done(null, false, { error: 'User not found' })
    if (await user.checkPassword(password)) return done(null, user)
    return done(null, false, { error: 'Incorrect password' })
  } catch (e) {
    return done(e)
  }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await User.findOne({ _id })
      done(null, user)
    } catch (e) {
      done(e)
    }
  })



    // if (!user) {
    //   return done(null, false, { message: 'Incorrect username.' });
    // }
    // if (!user.validPassword(password)) {
    //   return done(null, false, { message: 'Incorrect password.' });
    // }
    // return done(null, user);