import userListMatrix from '../helper/userListMatrix';
import { getSearchFollowers } from './apiReq';

const maximumLoad = 5;
// 1 = 100 users

function getData(login: string, isFollowingsList: boolean, index = 0) {
  return new Promise((resolve) => {
    getSearchFollowers(login, index + 1, isFollowingsList, 100).then((data) => resolve(data));
  });
}

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function loopLoading(login: string, count: number, isFollowingsList: boolean) {
  const userList: [] = [];
  let userRequest;
  for (let index = 0; index < count / 100 && index < maximumLoad; index++) {
    userRequest = getData(login, isFollowingsList, index);
    // eslint-disable-next-line no-await-in-loop
    await userRequest.then((res) => userList.push(...userListMatrix(res.data)));
    // this pause the loop until request is resolved for each iteration
    // reqwest#1 --> wait --> reqwest#2 --> ...
  }
  return userList;
}

export default async function loadAllList(login: string, followersCount: number, followingsCount: number) {
  const userList = {
    followersList: [],
    followingsList: [],
  };
  userList.followersList = await loopLoading(login, followersCount, false);
  userList.followingsList = await loopLoading(login, followingsCount, true);

  return userList;
}
