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

## User Schema

user = {
uid: string,
lastName: string,
firstName: string,
email: string,
telephone: string
}

## Project Schema

project = {
id: string,
name: string,
description: string,
createDate: string,
endDate: string,
owners: [string],
members: [string], // remember owner is also member
tasks: [task],
}

## Project Management Methods

Add/Remove a member to project (only if the user is owner can use this function), return 1 if success else null
if deleting a member, must also check if the user is in the owner list

Add/Remove an owner to project (only if there user is owner), return 1 if success else null

Add/Remove a task to project: (task) => 1 if success else null

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
