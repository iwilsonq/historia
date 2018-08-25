import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from './model'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, 'Invalid Credentials')
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err)
        }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, 'Invalid credentials.')
      })
    })
  })
)

function signup({ email, password, ctx }) {
  const user = new UserModel({ email, password })
  if (!email || !password) {
    throw new Error('You must provide an email and password.')
  }

  return UserModel.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email in use')
      }
      return user.save()
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        ctx.session.save(err => {
          if (err) {
            return reject(err)
          }

          resolve(user)
        })
      })
    })
}

function login({ email, password, ctx }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid credentials.')
      }

      ctx.session.save(err => {
        if (err) {
          return reject(err)
        }

        resolve(user)
      })
    })({ body: { email, password } })
  })
}

export { signup, login }
