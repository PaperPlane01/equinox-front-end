import {schema} from "normalizr";

export const blogPostSchema = new schema.Entity('blogPosts');
export const blogPostListSchema = new schema.Array(blogPostSchema);