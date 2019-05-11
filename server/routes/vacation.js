var express = require('express');
var router = express.Router();
var fs = require('fs');

// Import Dependencies.
const cors = require('cors');
const db = require('../db/db_conf');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Member = require('../db/models/Member');
const Vacation = require('../db/models/Vacation');
const FollowedVac = require('../db/models/FollowedVac');
const socketconf = require('../socket.io/socket_conf');

router.use(cors());
db.sequelize.sync();


router.get('/', async (req, res) => {

  let currentUserID = req.query.currentUserID;

  if (currentUserID == 0) {
    Vacation.findAll({})
      .then(data => {
        res.json(data)
      })
      .catch(err => console.log(err))
  } else {
    FollowedVac.findAll({ where: { memberid: currentUserID } })
      .then(userVac => {
        let userVacID = [];
        let userFollowedVac = {}

        userVac.forEach(vac => {
          userVacID.push(vac.dataValues.vacationid)
        });
        if (userVacID) {
          Vacation.findAll({ where: { id: { [Op.in]: userVacID } } })
            .then(userYesFollow => {
              userFollowedVac.yesfollow = userYesFollow;

              Vacation.findAll({
                where: { id: { [Op.notIn]: userVacID } }
              })
                .then(userNoFollow => {
                  userFollowedVac.nofollow = userNoFollow;
                  res.json(userFollowedVac)
                })
                .catch(err => {
                  console.log(err);
                  res.json({ err: err })
                })

            })
            .catch(err => {
              console.log(err);
              res.json({ err: err })
            })
        } else {
          Vacation.findAll({})
            .then(response => {
              userFollowedVac.nofollow = response;
              res.json(userFollowedVac)
            })
        }
      })
      .catch(err => {
        console.log(err);
        res.json(err)
      })

  }

});

router.post('/add', async (req, res) => {

  const vac = req.body;

  let vacDetails = {
    description: vac.description,
    destination: vac.destination,
    picture: vac.picture,
    fromdate: vac.fromdate,
    todate: vac.todate,
    price: vac.price
  }

  Vacation.create(vacDetails)
    .then(data => {
      Vacation.findAll({})
        .then(allVac => {
          let vacations = new Array;
          vacations.push(allVac);
          res.json({ allVac: vacations })
          socketconf.sendMessgae('vacationsChange')
        })
        .catch(err => res.json({ err: 'Error while try to get newAllVacations' }))
    })
    .catch(err => {
      res.json({ err: 'Cant add the vacation.' })
      console.log(err)
    })


});

router.get('/allvac', async (req, res) => {
  Vacation.findAll({})
    .then(data => {
      res.json(data)
      socketconf.sendMessgae('vacationsChange')
    })
});

router.post('/follow', async (req, res) => {

  console.log(req.body)
  let followedObj = {
    memberid: req.body.memberid,
    vacationid: req.body.vacationid,
    followers: (req.body.followers)
  }

  FollowedVac.create(followedObj)
    .then(data => {
      Vacation.update(
        { followers: Sequelize.literal('followers + 1') },
        { where: { id: followedObj.vacationid } }
      )
        .then(data => {
          console.log(data)
          socketconf.sendMessgae('vacationsChange')
        })
        .catch(err => console.log(err));
      console.log(data.dataValues)
    })
    .catch(err => console.log(err))


});

router.post('/unfollow', async (req, res) => {

  console.log(req.body)
  let unfollowedObj = {
    memberid: req.body.memberid,
    vacationid: req.body.vacationid,
    followers: (req.body.followers)
  }

  FollowedVac.destroy({
    where: { memberid: unfollowedObj.memberid, vacationid: unfollowedObj.vacationid }
  })
    .then(data => {
      console.log(data)

    })
    .catch(err => console.log(err));

  Vacation.update(
    { followers: Sequelize.literal('followers - 1') },
    { where: { id: unfollowedObj.vacationid } })
    .then(data => {
      console.log(data);
      socketconf.sendMessgae('vacationsChange')
    })
    .catch(err => console.log(err));


});

router.post('/update', async (req, res) => {

    let obj = {
      description: req.body.description,
      destination: req.body.destination,
      picture: req.body.picture,
      fromdate: req.body.fromdate,
      todate: req.body.todate,
      price: req.body.price,
    }

  await Vacation.update(obj, {
    where: {
      id: req.body.id
    }
  })
  .then( data => {
    console.log(data);
    res.json({msg: 'SUCSESS'});
    socketconf.sendMessgae('vacationsChange')
  })
  .catch(err => console.log(err));

  

});

router.post('/del', async (req, res) => {

  let delVacObj = {
    id: req.body.vacationid
  }

  Vacation.destroy({
    where: { id: delVacObj.id }
  })
    .then(data => {
      Vacation.findAll({})
        .then(data => {

        })
    }
    )
    .catch(err => console.log(err));

});

module.exports = router;
