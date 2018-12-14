import {isBlank} from "../../utils";

export const validateReason = reason => {
    if (isBlank(reason)) {
        return undefined;
    }

    if (reason.length > 150) {
        return "reasonIsTooLong";
    }

    return undefined;
};

export const validateEndDate = endDate => {
    if (!endDate) {
        return "endDateIsEmpty";
    }

    return undefined;
};