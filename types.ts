export type FollowersStatT = {
    followersCount: number;
    followingsCount: number;
    login: string
  };
export type LinkedBoxT={
  text?: string;
  number: number;
  color:string;
  screenToNavigate:string;
  usersData:{}[];
  isMutualListLoading?: boolean
}
export type LinkedTextT={
  screenName?: string;
  iconName:string;
  text:string;
  href?:string;
  navigationProps?:{}
 }
export type ProfileMainInfoT={
  name:string;
  login:string;
  avatarUrl:string
}
export type ProfileNamesT={
  name:string;
  userName:string
}
export type UserAvatarT={
  size:number;
  src:string
}
