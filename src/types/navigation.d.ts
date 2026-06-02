export type RoootStackParamList = {
  home: undefined;
  login: undefined;
  signIn: undefined;
  profile: undefined;
  add: { own: number };
  edit: { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoootStackParamList {}
  }
}
