const userListMatrix = (data: any[]) => data.map((item) => ({
  avatarUrl: item.avatar_url,
  login: item.login,
  id: item.id,
}));
export default userListMatrix;
