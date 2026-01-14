import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [5, "title must of length of 5 characters"],
    },
   
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [5, "description must of length of 5 characters"],
    },
    author: {
        type: String,
        required: [true, "author is required"],
      },
      file: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    

    pdfs: [
      {
        title: {
          type: String,
          required: [true, "title is required"],
        },
        description: {
          type: String,
          required: [true, "description is required"],
        },
        documentArray: {
         
          ImageName: {
            type: String,
            required: true,
          },
          imageUrl:{
            type:String,
          }
        },
      },
    ],

    NumberOfDownloads: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
  },
  {
    timestamps: true,
  }
);
export const Course = mongoose.model("Course", schema);
