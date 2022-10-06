import { getSearchFollowers } from './apiReq';

function getData(login, index = 0, isFollowingsList) {
  return new Promise((resolve) => {
    getSearchFollowers(login, index + 1, isFollowingsList, 100).then((data) => resolve(data));
  });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function loadAllList(login, followersCount, followingsCount) {
  const userList = {
    followersList: [],
    followingsList: [],
  };
  let userRequest = null;
  for (let index = 0; index < (followersCount / 100) && index < 5; index++) {
    userRequest = getData(login, index, false);
    // eslint-disable-next-line no-await-in-loop
    await userRequest.then((res) => userList.followersList.push(...res.data));
    // this pauses loop until request is resolver for each interation
    // eslint-disable-next-line no-await-in-loop
    await sleep(500);
  }

  for (let index = 0; index < (followingsCount / 100) && index < 5; index++) {
    userRequest = getData(login, index, true);
    // eslint-disable-next-line no-await-in-loop
    await userRequest.then((res) => userList.followingsList.push(...res.data));
    // this pauses loop until request is resolver for each interation
    // eslint-disable-next-line no-await-in-loop
    await sleep(500);
  }

  return userList;
}
