const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
    },
    thoughts: {
      // arr of _id values refrencing the Thought model
    },
    friends: {
      // arr of _id values refrencing the User model (self-reference)
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;