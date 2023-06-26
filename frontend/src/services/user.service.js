import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

export const userService = {
  getRandomUser,
  query,
  login,
  saveLocalUser,
  getLoggedinUser,
  logout,
  signup,
  getEmptyCredentials,
};

const USER_KEY = "user_db";
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";
const gUser = {
  _id: "u101",
  name: "Red Hood",
  username: "red",
  balance: 100,
  transactions: [],
};
// console.log('gUser', gUser)

async function query() {
  return await storageService.query(USER_KEY);
}

function getRandomUser() {
  const users = utilService.loadFromStorage(USER_KEY);
  return users[utilService.getRandomIntInclusive(0, users.length - 1)];
}

async function login(userCred) {
  let user = null;
  console.log(userCred);
  const users = await storageService.query("user_db");
  if (users && users.length) {
    console.log(users);
    user = users.find((user) => user.username === userCred.username);
  }
  if (user) {
    return saveLocalUser(user);
  } else {
    signup(userCred);
  }
}

function saveLocalUser(user) {
  console.log(user)
  user = {...user}
    // _id: user._id,
    // name: user.name,
    // imgUrl: user.imgUrl,
    // username: user.username,
  
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

async function signup(userCred) {
//   userCred._id = utilService.makeId();
  userCred.balance = 100;
  userCred.transactions = [];
  userCred.name = userCred.name || userCred.username;
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  const user = await storageService.post("user_db", userCred);
  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function getEmptyCredentials() {
  return {
    name: "",
    username: "",
  }
}

function _createRandomUsers() {
  return utilService.getRandomNames().map((name) => {
    return _createRandomUser(name);
  });
}

function _createRandomUser(name) {
  return {
    _id: utilService.makeId(),
    fullname: name,
    imgUrl:
      "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    balance: 100,
  };
}

(() => {
  let users = utilService.loadFromStorage(USER_KEY) || [];
  if (!users.length) {
    users.push(gUser);
    utilService.saveToStorage(USER_KEY, users);
  }
  // console.log(users)
})();
