export const mergeNormalizedBlogPosts = (source, destination) => {
    return {
        ...destination,
        result: destination.result.concat(source.result),
        entities: {
            ...destination.entities,
            blogPosts: {
                ...destination.entities.blogPosts,
                ...source.entities.blogPosts
            }
        }
    }
};

export default mergeNormalizedBlogPosts;