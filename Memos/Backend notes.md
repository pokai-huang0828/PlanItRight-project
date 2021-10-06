## API/Auth Interfaces

signIn() -> null, throws exception if signIn fails
signOut() -> null, throws exception if signOut fails
getUsers() -> { UID, email, firstName, lastName}
updateUserInfo() -> null, throws exception if fails

## API/ProjectRepository Interfaces

getProjects() -> [project]
addProject(project) -> projectId : String
deleteProject(projectID: String) -> null
updateProject(updatedProject: Project) -> updatedProject : Project

## API/UserRespository Class

getUserByUID = (userID) => User

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
owners: [UID: string],
members: [UID: string], // remember owner is also member
tasks: [task],
}


## Task Schema

task = {
id = string,
title: string,
description: string,
assignee: UID: string,
startDate: string,
endDate: string,
status: "COMPLETED" || "IN_PROGRESS" || "IN_BACKLOG"
}

## Project Management Methods

Add/Remove a member to project (only if the user is owner can use this function), return 1 if success else null

if deleting a member, must also check if the user is in the owner list

Add/Remove an owner to project (only if there user is owner), return 1 if success else null

Add/Remove a task to project: (task) => 1 if success else null