const router = require("express").Router();
const Users = require("./user-model");
const restrictedMiddleware = require("../auth/restricted-middleware");

router.get("/", restrictedMiddleware, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
