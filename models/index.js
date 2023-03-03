const User = require('./User');
const Photo = require('./Photo');
const Message = require('./Message');
const Match = require('./Match');


User.hasMany(Photo, {
  foreignKey: 'userid',
});

Photo.belongsTo(User, {
  foreignKey: 'userid',
});



User.hasMany(Message, {
  foreignKey: 'userid',
});

Message.belongsTo(User, {
  foreignKey: 'userid',
});



User.hasMany(Match, {
  foreignKey: 'userid',
});

Match.belongsTo(User, {
  foreignKey: 'userid',
});




module.exports = {User, Message, Photo, Match};
