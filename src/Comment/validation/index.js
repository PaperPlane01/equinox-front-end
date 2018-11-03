import {isBlank} from "../../utils";

export const validateContent = content => {
    if (isBlank(content)) {
        return "emptyComment";
    }

    if (content.length > 3500) {
        return "commentIsTooLong";
    }

    return undefined;
};