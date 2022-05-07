const MotherShip = require("../model/motherShip");
const Ship = require("../model/ship");
const Crew = require("../model/crewMember");

/**
 *
 * @param {String} name
 * @returns String
 * Name of the mother ship to created
 */
const createMotherShip = async (name) => {
  try {
    if (!name) throw new Error("no name passed");

    const mShip = new MotherShip({ name });
    for (let x = 0; x < 3; x++) {
      const shipName = (Math.random() + 1).toString(36).substring(7);
      const ship = new Ship({ motherShip: mShip._id, name: shipName });

      mShip.ships.push(ship._id);
      mShip.numberOfShips += 1;

      for (let index = 0; index < 3; index++) {
        let crewName = (Math.random() + 1).toString(36).substring(7);
        let crew = await Crew.create({
          name: crewName,
          assigned: true,
          ship: ship._id,
        });
        ship.crew.push(crew._id);
        ship.numberOfCrew += 1;
      }

      await ship.save();
    }

    await mShip.save();
    return "Mother ship created successfully"
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {ObjectId} motherShipId
 * @param {Number} number
 * @returns String
 * ID of the mother ship
 * The number of ships to be added to the mother ship
 */
const addShip = async (motherShipId, number) => {
  try {
    if (!motherShipId) throw new Error("motherShip id not passed");
    const motherShip = await MotherShip.findById({ _id: motherShipId });
    let totalShip = Number(motherShip.numberOfShips) + Number(number);

    if (totalShip > 9) {
      return "The number of ships exceed limit";
    }

    for (let index = 0; index < number; index++) {
      const shipName = (Math.random() + 1).toString(36).substring(7);
      const ship = new Ship({ motherShip: motherShipId, name: shipName });
      for (let x = 0; x < 3; x++) {
        let crewName = (Math.random() + 1).toString(36).substring(7);
        let crew = await Crew.create({
          name: crewName,
          assigned: true,
          ship: ship._id,
        });
        ship.crew.push(crew._id);
        ship.numberOfCrew += 1;
      }
      motherShip.ships.push(ship._id);
      motherShip.numberOfShips += 1;

      await ship.save();
      await motherShip.save();
    }

    return "ship created successfully";
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {ObjectId} ShipId
 * @returns String
 * ID of the ship that is been removed from the mothership
 */
const removeAShip = async (ShipId) => {
  try {
    const ship = await Ship.findById(ShipId);

    if (ship === null) throw new Error("Ship does not exist");
 
    const motherShip = await MotherShip.findOne({ ships: { $in: [ShipId] } });

    const index = motherShip.ships.indexOf(ShipId);
    motherShip.ships.splice(index, 1);
    motherShip.numberOfShips -= 1;

    await motherShip.save();
    await Ship.findByIdAndRemove(ShipId);
    await Crew.deleteMany({ ship: ShipId });

    return "Ship deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {String} name
 * @param {ObjectId} shipId
 * @returns String
 * Name of the crew to be joining the ship
 * ID of the ship crew will be joining
 */
const addCrewToShip = async (name, shipId) => {
  try {
    if (!name) throw new Error("no name passed");
    if (!shipId) throw new Error("no shipId passed");

    const crew = await Crew.findOne({ name });
    const ship = await Ship.findById(shipId);
    if (ship.numberOfCrew >= 5) {
      return "Ship is filled up";
    }

    if (crew.assigned) {
      return "Crew member is already added to a ship";
    }

    ship.crew.push(crew._id);
    ship.numberOfCrew += 1;
    crew.assigned = true;
    crew.ship = ship._id;

    await ship.save();
    await crew.save();

    return "crew added successfully";
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {ObjectId} from_ship ID
 * @param {ObjectId} to_ship ID
 * @param {String} crew name
 * ID of the ship the crew is leaving
 * ID of the ship the crew is joining
 * Name of the crew member
 *
 */
const switchCrew = async (from_ship, to_ship, name) => {
  try {
    if (!from_ship) throw new Error("no from_ship id passed");
    if (!to_ship) throw new Error("no to_ship id passed");
    const crewMember = await Crew.findOne({ name });
    const from_Ship = await Ship.findById(from_ship);
    const to_Ship = await Ship.findById(to_ship);

    if (!crewMember || crewMember == null)
     {
      return "Crew member does not exist";
    }

    if (from_Ship == null) {
      return "From_ship does not exist";
    }

    if (to_Ship == null) {
      return "To_ship does not exist";
    }

    if (to_Ship.numberOfCrew == 5) {
      return "Ship is filled up";
    }
    const index = from_Ship.crew.indexOf(crewMember._id);
    if (index == -1) {
      return "Crew does not exist in the ship";
    }

    from_Ship.crew.splice(index, 1);
    to_Ship.crew.push(crewMember._id);
    to_Ship.numberOfCrew += 1;
    from_Ship.numberOfCrew -= 1;
    await from_Ship.save();
    await to_Ship.save();
    await Crew.findOneAndUpdate({ name: name }, { ship: to_ship });
    return "Crew switched successfully";
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {String} name
 * name of the crew member to created
 */
const createCrew = async (name) => {
  try {
    if (!name) throw new Error("no name passed");
    let checkName = await Crew.findOne({name})
    if(checkName) throw new Error("Crew already exists")
    await Crew.create({ name });
    return "crew created successfully ";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createMotherShip,
  addShip,
  removeAShip,
  addCrewToShip,
  switchCrew,
  createCrew,
};
