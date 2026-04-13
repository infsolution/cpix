export type RoootStackParamList = {
    home: undefined;
    login: undefined;
    signIn: undefined;
    profile: undefined;
    add: undefined;
    edit: {id: string};
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RoootStackParamList {}
    }
}