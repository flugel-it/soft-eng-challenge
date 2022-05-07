const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShipSchema = new Schema(
  {
    name: { type: String, required: true },
    motherShip: {
      type: mongoose.Types.ObjectId,
      ref: "motherShip",
      required: true,
    },
    crew: [{ type: mongoose.Types.ObjectId, ref: "crewMember", default: [] }],
    numberOfCrew: { type: Number, max: 5, default: 0 },
  },
  { timestamps: true, toObject: { getters: true } }
);

module.exports = mongoose.model("ship", ShipSchema);
