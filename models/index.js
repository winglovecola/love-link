const User = require('./User');
const Photo = require('./Photo');
const Message = require('./Message');
const Match = require('./Match');


User.hasMany(Photo, {
  foreignKey: 'user_id',
});

Photo.belongsTo(User, {
  foreignKey: 'user_id',
});



User.hasMany(Message, {
  foreignKey: 'user_id',
});

Message.belongsTo(User, {
  foreignKey: 'user_id',
});



User.hasMany(Match, {
  foreignKey: 'user_id',
});

Match.belongsTo(User, {
  foreignKey: 'user_id',
});




module.exports = {User, Message, Photo, Match};
