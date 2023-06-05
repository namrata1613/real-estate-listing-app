import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creater: String,
    tags: [String],
    selectedFile: String,       // image
    likeCount:{
        type:Number,
        deafault:0
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;