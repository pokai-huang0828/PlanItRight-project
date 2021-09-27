## API/Auth Interfaces

signIn() -> null, throws exception if signIn fails
signOut() -> null, throws exception if signOut fails
getUsers() -> { UID, email, firstName, lastName}
updateUserInfo() -> null, throws exception if fails

## API/ProjectRepository Interfaces

projectRepository.getProjects() -> promise([project])
projectRepository.addProject(project) -> promise(projectId : String)
projectRepository.deleteProject("O7mzI5UsOXSXNAJZmRi0") -> promise(null)
projectRepository.updateProject(updatedProject) -> promise(updatedProject : obj)

## Project Schema

project = {
id: string,
name: string,
descrition: string,
createDate: string,
endDate: string,
owners: [string],
members: [string], // remember owner is also member
tasks: [task],
}

## Project Management Methods

Add a member to project (only if the user is owner), return 1 if success else null
Add an owner to project (only if ther user is owner), return 1 if success else null
Add a task to project: (task) => 1 if success else null
Remove a task from project: (taskID) => 1 if success else null

## Task Schema

task = {
id = string,
title: string,
description: string,
assignee: string,
startDate: string,
endDate: string,
status: "COMPLETED" || "IN_PROGRESS" || "IN_BACKLOG"
}




