import { addsDom } from "./initialPageLoad";
const createTask = function (name, date, status = 'false') {
    return { name, date, status };

}

const createProject = function (name, tasks = []) {
    const getTasks = () => tasks;
    const getName = () => name;
    return { getName, getTasks }
}

export { createTask, createProject };