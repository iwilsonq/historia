import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  password: String,
  gamesEnjoyed: [String],
  favoriteGame: String
})

UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

export default mongoose.model('User', UserSchema)
