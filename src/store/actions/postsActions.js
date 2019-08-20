export const storePosts = (posts) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_POSTS', posts })
    }
}

export const selectPost = (post) => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_POST', post })
    }
}