const initState = {
    posts: [],
    post: ''
}

const postsReducer = (state=initState, action) => {
    console.log('auth reducer')
    switch(action.type){
        case 'STORE_POSTS':
            return {
                ...state,
                posts: action.posts.posts
            }
        case 'GET_POST':
            return {
                ...state,
                post: action.post.post
            }
        default:
            return state
    }
}

export default postsReducer;