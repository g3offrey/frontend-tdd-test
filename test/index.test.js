import { getUserRating } from '../src/index';

// create a user with years an an active player
// games won, lost, draw
const createUser = (user = {}, games = {}) => {
  return Object.assign({
    username: 'drew',
    yearsActive: 0,
    membershipLevel: 'free', // bronze, silver, gold
  },
  user,
  {
    games: Object.assign({
      won: 0,
      lost: 0,
      draw: 0,
      forfeited: 0,
    }, games),
  });
}

describe('getUserRating', () => {
  it('should return 0 if the user has no games, yearsActive, and has free membership', () => {
    const user = createUser();

    expect(getUserRating(user)).toEqual(0);
  });

  it('a user should get 1 point for the first year active', () => {
    const user = createUser({
      yearsActive: 1,
    });

    expect(getUserRating(user)).toEqual(1);
  });

  // membership status
  it('should return 1 point for a user with a bronze membership', () => {
    const user = createUser({
      membershipLevel: 'bronze',
    });
     
    expect(getUserRating(user)).toEqual(1);
  });

  // games
  
  // new feature
  it.skip('give 1 extra point per 10 games played', () => {
    const user = createUser({}, {
      won: 3, // 9 points
      lost: 1, // -1 point 
      draw: 6, // + 6
    });
     
    expect(getUserRating(user)).toBe(24);
  });
});