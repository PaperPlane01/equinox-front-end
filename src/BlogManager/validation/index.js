import {isBlank} from "../../utils";

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