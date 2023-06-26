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
  transferFunds,
};

const USER_KEY = "user_db";
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

const contacts = [
  {
    _id: "5a56640269f443a5d64b32ca",
    name: "Ochoa Hyde",
    email: "ochoahyde@renovize.com",
    phone: "+1 (968) 593-3824",
  },
  {
    _id: "5a5664025f6ae9aa24a99fde",
    name: "Hallie Mclean",
    email: "halliemclean@renovize.com",
    phone: "+1 (948) 464-2888",
  },
  {
    _id: "5a56640252d6acddd183d319",
    name: "Parsons Norris",
    email: "parsonsnorris@renovize.com",
    phone: "+1 (958) 502-3495",
  },
  {
    _id: "5a566402ed1cf349f0b47b4d",
    name: "Rachel Lowe",
    email: "rachellowe@renovize.com",
    phone: "+1 (911) 475-2312",
  },
  {
    _id: "5a566402abce24c6bfe4699d",
    name: "Dominique Soto",
    email: "dominiquesoto@renovize.com",
    phone: "+1 (807) 551-3258",
  },
  {
    _id: "5a566402a6499c1d4da9220a",
    name: "Shana Pope",
    email: "shanapope@renovize.com",
    phone: "+1 (970) 527-3082",
  },
  {
    _id: "5a566402f90ae30e97f990db",
    name: "Faulkner Flores",
    email: "faulknerflores@renovize.com",
    phone: "+1 (952) 501-2678",
  },
  {
    _id: "5a5664027bae84ef280ffbdf",
    name: "Holder Bean",
    email: "holderbean@renovize.com",
    phone: "+1 (989) 503-2663",
  },
  {
    _id: "5a566402e3b846c5f6aec652",
    name: "Rosanne Shelton",
    email: "rosanneshelton@renovize.com",
    phone: "+1 (968) 454-3851",
  },
  {
    _id: "5a56640272c7dcdf59c3d411",
    name: "Pamela Nolan",
    email: "pamelanolan@renovize.com",
    phone: "+1 (986) 545-2166",
  },
  {
    _id: "5a5664029a8dd82a6178b15f",
    name: "Roy Cantu",
    email: "roycantu@renovize.com",
    phone: "+1 (929) 571-2295",
  },
  {
    _id: "5a5664028c096d08eeb13a8a",
    name: "Ollie Christian",
    email: "olliechristian@renovize.com",
    phone: "+1 (977) 419-3550",
  },
  {
    _id: "5a5664026c53582bb9ebe9d1",
    name: "Nguyen Walls",
    email: "nguyenwalls@renovize.com",
    phone: "+1 (963) 471-3181",
  },
  {
    _id: "5a56640298ab77236845b82b",

    name: "Glenna Santana",
    email: "glennasantana@renovize.com",
    phone: "+1 (860) 467-2376",
  },
  {
    _id: "5a56640208fba3e8ecb97305",
    name: "Malone Clark",
    email: "maloneclark@renovize.com",
    phone: "+1 (818) 565-2557",
  },
  {
    _id: "5a566402abb3146207bc4ec5",
    name: "Floyd Rutledge",
    email: "floydrutledge@renovize.com",
    phone: "+1 (807) 597-3629",
  },
  {
    _id: "5a56640298500fead8cb1ee5",
    name: "Grace James",
    email: "gracejames@renovize.com",
    phone: "+1 (959) 525-2529",
  },
  {
    _id: "5a56640243427b8f8445231e",
    name: "Tanner Gates",
    email: "tannergates@renovize.com",
    phone: "+1 (978) 591-2291",
  },
  {
    _id: "5a5664025c3abdad6f5e098c",
    name: "Lilly Conner",
    email: "lillyconner@renovize.com",
    phone: "+1 (842) 587-3812",
  },
];

const gUser = {
  _id: "u101",
  name: "Red Hood",
  username: "red",
  balance: 100,
  transactions: [],
};
const gUsers = [gUser, ...contacts];
const gTransaction = {
  toId: "d99e3u2ih329",
  to: "Moshiko",
  at: 2652712571,
  amount: 2,
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
  console.log(user);
  user = { ...user };
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
  };
}

async function transferFunds(amount, to) {
  const user = getLoggedinUser()
  if (user.balance < +amount) throw new Error("Not enough funds")
  else {
    user.balance -= +amount
    user.transactions.push({
      toId: to._id,
      to: to.name,
      at: Date.now(),
      amount: +amount,
    });
    saveLocalUser(user)
    await storageService.put("user_db", user)
    const toUser = await storageService.get("user_db", to._id)
    toUser.balance += +amount
    toUser.transactions = toUser.transactions || []
    toUser.transactions.push({
      toId: user._id,
      to: user.name,
      at: Date.now(),
      amount: +amount,
    })
    await storageService.put("user_db", toUser)

  } return user
}

(() => {
  let users = utilService.loadFromStorage(USER_KEY) || [...gUsers]
  utilService.saveToStorage(USER_KEY, users)
  
})();

// function _createRandomUsers() {
//   return utilService.getRandomNames().map((name) => {
//     return _createRandomUser(name);
//   });
// }

// function _createRandomUser(name) {
//     return {
//       _id: utilService.makeId(),
//       fullname: name,
//       imgUrl:
//         "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//       balance: 100,
//     };
//   }
