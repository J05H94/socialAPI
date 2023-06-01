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
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    thoughts: [
      // arr of _id values refrencing the Thought model
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      // arr of _id values refrencing the User model (self-reference)
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// friendCount
// .virtual('firendCount')
// .get(function () {
//   return `${friends.length}`
// })
// .set(function(v){
//   const totalFriends = v[0]
//   this.set({ totalFriends })
// })

const User = model('user', userSchema);

module.exports = User;