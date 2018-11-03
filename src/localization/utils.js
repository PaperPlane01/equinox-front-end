const REGEXP = /{([^{]+)}/g;

export const replace = (string, bindings) => {
    return string.replace(REGEXP, (ignore, key) => {
        return (key = bindings[key]) ? key : '';
    });
};
