const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MotherShipSchema = new Schema(
  {
    name: { type: String, required: true },
    numberOfShips: { type: Number, max: 9, default: 0 },
    ships: [{ type: mongoose.Types.ObjectId, ref: 'ship' }]
  },
  { timestamps: true, toObject: { getters: true } }
);

module.exports = mongoose.model("motherShip", MotherShipSchema);
