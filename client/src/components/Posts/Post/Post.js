import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'; 
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useState } from "react";
import useStyles from './styles';
import { deletePost,likePost} from "../../../actions/posts";


const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes,setLikes] = useState(post?.likes);
    const userId = (user?.result?.googleId || user?.result?._id);
    const hasLikedPost = post.likes.find((like) => like === userId);
    

    const handleClick = async () => {
        dispatch(likePost(post._id));
        
        if(hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        }else{
            setLikes([... post.likes,userId]);
        }
    };

    const Likes = () => {
        if(likes.length > 0){
            return likes.find((like) => like === userId) ? 
            (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length -1} others` : `${likes.length} like${likes.length >1 ? 's':''}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length ===1 ? 'Like':'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`);
    
    return (
        <Card classes={classes.card} raised elevation={6}>
              
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={openPost} />

            <div className={classes.infobar}>
                 
                <Typography variant="h6">By {post.name}</Typography>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button style={{color:'black'}} size="small" onClick={() => setCurrentId(post._id)} >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                )}
            
            </div>
            

            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <Typography className={classes.title} variant="body2">{moment(post.createdAt).fromNow()}</Typography>

            <CardContent >
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleClick} > 
                    <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} > 
                    <DeleteIcon fontSize="small" /> &nbsp;Delete
                    </Button>
                )}
                
            </CardActions>


        </Card>
    );
}

export default Post; 