🚀🚀🚀🚀🚀🚀🚀 Task Manager 🚀🚀🚀🚀🚀🚀🚀🚀

# Build using

=> Nodejs  
=> Mongoose  
=> Brycpt is used for hashing password  
=> Jwt is used for generating user tokens

API's Documentation

👉 Manage Users 👈

# /users (post method)

To create a user pass the following parameters  
1)name  
2)email  
3)password  
4)age === optional

# /users/login (post method)

To login User pass the following parameters

1)email  
2)password

# /users/logout (post method)

To logout the user pass Authorization token in header

# /users/me (get method)

To show logged in user details pass Authorization token in header

# /users/me/avatar (post method)

To add users profile picture

# /users/me/avatar (delete method)

To delete the profile picture

# /users/:id/avatar (get method)

To get users profile picture by

# /users/logoutAll (post method)

To logout user from all devices pass Authorization token in header

# /users/:id (get method)

To get user by id

# /users/me (patch method)

To update the details of looged in user  
 Following parameters can be passed in body along with Authorization token in header  
 1)name  
 2)email  
 3)password  
 4)age

# /users/me (delete method)

To delete the loggen in user account pass Authorization token in header

👉 Manage Tasks 👈

=> Every Task api would require Authorization token to be passed in the header

# /tasks (post method)

To create a new task pass the following in parameter in the body as json

1. description
2. completed (boolean) i.e true or false

# /tasks (get method)

To get the tasks created by a praticular user

# /tasks?completed=true (get method)

To get the tasks created by a praticular user based on fact that it is completed

# /tasks?limit=10&skip=20 (get method)

To get the tasks created by a praticular user with pagination support

# /tasks?sortBy=createdAt:desc (get method)

To get the tasks created by a praticular user based on created date and time filter

# /tasks/:id (get method)

To get tasks by id

# /tasks/:id (patch method)

To update tasks by id

# /tasks/:id (delete method)

To delete tasks by id
