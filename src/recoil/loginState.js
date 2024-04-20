import {atom, selector} from 'recoil';

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get: ({get}) => !!get(UserInfoAtom)
});

export const UserInfoAtom = atom({
    key: 'UserInfoAtom',
    default: undefined,
});