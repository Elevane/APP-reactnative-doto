
const GetUser = () => {
    const user = localStorage.getItem("user");
    if(user === null || user === undefined)
        return false
        const parsed = JSON.parse(user);
    if(parsed.user === null || parsed.user === undefined)
        return false
    let isUndifiend = parsed.user.username === undefined || parsed.user.token === undefined || parsed.user.id === undefined
    let isNull = parsed.user.username === null || parsed.user.token === null || parsed.user.id === null
    if( isUndifiend && isNull)
       return false
    else return parsed.user
}

const SetUser = (userValue) => {
    localStorage.setItem("user", JSON.stringify({ user: userValue }));
}


const AddTodo = (projectName, newTodo) => {
    let user = GetUser();
    if(!user)
        return;
    let project = JSON.parse(user.todo).projects.filter(p => p.name === projectName)[0]
    project.childs.push({"desc" : newTodo, active : true})
    let otherProjects =  JSON.parse(user.todo).projects.filter(p => p.name !== projectName)
    otherProjects.push(project)
    user.todo = JSON.stringify({ "projects" : (Object.values(otherProjects)) })
    localStorage.setItem("user", JSON.stringify({user: user }))
}

const AddProject = (newProject) => {
    let user = GetUser();
    let projects = JSON.parse(user.todo).projects;
    projects.push(newProject)
    user.todo = JSON.stringify({ "projects" : projects})
    localStorage.setItem("user", JSON.stringify({user: user }))
}


const RemoveFromList = (elm, key, list ) => {
    let newArray = []
    list.forEach(element => {
        if(element[key] === elm[key])
            element.active = false;
        newArray.push(element)
    });
    return newArray;
}

const DeleteProject = (projectName) => {
    let user = GetUser();
    if(!user)
        return;
    const projects = JSON.parse(user.todo).projects
    let project = projects.filter(p => p.name === projectName)[0]
    const newProjects = RemoveFromList(project, "name", projects)
    user.todo = JSON.stringify({ "projects" : newProjects })
    localStorage.setItem("user", JSON.stringify({user: user }))
}

const SetActive = (projectName , name, activeValue) => {
    let user = GetUser();
    if(!user)
        return;
    let projects = JSON.parse(user.todo).projects;
    if(projects === null)
        return;
    let project = projects.filter(p => p.name === projectName)[0]
    if(project === null || project.childs === null || project.childs === undefined)
        return;
   
    let todo = project.childs.filter(x => x.desc === name)[0];
    
    
    if(todo === null)
        return;
    
    let newTodo = {
        desc : todo.desc,
        active : activeValue
    }
    //reconbstruction des todo / childs
    const index =  project.childs.indexOf(todo);     
    project.childs.splice(index, 1); 
    project.childs.push(newTodo);
    

    //reconstrucityon des projects
    const proIndex =  projects.indexOf(project);     
    projects.splice(proIndex, 1); 
    projects.push(project);
    
    user.todo = JSON.stringify({ "projects" : projects })
    localStorage.setItem("user", JSON.stringify({user: user }))
}

export default { GetUser, AddTodo, SetUser, AddProject, DeleteProject, SetActive}