/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const URL = 'https://api.github.com';
const handleError = (error: {response: {status: number}}) => {
  if (error.response) {
    if (error.response.status === 0) {
      alert('No internet connection');
    }
    if (error.response.status === 403) {
      const TimeNow = new Date(Number(error.response.headers['x-ratelimit-reset']) * 1000);
      alert(`API rate limit exceeded. Wait till ${TimeNow} to use the app`);
    }
  } else {
    alert('Network Error');
  }
};

export const getSearchUsers = (login: string) => axios({
  method: 'get',
  url: `${URL}/users/${login}`,
}).catch(handleError);

export const getSearchFollowers = (login: string, page: number, isFollowingsList: boolean, per_page: number = 100) => axios({
  method: 'get',
  url: `${URL}/users/${login}/${isFollowingsList ? 'following' : 'followers'}`,
  params: {
    page,
    per_page,
  },
}).catch(handleError);
