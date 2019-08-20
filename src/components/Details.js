import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase';
import { connect } from 'react-redux';
import Header from './Header';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: 'auto',
        maxWidth: '90%',
    },
    image: {
        marginRight: '10px'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    top:{
        paddingLeft:'40px',
        marginBottom: '60px'
    }
});

class Details extends Component {

    render() {
        const { classes, post } = this.props
        const imageLink = "https://s3-eu-west-1.amazonaws.com/amersports-wordpress-exove/uploads/20160621134121/Salomon-featured-image-768x513-640x360.jpg"

        return (
            <Grid item xs={12} key={post.id} x>
                <Header />
                <Link to="/homepage" className={classes.top}>
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" /></svg>
                        Go Back
                </Button>
                </Link>
                {(post) ? (
                    <Grid item xs={11} className={classes.top} >
                        <Grid item xs={12}>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={imageLink} />
                            </ButtonBase>
                        </Grid>

                        <Grid item>
                                <Typography variant="caption">10 mins ago</Typography>
                            </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {post.body}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : <h5 className={classes.top}>No Content Available</h5>}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.post
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Details))