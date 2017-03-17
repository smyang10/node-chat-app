const expect = require('expect');

var {isRealString} = require('./validation');

describe('validation', () => {
  it('should reject non-string values', () => {
    var nonString = {name: 'fwaddap', age: 1100};
    expect(isRealString(nonString)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var spaceString= '              ';
    expect(isRealString(spaceString)).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var validString = '  fwaddap fwaddap  ';
    expect(isRealString(validString)).toBe(true);
  });
});
