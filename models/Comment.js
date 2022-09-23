const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema({
    // set custom replyId to avoid confusion with parent comment's _id field
    replyId:{
        type:Schema.Types.ObjectId,
        default:()=>new Types.ObjectId()
    },
    replyBody:{
        type:String,
        required:'Reply can not be blank.',
        trim:true
    },
    writtenBy:{
        type:String,
        required:'Please enter your name.'
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON:{
        virtuals:true,
        getters:true
    }
}
)


const CommentSchema = new Schema({
        writtenBy:{
            type:String,
            required:'Please enter your name.'
        },
        commentBody:{
            type:String,
            required:'Comment can not be blank.',
            trim: true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:(createdAtVal) => dateFormat(createdAtVal)
        },
        // use ReplySchema to validate data for a reply
        replies:[ReplySchema]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        }
    }
);

CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
})

const Comment = model('Comment',CommentSchema);

module.exports = Comment;