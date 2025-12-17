import mongoose from "mongoose";

// ----------------------
// Domain Schema
// ----------------------
const DomainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    durationInMonths: { type: Number, required: true },
    defaultTasks: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Domain = mongoose.model("Domain", DomainSchema);

// ----------------------
// User Schema
// ----------------------
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["student", "admin"], default: "student" },

    resume: {
      data: Buffer,
      contentType: String,
    },

    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "not-applied"],
      default: "not-applied",
    },

    activeInternship: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },

    certificationStatus: {
      type: String,
      enum: ["not-registered", "in-progress", "certified", "failed"],
      default: "not-registered",
    },

    domain: { type: mongoose.Schema.Types.ObjectId, ref: "Domain" },
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],

    internshipApproved: { type: Boolean, default: false },
    internshipStartDate: { type: Date },
    internshipEndDate: { type: Date },

    currentInternship: {
      domain: { type: mongoose.Schema.Types.ObjectId, ref: "Domain" },
      startedOn: { type: Date },
      endOn: { type: Date },
      status: {
        type: String,
        enum: ["active", "completed"],
        default: "active",
      },
    },

    // 🕒 Track multiple past internships
    pastInternships: [
      {
        domainName: { type: String, required: true }, // store domain name directly
        certificationStatus: {
          type: String,
          enum: ["passed", "failed", "pending"],
          default: "pending",
        },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

// const Internship = mongoose.model("Internship", InternshipSchema);

// ----------------------
// Task Schema
// ----------------------
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    domain: { type: mongoose.Schema.Types.ObjectId, ref: "Domain" },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

// ----------------------
// Project Schema
// ----------------------
const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    repoLink: { type: String, required: true },
    deployLink: { type: String },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

const TaskSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    submissionLink: { type: String, required: true },
    status: {
      type: String,
      enum: ["not-submitted", "submitted"],
      default: "not-submitted",
    },
  },
  { timestamps: true }
);

// Ensure a student can only submit a specific task once
TaskSubmissionSchema.index({ student: 1, task: 1 }, { unique: true });

const TaskSubmission = mongoose.model("TaskSubmission", TaskSubmissionSchema);

export { User, Domain, Task, Project, TaskSubmission };
