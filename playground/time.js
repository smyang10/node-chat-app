const moment = require('moment');

var date = moment();

console.log(date);
console.log(date.format('MMM Mo, Y'));

var blep = date.add(100, 'year').subtract(9, 'months');

console.log(blep);


var challengeDate = moment(1489464256813);

console.log(date.valueOf());
