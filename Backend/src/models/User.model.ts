import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  username: {
    type: String,
    unique: true,
    
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"], 
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    default: "user",
  },
  },
  { timestamps: true }
);

userSchema.pre("save",async function () {
  if (!this.firstname || !this.lastname) {
    return;
  }

  // Capitalize first letter
  const capitalize = (str: string) =>
    str
      .split(" ")
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

  const first = capitalize(this.firstname);
  const last = capitalize(this.lastname);

  this.username = `${first} ${last}`;
});


export default mongoose.model("User", userSchema, "Users");
