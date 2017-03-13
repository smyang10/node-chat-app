const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Test Suite';
    var text = 'This is a test';
    var res = generateMessage(from, text);

    expect(res).toInclude({
      from,
      text
    });
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Test Suite';
    var lat = '34.0522';
    var long = '-118.243683';

    var res = generateLocationMessage(from, lat, long);

    expect(res).toInclude({
      from,
      url: `https://google.com/maps?q=${lat},${long}`
    });
    expect(res.createdAt).toBeA('number');
  });
});
