🚀🚀🚀🚀🚀🚀🚀 Task Manager 🚀🚀🚀🚀🚀🚀🚀🚀

=> Nodejs  
=> Mongoose  
=> Brycpt is used for hashing password  
=> Jwt is used for generating user tokens

API's

# /users (post Method)

To create a user pass the following paramaters  
1)name  
2)email  
3)password  
4)age === optional

# /users/login (post Method)

To login User pass the following paramaetrs

1)email  
2)password

# /users/logout (post Method)

To logout the user pass Authorization token in header

# /users/me (get Method)

To show logged in user details pass Authorization token in header

# /users/me/avatar (post Method)

To add users profile picture

# /users/me/avatar (delete Method)

To delete the profile picture

# /users/:id/avatar (get Method)

To get users profile picture by
