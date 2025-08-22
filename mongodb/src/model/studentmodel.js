import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    stack: {
      type: String,
      enum: ["Backend", "Frontend", "Data Analysis", "UI/UX", "Mobile dev"],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 11,
    },
  },
  { timestamps: true }
);

const studentmodel = mongoose.model("student", studentSchema);
export { studentmodel };
