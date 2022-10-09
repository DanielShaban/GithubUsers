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
  usersData:{
    followingsCount?:number;
    followersCount?:number;
    login:string;
    isFollowingsList?: boolean;
    isNavigationBackable:boolean;
    alreadyLoadedData?:{}[];
    followersList?:{}[];
    followingsList?:{}[];
    mutualSubscribes?:{}[]
  };
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
  avatarUrl:string;
  pressHandle?: ()=>void
}
export type ProfileNamesT={
  name:string;
  userName:string
}
export type UserAvatarT={
  size:number;
  src:string
}
export type loopLoadingT={
  login:string;
  count:number;
  isFollowingsList:boolean
}
export type StyledSearchBarT={
  text:string;
  handleChange:()=>void;
}
