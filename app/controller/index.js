const {
  createMotherShip,
  addCrewToShip,
  switchCrew,
  removeAShip,
  addShip,
  createCrew,
} = require("../service");

const createMotherShipCtl = async (req, res, next) => {
  try {
    const result = await createMotherShip(req.body.name);
    res.status(201).send({ message: result });
  } catch (error) {
    next(error)
  }
};

const addCrewToShipCtl = async (req, res, next) => {
  try {
    const result = await addCrewToShip(req.body.name, req.body.shipId);
    res.status(200).send({ message: result });
  } catch (error) {
    next(error)
  }
};

const switchCrewCtl = async (req, res, next) => {
  try {
    const result = await switchCrew(
      req.body.from_ship,
      req.body.to_ship,
      req.body.crewName
    );
    res.status(200).send({ message: result });
  } catch (error) {
    next(error)
  }
};

const removeAShipCtl = async (req, res, next) => {
  try {
    const result = await removeAShip(req.body.shipId);
    res.status(200).send({ message: result });
  } catch (error) {
    next(error)
  }
};

const addShipCtl = async (req, res, next) => {
  try {
    const result = await addShip(req.body.motherShipId, req.body.numberOfShips);
    res.status(200).send({ message: result });
  } catch (error) {
    next(error)
  }
};

const createCrewCtl = async (req, res, next) => {
  try {
    const result = await createCrew(req.body.crewName);
    res.status(201).send({ message: result });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  createMotherShipCtl,
  addCrewToShipCtl,
  switchCrewCtl,
  removeAShipCtl,
  addShipCtl,
  createCrewCtl,
};
