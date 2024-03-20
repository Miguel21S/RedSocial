
<li> <a href="/README.md">Back to readme</a> </li>

## Complete list of entpoints

User

List all Profile Users
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/profile
````

Update profile data
````jsx
PUT https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/profile
````


Search user by id
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users?email
````
Delete user by id
````jsx
DELETE https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/id
````
Actualizar role de usuario por id
````jsx
PUT https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/id
````

Auth Controllers
````jsx
POST https://redsocial-dev-qsfd.2.us-1.fl0.io/api/auth/register
````
````jsx
POST https://redsocial-dev-qsfd.2.us-1.fl0.io/api/auth/login
````
Posts

Creat post
````jsx
POST https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts
````

Delete post by id
````jsx
DELETE https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts/id
````

Update post by id
````jsx
PUT https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts/id
````

List my posts
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts/own/
````

List all posts
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts
````
Search post by id
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts/id
````
Search user posts by id user

````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/posts/id
````

Comments

CreatComment
````jsx
https://redsocial-dev-qsfd.2.us-1.fl0.io/api/comment/
````
Delete comments by ie
````jsx
DELETE https://redsocial-dev-qsfd.2.us-1.fl0.io/api/comment/id
````
Update comment by id
````jsx
PUT https://redsocial-dev-qsfd.2.us-1.fl0.io/api/comment/id
````
Filter Comment By idComment/idPost/userName
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/comments/filters?idPost=
````
Like
like and unlike

````jsx
POST https://redsocial-dev-qsfd.2.us-1.fl0.io/api/posts/like/
````
Following and Followers

Follow and unfollow
````jsx
POST https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/follow/
````
List of my following
````jsx
GET https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/following
````
Followers
````jsx
https://redsocial-dev-qsfd.2.us-1.fl0.io/api/users/following
````
<li> <a href="/README.md">Back to readme</a> </li>