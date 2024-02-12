const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema(
  {
    email: {
      type: String,
      // required: {
      //   values: true,
      //   message: 'You must enter an email address'
      // },
      required: [true, 'You must enter a password'],
      // The collection must be either new or recreated if you add unique: true
      unique: true,
      validate: {
        validator(val) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
        },
        message: 'Your email address is not formatted correctly'
      }
    },

    password: {
      type: String,
      required: [true, 'You must enter a password'],
      minLength: [6, 'Your password must be at least 6 characters in length'],
      select: false
    }
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }

  next();
});

userSchema.methods.validatePass = async function (formPassword) {
  const is_valid = await compare(formPassword, this.password);

  return is_valid;
}

userSchema.set('toJSON', {
  transform: (_, user) => {
    delete user.password;
    delete user.__v;
    return user;
  },
});

const User = model('User', userSchema);

module.exports = User;