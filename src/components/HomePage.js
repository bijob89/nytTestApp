import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Header from './Header';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { storePosts } from '../store/actions/postsActions';
import { selectPost } from '../store/actions/postsActions';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
    },
    image: {
        width: 250,
        marginRight: '10px'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginBottom:'15px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
            height:'43px'
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        border:'1px solid #ccc',
        [theme.breakpoints.up('sm')]: {
            width: 200,
            '&:focus': {
                width: 300,
            },
        },
    },
});

class HomePage extends Component {
    state = {
        posts: [],
        searchString: ''
    }
    async getApiData() {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await data.json()
        this.props.storePosts({ posts })
    }

    componentDidMount() {
        this.getApiData()
    }

    displayArticles() {
        var { posts } = this.props
        const { classes } = this.props
        const imageLink = "https://s3-eu-west-1.amazonaws.com/amersports-wordpress-exove/uploads/20160621134121/Salomon-featured-image-768x513-640x360.jpg"
        const {searchString} =  this.state
        // let postsArray;
        if(searchString){
            posts = posts.filter(post => post.body.includes(searchString))
        }
        if (posts) {
            return posts.map(post => {
                return (

                    <Grid item xs={12} sm={6} key={post.id}>
                        <Paper className={classes.paper}>

                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={imageLink} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h6">

                                            {post.title.split(" ").map((word, index) => {
                                                if (index < 5) {
                                                    return <span key={word + index}> {word}</span>
                                                } else if (index === 5) {
                                                    return <span key={word + index}>...</span>
                                                }
                                            }
                                            )}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {post.body.split(" ").map((word, index) => {
                                                if (index < 20) {
                                                    return <span key={word + index}> {word}</span>
                                                } else if (index === 20) {
                                                    return <span key={word + index}>...</span>
                                                }
                                            }
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            to={{
                                                pathname: "details",
                                                state: { post: post }
                                            }}
                                            onClick={() => this.props.selectPost({ post: post })}
                                        >
                                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                Read More
                                </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">10 mins ago</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )
            })
        } else {
            return <h1>No Articles</h1>
        }
    }

    render() {
        const { classes } = this.props
        console.log(this.state.posts)
        console.log(this.props)
        return (
            <Grid item xs={12}>
                <Header />

                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Search' }}
                        onChange={(e) => this.setState({searchString: e.target.value})}
                    />
                </div>
                <Grid container spacing={2}>
                    {this.displayArticles()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storePosts: (project) => dispatch(storePosts(project)),
        selectPost: (post) => dispatch(selectPost(post))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage))