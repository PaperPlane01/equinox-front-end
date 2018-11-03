import {isBlank} from "../../utils/index";

export const validateBlogPostTitle = title => {
    if (isBlank(title)) {
        return undefined;
    }

    if (title.length > 50) {
        return "blogPostTitleIsTooLong";
    }

    return undefined;
};

export const validateBlogPostTags = tags => {
    if (!tags || tags.length === 0) {
        return undefined;
    }

    if (tags.length > 10) {
        return "tooManyTags";
    }

    tags.forEach(tag => {
        if (tag.length > 20) {
            return "oneOfTheTagsIsTooLong";
        }
    });

    return undefined;
};