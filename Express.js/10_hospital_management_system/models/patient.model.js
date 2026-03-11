import mongoose from "mongoose";
const patientMedicationSchema = new mongoose.Schema(
  {
    medicine: {
      // Fixed: Changed from medicineName to medicine
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dosage: String, // Added: Important for medication
    frequency: String, // Added: e.g., "twice daily"
  },
  { _id: false }, // Removed timestamps from subdocument
);

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    governmentID: {
      type: String,
      maxLength: 15,
      trim: true,
    },

    photo: {
      type: String,
      default: "./images/default-avatar.webp",
    },
    email: {
      type: String,
      required: [true, "Patient email is required"], // Fixed: Changed message
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      unique: true,
    },
    // CHANGED: From single doctor to primary doctor (optional)
    primaryDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    // CHANGED: From single disease to multiple conditions
    medicalConditions: [
      {
        type: String,
        trim: true,
      },
    ],
    medication: [patientMedicationSchema], // Fixed schema reference

    // Added essential fields
    phone: {
      // Added: Regular phone number
      type: String,
      required: [true, "Phone number is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"],
    },
  },
  { timestamps: true },
);

export const Patient = mongoose.model("Patient", patientSchema);
