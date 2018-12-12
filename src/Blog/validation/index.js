import {isBlank, isImage} from "../../utils";
import BlogManagersVisibilityLevel from '../BlogManagersVisibilityLevel';

export const validateBlogName = name => {
    if (isBlank(name)) {
        return "requiredField";
    }

    if (name.length > 50) {
        return "blogNameIsTooLong";
    }

    return undefined;
};

export const validateBlogDescription = description => {
    if (isBlank(description)) {
        return undefined;
    }

    if (description.length > 100) {
        return "blogDescriptionIsTooLong";
    }

    return undefined;
};

export const validateBlogAvatarUri = avatarUri => {
    return new Promise(resolve => {
        if (isBlank(avatarUri)) {
            resolve(undefined);
        }

        isImage({url: avatarUri, timeout: 5000})
            .then(() => {
                resolve(undefined);
            }).catch(() => {
            resolve('invalidImageUrl');
        })
    })
};

export const validateDefaultPublisherType = defaultPublisherType => {
    if (isBlank(defaultPublisherType)) {
        return 'emptyDefaultPublisherType';
    }

    if (defaultPublisherType !== 'BLOG' && defaultPublisherType !== 'BLOG_POST_AUTHOR') {
        return 'invalidDefaultPublisherType';
    }

    return undefined;
};

export const validateBlogManagersVisibilityLevel = blogManagersVisibilityLevel => {
    if (isBlank(blogManagersVisibilityLevel)) {
        return 'emptyBlogManagersVisibilityLevel';
    }

    if (blogManagersVisibilityLevel !== BlogManagersVisibilityLevel.OWNER
        && blogManagersVisibilityLevel !== BlogManagersVisibilityLevel.MANAGERS
        && blogManagersVisibilityLevel !== BlogManagersVisibilityLevel.SUBSCRIBERS
        && blogManagersVisibilityLevel !== BlogManagersVisibilityLevel.REGISTERED_USERS
        && blogManagersVisibilityLevel !== BlogManagersVisibilityLevel.PUBLIC) {
        return 'invalidBlogManagersVisibilityLevel';
    }

    return undefined;
};

export const validateBlogManagerRole = role => {
    if (isBlank(role)) {
        return "requiredField";
    }

    return undefined;
};

export const validateBlogManagerUser = (user) => {
    if (!user){
        return "userMustBeSpecified";
    }

    return undefined;
};