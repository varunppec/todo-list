import { createProject } from './createtask';
const loadProjects = function () {
    const sidebar = document.querySelector('#sidebar');
    const sidebarheader = document.createElement('div');
    sidebarheader.id = 'sidebarheader';
    sidebarheader.innerText = 'Projects';
    sidebar.append(sidebarheader);
    const project_container = document.createElement('div');
    project_container.id = 'project_container';
    let proj_names = JSON.parse(localStorage.getItem('name'));
    if (proj_names) {
        for (let item of JSON.parse(localStorage.getItem('name'))) {
            const sidebar = document.querySelector('#sidebar');
            if (item == 'Inbox') {
                const inbox = document.createElement('div');
                inbox.id = 'inbox';
                inbox.classList.add('projects');
                const symbol = document.createElement('div');
                symbol.innerText = 'list';
                symbol.classList.add('material-icons');
                const name = document.createElement('div');
                name.innerText = item;
                name.classList.add('project-name');
                inbox.append(symbol, name);
                const sidebarheader = document.querySelector('#sidebarheader');
                sidebar.insertBefore(inbox, sidebarheader);
                continue;
            }


            const projects = document.createElement('div');
            projects.classList.add('projects');
            const symbol = document.createElement('div');
            symbol.innerText = 'list';
            symbol.classList.add('material-icons');
            const name = document.createElement('div');
            name.innerText = item;
            name.classList.add('project-name');
            const remove = document.createElement('div');
            remove.innerText = 'remove';
            remove.classList.add('material-icons', 'remove');
            remove.onclick = function (event) {
                event.stopPropagation();
                removeProject(remove);
            }
            projects.append(symbol, name, remove);
            project_container.append(projects);
            sidebar.append(project_container);
        }

    }

    else {
        localStorage.setItem('name', JSON.stringify(['Inbox']));
        localStorage.setItem('Inbox', JSON.stringify([]));
        proj_names = JSON.parse(localStorage.getItem('name'));

        const inbox = document.createElement('div');
        inbox.id = 'inbox';
        inbox.classList.add('projects');
        const symbol = document.createElement('div');
        symbol.innerText = 'list';
        symbol.classList.add('material-icons');
        const name = document.createElement('div');
        name.innerText = 'Inbox';
        name.classList.add('project-name');
        inbox.append(symbol, name);
        const sidebarheader = document.querySelector('#sidebarheader');
        sidebar.insertBefore(inbox, sidebarheader);
    }
    addProject(proj_names);
    projectListener();
    const inbox = document.querySelector('#inbox');
    inbox.click();
};

const addProject = function (proj_names) {
    const sidebar = document.querySelector('#sidebar');
    const add_project = document.createElement('button');
    add_project.id = 'new_project';
    add_project.innerText = 'New project';
    sidebar.append(add_project);
    add_project.onclick = function () {
        projectForm(proj_names);
    }
}

const projectForm = function (proj_names) {
    const sidebar = document.querySelector('#sidebar');
    const sidebarform = document.createElement('div');
    sidebarform.classList.add('sidebarform');
    const side_form = document.createElement('form');
    side_form.id = 'side-form';
    const input = document.createElement('input');
    input.type = 'text';
    input.required = true;
    input.placeholder = 'Project Name';
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    const submit = document.createElement('button');
    submit.id = 'side-submit';
    submit.innerText = 'Submit';
    const cancel = document.createElement('button');
    cancel.id = 'side-cancel';
    cancel.innerText = 'Cancel';
    buttons.append(submit, cancel);
    cancel.onclick = function () {
        const temp = document.querySelector('#sidebar');
        temp.remove();
        const container = document.querySelector('#container');
        const sidebar = document.createElement('div');
        sidebar.id = 'sidebar';
        container.insertBefore(sidebar, container.children[0]);
        loadProjects();
    }
    side_form.append(input, buttons);
    sidebarform.append(side_form);
    sidebar.append(sidebarform);
    const new_project = document.querySelector('#new_project');
    new_project.remove();
    side_form.onsubmit = function (e) {
        e.preventDefault();
        sideSubmit(proj_names);
    }
}

const sideSubmit = function (proj_names) {
    const project_container = document.querySelector('#project_container');
    const side_form = document.querySelector('#side-form');
    const obj = createProject(side_form[0].value);
    localStorage.setItem(obj.getName(), JSON.stringify(obj.getTasks()));
    if (proj_names.includes(side_form[0].value)) {
        window.alert('already there');
    }
    else {
        proj_names.push(side_form[0].value);
        localStorage.setItem('name', JSON.stringify(proj_names));
        side_form.parentElement.remove();
        if (project_container)
            project_container.remove();
        const temp = document.querySelector('#sidebar');
        temp.remove();

        const container = document.querySelector('#container');
        const sidebar = document.createElement('div');
        sidebar.id = 'sidebar';
        container.insertBefore(sidebar, container.children[0]);
        loadProjects();
    }
}

const projectListener = function () {
    const container = document.querySelector('#container');
    const projects = document.querySelectorAll('.projects');

    for (let project of projects) {
        project.onclick = function () {
            const temp = document.querySelector('#main');
            temp.remove();
            const main = document.createElement('div');
            main.id = 'main';
            container.append(main);
            const div_header = document.createElement('div');
            div_header.id = 'div_header';
            div_header.innerText = project.children[1].innerText;

            main.append(div_header);
            loadTasks(project.children[1].innerText);


        }
    }
}
const loadTasks = function (project_name) {
    const main = document.querySelector('#main');
    const task_list = document.createElement('div');
    task_list.id = 'task_list';
    main.append(task_list);
    let task_values = JSON.parse(localStorage.getItem(project_name));
    if (task_values) {
        for (let item of task_values) {
            const tasks = document.createElement('div');
            tasks.classList.add('tasks');
            const nc = document.createElement('div');
            nc.classList.add('nc');
            const d = document.createElement('div');
            d.classList.add('d');
            const ddate = document.createElement('div');
            ddate.innerText = item.split(" ")[1];
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            const n = document.createElement('div');
            n.classList.add('n');
            const div = document.createElement('div');
            div.innerText = item.split(" ")[0];
            checkbox.onclick = function () {
                checkboxListener(checkbox);
            }
            div.onclick = function () {
                nameListener(div);
            }
            ddate.onclick = function () {
                dateListener(ddate);
            }
            n.append(div);
            nc.append(checkbox, n);
            d.append(ddate);
            tasks.append(nc, d);
            task_list.append(tasks);
        }
    }
    const button = document.createElement('button');
    button.id = 'new_task';
    button.innerText = 'Add Task';
    task_list.append(button);
    button.onclick = function () {
        button.remove();
        addTask();
    }
}

const addTask = function () {
    const task_list = document.querySelector('#task_list');
    const form = document.createElement('form');
    form.id = 'form';
    const task_name = document.createElement('input');
    task_name.type = 'text';
    task_name.required = true;
    const task_date = document.createElement('input');
    task_date.type = 'date';
    const task_buttons = document.createElement('div');
    task_buttons.classList.add('task-buttons');
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerText = 'Submit';
    submit.id = 'submit';
    const cancel = document.createElement('button');
    cancel.id = 'cancel';
    cancel.innerText = 'Cancel';
    task_buttons.append(submit, cancel);
    cancel.onclick = function () {
        task_list.remove();
        loadTasks(document.querySelector('#div_header').innerText);
    }
    form.append(task_name, task_date, task_buttons);
    task_list.append(form);
    form.onsubmit = function (e) {
        e.preventDefault();
        const project_name = document.querySelector('#div_header').innerText;
        let tasks = JSON.parse(localStorage.getItem(project_name));
        let status = true;
        for (let task of tasks) {

            if (task.split(' ')[0] == form[0].value) {
                window.alert('already there');
                status = false;
            }

            /*
            if (task.split(' ')[0].includes(form[0].value)) {
                window.alert('already there');
                status = false;
            }
            */
        }
        if (status) {
            if (!tasks) tasks = [];
            if (form[1].value) tasks.push(form[0].value + ' ' + form[1].value);
            else tasks.push(form[0].value + ' NoDate');
            localStorage.setItem(project_name, JSON.stringify(tasks));
            task_list.remove();
            loadTasks(project_name);
        }
    }
}

const checkboxListener = function (checkbox) {
    let tasks = JSON.parse(localStorage.getItem(document.querySelector('#div_header').innerText));
    let task_name = checkbox.nextSibling.children[0].innerText;
    let task_date = checkbox.parentElement.nextSibling.innerText;
    let task = task_name + " " + task_date;
    if (checkbox.checked == true) {
        let index = tasks.indexOf(task);
        tasks.splice(index, 1);
        checkbox.parentElement.parentElement.remove();
        localStorage.setItem(document.querySelector('#div_header').innerText, JSON.stringify(tasks));
    }
}

const nameListener = function (name) {
    let task_name = name.innerText;
    let task_date;
    const input = document.createElement('input');
    input.type = 'text';
    name.style.display = 'none';
    let name_holder = name.parentElement;
    name_holder.append(input);
    let tasks = JSON.parse(localStorage.getItem(document.querySelector('#div_header').innerText));
    let index;
    for (let task of tasks) {
        if (task_name == task.split(' ')[0]) {
            index = tasks.indexOf(task);
            task_date = task.split(' ')[1];
        }
    }
    input.onkeydown = function (event) {
        if (event.key == 'Enter' && input.value) {
            if (input.value == task_name) window.alert('new name');
            else {
                let n = input.value + ' ' + task_date;
                tasks[index] = n;
            }
            localStorage.setItem(document.querySelector('#div_header').innerText, JSON.stringify(tasks));
            input.style.display = 'none';
            name.innerText = input.value;
            name.style.display = '';
        }
    }

}

const dateListener = function (ddate) {
    let task_name = ddate.parentElement.previousSibling.children[1].children[0].innerText;
    let task_date = ddate.innerText;
    const input = document.createElement('input');
    input.type = 'date';
    let date_holder = ddate.parentElement;
    date_holder.append(input);
    ddate.style.display = 'none';
    let tasks = JSON.parse(localStorage.getItem(document.querySelector('#div_header').innerText));
    let index;
    for (let task of tasks) {
        if (task_date == task.split(' ')[1]) {
            index = tasks.indexOf(task);
        }
    }
    input.oninput = function () {
        let n = task_name + ' ' + input.value;
        tasks[index] = n;
        localStorage.setItem(document.querySelector('#div_header').innerText, JSON.stringify(tasks));
        input.style.display = 'none';
        ddate.innerText = input.value;
        ddate.style.display = '';
    }
}

const removeProject = function (remove) {
    const project_name = remove.previousSibling.innerText;
    localStorage.removeItem(project_name);
    let names = JSON.parse(localStorage.getItem('name'));
    let index = names.indexOf(project_name);
    names.splice(index, 1);
    localStorage.setItem('name', JSON.stringify(names));
    const project_container = document.querySelector('#project_container');
    const new_button = document.querySelector('#new_project');
    const projects = document.querySelectorAll('.projects');
    const temp = document.querySelector('#sidebar');
    temp.remove();
    const sidebar = document.createElement('div');
    const container = document.querySelector('#container');
    sidebar.id = 'sidebar';
    container.insertBefore(sidebar, container.children[0]);
    loadProjects();

}
export { loadProjects, addProject };