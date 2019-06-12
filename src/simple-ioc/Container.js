import {isBlank} from "../utils";

const transformDependencies = dependencies => {
    return dependencies.map(dependency => {
        if (!dependency.componentName || dependency.componentName === '') {
            dependency.componentName = dependency.propertyName;
        }
        return dependency;
    });
};

const lowerCaseOfFirstCharacter = string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

class _Container {
    registeredComponents = [];

    registerComponent = ({component, name, dependencies, order}) => {
        const transformedDependencies = transformDependencies(dependencies);
        const transformedName = isBlank(name)
            ? lowerCaseOfFirstCharacter(component.__proto__.constructor.name)
            : name;
        this.registeredComponents.push({
            component,
            name: transformedName,
            dependencies: transformedDependencies,
            order
        });
    };

    wireDependencies = () => {
        this.registeredComponents.sort((left, right) => left.order - right.order);
        this.registeredComponents.forEach(component => {
            component.dependencies.forEach(dependency => {
                component.component[dependency.componentName] = this.getComponentByName(dependency.componentName);
            })
        })
    };

    getComponentByName = name => {
        return this.registeredComponents.filter(component => component.name === name)[0].component;
    }
}

export const Container = new _Container();
