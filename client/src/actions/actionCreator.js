import ACTION from './actiontsTypes';

export const authAction = (auth) => {
  return {
    type: ACTION.AUTH,
    auth
  };
};

export const createAccountAction = (createAccountData) => {
  return {
    type: ACTION.CREATE_ACCOUNT,
    createAccountData
  };
};