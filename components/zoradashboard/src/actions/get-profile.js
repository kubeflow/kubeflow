const loadProf = async () => {
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