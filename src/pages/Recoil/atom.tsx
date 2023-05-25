import { atom } from 'recoil';

export const loginUserState = atom<string>({
  key: 'loginUserState',
  default: '',
});
export const loginEmailState = atom<string>({
  key: 'loginEmailState',
  default: '',
});
export const loginPasswordState = atom<string>({
  key: 'loginPasswordState',
  default: '',
});
