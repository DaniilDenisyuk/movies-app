const testFilms = [
  {
    id: 0,
    title: "Star Wars",
    year: 1977,
    format: "Blu-Ray",
    stars:
      "Harrison Ford, Mark Hamill, Carrie Fisher, Alec Guinness, James Earl Jones",
  },
  {
    id: 1,
    title: " Raiders of the Lost Ark",
    year: 1981,
    format: "DVD",
    stars: "Harrison Ford, Karen Allen",
  },
];

const fakeUsers = [
  {
    id: 1,
    login: "user1",
    password: "user1",
  },
  {
    id: 2,
    login: "user2",
    password: "user2",
  },
  {
    id: 3,
    login: "user3",
    password: "user3",
  },
];

export const login = (login, password) => {
  for (const user of fakeUsers) {
    if (user.password === password && user.login === login) return user;
  }
  return false;
};
