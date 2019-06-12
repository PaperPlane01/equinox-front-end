import {Container} from "../simple-ioc";

const store = {};

Container.wireDependencies();

Container.registeredComponents.forEach(component => {
    store[component.name] = component.component;
});

export default store;