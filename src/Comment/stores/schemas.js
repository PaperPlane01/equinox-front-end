import {schema} from "normalizr";

export const replySchema = new schema.Entity('replies');
export const commentSchema = new schema.Entity('comments', {
    replies: new schema.Array(replySchema)
});
export const commentListSchema = new schema.Array(commentSchema);