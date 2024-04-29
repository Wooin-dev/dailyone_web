import {atom, selector} from 'recoil';

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get: ({get}) => !!get(UserTokenAtom)
});

export const UserTokenAtom = atom({
    key: 'UserTokenAtom',
    default: undefined,
});