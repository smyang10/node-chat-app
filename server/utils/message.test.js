const expect = require('expect');

var {generateMessage} = require('./message');

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
