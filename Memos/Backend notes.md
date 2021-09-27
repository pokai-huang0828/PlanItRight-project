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
