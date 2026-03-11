import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: [true, "Medicine is required"],
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
      trim: true,
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    instructions: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    isDispensed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const vitalSignsSchema = new mongoose.Schema(
  {
    bloodPressure: {
      systolic: { type: Number, min: 50, max: 250 },
      diastolic: { type: Number, min: 30, max: 150 },
    },
    temperature: {
      type: Number,
      min: 35,
      max: 42,
    },
    heartRate: {
      type: Number,
      min: 30,
      max: 200,
    },
    weight: {
      type: Number,
      min: 1,
      max: 300,
    },
    height: {
      type: Number,
      min: 30,
      max: 250,
    },
    bloodOxygen: {
      type: Number,
      min: 70,
      max: 100,
    },
  },
  { _id: false },
);

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
      index: true,
    },
    visitDate: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (date) {
          return date <= new Date();
        },
        message: "Visit date cannot be in the future",
      },
      index: true,
    },
    visitType: {
      type: String,
      enum: [
        "consultation",
        "follow-up",
        "emergency",
        "routine-check",
        "post-op",
      ],
      default: "consultation",
    },
    status: {
      type: String,
      enum: ["active", "resolved", "chronic", "referred", "admitted"],
      default: "active",
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],
    diagnosis: {
      type: String,
      trim: true,
    },
    icdCode: {
      type: String, // International Classification of Diseases code
      trim: true,
      uppercase: true,
    },
    prescription: [prescriptionSchema],
    vitalSigns: vitalSignsSchema,
    labTests: [
      {
        testName: String,
        result: String,
        date: Date,
        fileUrl: String, // For uploaded lab reports
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
    followUpDate: {
      type: Date,
      validate: {
        validator: function (date) {
          return !date || date > this.visitDate;
        },
        message: "Follow-up date must be after visit date",
      },
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema,
);
