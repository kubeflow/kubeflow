import { createContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { profileAPI } from "../api/profile";

const initialState = {
    loading: true,
    profile: null
}

const handlers = {
    GET_PROFILE: (state, action) => {
        const {profile} = action.payload;
        return {
            ...state,
            profile,
            loading: false
        };
    }
};

const reducer = (state, action) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);

export const ProfileContext = createContext({
    ...initialState,
    getProfile: () => Promise.resolve(),
    testFunc : () => {}

});

export const ProfileProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {  
        console.log('loaded 2')
        function print(){
            console.log('here')
        }
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                console.log(accessToken)
                if (accessToken){
                    const profile = await profileAPI.me(accessToken);

                    dispatch({
                        type: 'GET_PROFILE',
                        payload: {
                            loading: false,
                            profile
                        }
                    });
                } else {
                    dispatch({
                        type: 'GET_PROFILE',
                        payload: {
                            loading: true,
                            profile: null
                        }
                    });
                }

            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'GET_PROFILE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };
        initialize();
        // print()
    }, []);

    const getProfile = async () => {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log(accessToken)
        // try {
        //     console.log("accessToken")
        //     const accessToken = window.localStorage.getItem('accessToken');
        //     console.log(accessToken)
        //     if (accessToken){
        //         console.log("before calling func")
        //         const profile = await profileAPI.me(accessToken);

        //         dispatch({
        //             type: 'GET_PROFILE',
        //             payload: {
        //                 loading: false,
        //                 profile
        //             }
        //         });
        //     } else {
        //         dispatch({
        //             type: 'GET_PROFILE',
        //             payload: {
        //                 loading: true,
        //                 profile: null
        //             }
        //         });
        //     }

        // } catch (err) {
        //     console.error(err);
        //     dispatch({
        //         type: 'GET_PROFILE',
        //         payload: {
        //             isAuthenticated: false,
        //             user: null
        //         }
        //     });
        // }
    };

    const testFunc = () =>{
        return "Hello"
    }

    return (
        <ProfileContext.Provider
            value={{
                ...state,
                getProfile,
                testFunc
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

ProfileProvider.propTypes = {
    children: PropTypes.node.isRequired
}