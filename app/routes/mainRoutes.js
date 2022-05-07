const {
    createCrewCtl,
    createMotherShipCtl,
    addCrewToShipCtl,
    addShipCtl,
    switchCrewCtl,
    removeAShipCtl,
  } = require("../controller/index");
const router = require('express').Router();
module.exports = function(){
    router.post('/create-mothershop' ,createMotherShipCtl);
    router.post('/create-crew' ,createCrewCtl);
    router.post('/add-crew-to-ship' ,addCrewToShipCtl);
    router.post('/add-ship' ,addShipCtl);
    router.delete('/remove-ship' ,removeAShipCtl);
    router.put('/switch-crew' ,switchCrewCtl);

    return router;
}