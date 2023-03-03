const { Match } = require('../models');
//const sequelize = require('../config/connection');
const matchData = [
  // Start of Male Users List
  {
    userid: 1,
    match_id: 61,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 62,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 70,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 71,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 72,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 73,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 74,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 1,
    match_id: 81,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 61,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 62,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 70,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 71,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 72,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 73,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 74,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 75,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 76,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 77,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 78,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 79,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  },
  {
    userid: 80,
    match_id: 1,
    created_time: Date.now(),
    updated_time: Date.now(),
  }
];

async function seedMatches () {
  //await sequelize.sync({ force: true });
  Match.bulkCreate(matchData);
}


seedMatches ();
//module.exports = seedMatch;
