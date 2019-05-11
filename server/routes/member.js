var express = require('express');
var router = express.Router();

// Import Dependencies.
const cors = require('cors');
const db = require('../db/db_conf');
const Member = require('../db/models/Member');
const Vacation = require('../db/models/Vacation');
const FollowedVac = require('../db/models/FollowedVac');

router.use(cors());

db.sequelize.sync();

router.get("/", async (req, res) => {
  Member.findAll({})
    .then(members => {
      res.json(members);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.post("/login", async (req, res) => {

  console.log(req.body);
  const client = req.body;

  if (client.user === '' || client.pass === '') {
    res.json({ formMsg: 'Fill all the inputs' });
  }

  if (client.user == 'demo' && client.pass == 'demo') {

    Member.findAll({ where: { user: client.user, pass: client.pass } })
      .then(admin => {
        req.session.userID = admin[0].dataValues.id;
        req.session.firstName = admin[0].dataValues.firstName;
        req.session.isAdmin = admin[0].dataValues.isAdmin;
        req.session.isLogged = true;
        res.json({ session: req.session });
      })
      .catch(err => {
        res.json({ formMsg: 'There use error while logged by demo' + err });
      });

  } else {

    Member.findAll({ where: { user: client.user, pass: client.pass } })
      .then(regUser => {
        console.log(regUser.length)
        if (regUser.length > 0) {
          req.session.userID = regUser[0].dataValues.id;
          req.session.firstName = regUser[0].dataValues.firstName;
          req.session.isAdmin = regUser[0].dataValues.isAdmin;
          req.session.isLogged = true;
          res.json({ session: req.session });
        } else {
          res.json({ formMsg: 'No User' });
        }
      })
      .catch(err => {
        console.log(err);
      });

  }

});

router.post('/register', (req, res) => {

  let userData = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    user: req.body.username,
    pass: req.body.password,
    isAdmin: 'false',
    massge: '',
  }

  Member.create(userData)
    .then(member => {
      console.log(member)
      req.session.userID = member.dataValues.id;
      req.session.firstName = member.dataValues.firstName;
      req.session.msg = 'PASSED';
      req.session.isLogged = true;
      req.session.isAdmin = member.dataValues.isAdmin;;
      console.log(req.session)
      res.json({session:req.session});
    })
    .catch(err => {
      req.session.isLogged = false;
      req.session.msg = 'ERROR';
      req.session.user = req.body.username;
      res.json({session: req.session});
      console.log(err);
    })


});

router.get('/session', (req, res) => {
  if (req.session.isAdmin) {
    res.json(req.session);
  }
});

router.get("/logout", async (req, res) => {
  console.log(req.session)
  req.session.destroy();
  console.log(req.session)
  res.json({ msg: "GoodBye, you logged out succesfuly" });
})

module.exports = router;
