import {Container} from "./Container";

const _Component = (componentOptions) => decoratedClass => {
    if (!componentOptions) {
        componentOptions = {};
    }
    let {name, dependencies, order} = componentOptions;
    const component = new decoratedClass();
    if (!dependencies) {
        dependencies = [];
    }
    if (order === undefined || order === null) {
        order = Number.MAX_SAFE_INTEGER;
    }
    Container.registerComponent({component, name, dependencies, order})
};

_Component.Order = {
    LOWEST: Number.MIN_SAFE_INTEGER,
    LOW: Math.round(Number.MIN_SAFE_INTEGER / 2),
    MEDIUM: 0,
    HIGH: Math.round(Number.MAX_SAFE_INTEGER / 2),
    HIGHEST: Number.MAX_SAFE_INTEGER
};

export const Component = _Component;