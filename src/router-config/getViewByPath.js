import views from './index';

export default path => {
    let resultView = undefined;
    Object.keys(views).forEach(viewName => {
        if (views[viewName].path === path) {
            resultView = views[viewName];
        }
    });
    return resultView;
};