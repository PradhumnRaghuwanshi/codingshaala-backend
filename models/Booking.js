import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Course",
    //   required: true
    // },
    course: {
      type: String,
      default: "Javascript Live Classes"
    },
    bookingDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid"
    },
    paymentDetails: {
      orderId: String,
      paymentId: String,
      amount: Number,
      method: String,
      paidAt: Date
    },
    contactNumber: {
      type: String,
      required: true
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
