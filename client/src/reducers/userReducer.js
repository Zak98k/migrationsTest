import ACTION from '../actions/actiontsTypes';

const initialState = {
    user: null,
    error: null
    //authPass: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.CURRENT_USER_REQUEST: {
            return {
                ...state,
                error: null
            }
        }
        case ACTION.CURRENT_USER_RESPONSE: {
            return {
                ...state,
                token: action.token,
                error: null
                //authPass: true                                      //прошел аутентификацию : true
            }
        }

        case ACTION.CREATE_USER_REQUEST: {
            return {
                ...state,
                user: action.user,
                error: null
            };
        }

        case ACTION.CURRENT_USER_ERROR: {

            return {...state,
                error: action.error
            }
        }
        default: {
            return state;
        }
    }
}