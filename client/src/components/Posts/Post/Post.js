import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'; 
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost,likePost} from "../../../actions/posts";


const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    
    return (
        <Card classes={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

            <div className={classes.infobar}>
                 
                <Typography variant="h6">By {post.creator}</Typography>
                
                <Button style={{color:'black'}} size="small" onClick={() => setCurrentId(post._id)} >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            
            </div>
            

            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <Typography className={classes.title} variant="body2">{moment(post.createdAt).fromNow()}</Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))} > 
                    <ThumbUpAltIcon fontSize="small" /> &nbsp;Like &nbsp;{post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} > 
                    <DeleteIcon fontSize="small" /> &nbsp;Delete
                </Button>
            </CardActions>


        </Card>
    );
}

export default Post; 