const {Users} = require('./users');
const expect = require('expect');

describe('Users', () => {

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Blep',
      room: 'Fwaddap'
    }, {
      id: '2',
      name: 'Blap',
      room: 'Blaptastic'
    }, {
      id: '3',
      name: 'Chyea',
      room: 'Fwaddap'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var newUser = {
      id: '123456',
      name: 'Blep',
      room: 'Fwaddap'
    };

    expect(users.addUser(newUser.id, newUser.name, newUser.room)).toEqual(newUser);
    expect(users.users.length).toBeGreaterThan(0);
  });

  it('should remove a user', () => {
    var user = users.users[2];
    var removedUser = users.removeUser('3');

    expect(removedUser).toEqual(user);
    expect(users.users).toExclude(user);
  });

  it('should not remove a user', () => {
    expect(users.removeUser('#NOTMYRANGERS')).toNotExist();
    expect(users.users.length).toBe(3)
  });

  it('should find user', () => {
    expect(users.getUser('1')).toEqual(users.users[0]);
  });

  it('should not find user', () => {
    expect(users.getUser('#NOTMYRANGERS')).toNotExist();
  });

  it('should return names for a room', () => {
    var userList = users.getUserList('Fwaddap');
    expect(userList).toEqual(['Blep', 'Chyea']);
  });



});
