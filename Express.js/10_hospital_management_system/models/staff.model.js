import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    fatherName: {
      type: String,
      required: [true, "Father\'s name is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    salary: {
      type: String,
      required: true,
    },
    governmentID: {
      type: String,
      maxLength: 15,
    },
    employeeId: {
      type: Number,
      required: [true, "Employee ID is required"],
      unique: true,
    },
    occupation: {
      type: String,
      required: [true, "Occupation is required"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department name for staff member is required"],
    },
    photo: {
      type: String,
      default: "./images/default-avatar.webp",
    },
    email: {
      type: String,
      required: [true, "Employee email is required"],
      unique: true,
      lowercase: true,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      unique: true,
      maxLength: 13,
    },
    qualification: {
      type: String,
      required: [true, "Employee Qualification is required"],
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export const Staff = mongoose.model("Staff", staffSchema);
