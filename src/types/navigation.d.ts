export type RoootStackParamList = {
  home: undefined;
  login: undefined;
  recovery: undefined;
  signIn: undefined;
  profile: undefined;
  profileEdit: undefined;
  add: { own: number };
  edit: { id: string; own: number };
  friends: undefined;
  friend: { id: string };
  subscription: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoootStackParamList {}
  }
}
