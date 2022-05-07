const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CrewMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    assigned: { type: Boolean, default: false },
    ship: { type: mongoose.Types.ObjectId, default: null },
  },
  { timestamps: true, toObject: { getters: true } }
);

module.exports = mongoose.model("crewMember", CrewMemberSchema);
