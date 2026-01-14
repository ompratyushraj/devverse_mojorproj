import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Define the sub-document for favorite courses
interface IFavouriteCourse {
  course: mongoose.Types.ObjectId;
  poster: string;
}

// Define the User document interface with method typings
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  file: {
    public_id: string;//internal structure defines all route 
    url: string;
  };
  role: "user" | "admin";
  googleId: string;
  bio:string
  authMethod: "local" | "google";
  FavouriteCourse: IFavouriteCourse[];
  createdAt: Date;
  getJWTToken: () => string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  comparePassword: (password: string) => Promise<boolean>;
  getResetToken: () => string;
}

// User Schema definition
const schema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, 
      // required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true

    },
    authMethod: {
      type: String,
      enum: ['local', 'google'],
      required: true,
      default: "local"
    },
    bio:{
      type:String,
      required:false,
    }
,
    file: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    FavouriteCourse: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        poster: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password if modified
schema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to generate JWT token
schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });
};

// Method to compare passwords
schema.methods.comparePassword = async function (password: string): Promise<boolean> {
  console.log(password,this.password)
  return await bcrypt.compare(password, this.password);
};

// Method to generate a password reset token
schema.methods.getResetToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

  return resetToken;
};

// Export the User model
export const User = mongoose.model<IUser>("User", schema);
