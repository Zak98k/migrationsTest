import ACTION from './actiontsTypes';

export const authAction = (login) => {
  return {
    type: ACTION.LOGIN,
    login
  };
};

export const createAccountAction = (createAccountData) => {
  return {
    type: ACTION.CREATE_ACCOUNT,
    createAccountData
  };
};