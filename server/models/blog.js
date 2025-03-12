const mongoose = require("mongoose") // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/002/383/719/original/trendy-abstract-minimalist-background-design-2604-free-vector.jpg",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

//Export the model
module.exports = mongoose.model("Blog", blogSchema)
