const mainRoutes = require("./mainRoutes")
module.exports = function (router) {
  router.use("/main", mainRoutes());
  return router;
};
