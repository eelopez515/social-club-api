# Social Club
---
### Planning Story
First the wireframe was made to have an idea, of how the app would look. Following the wireframe the html code was made to match the wireframe
as best as possible. The functionality was made first, using curl was able to communicate with the corresponsing API. Proceeded to create user and like model schemas that would be used by the client end to creat a profile and like other people/profiles. Tested out CRUD request to make sure the API routes worked. 
---
### App Description
Social Club is an app where you can match with people to get to know, sort of like a tinder. Here you create a profile and will be presented with random people/profiles to like. You would swipe right if you are interested or like a person, or swipe left to skip that person and move on to the next. After you swipe right to like someone, a history of the people you like will be saved on your profile, and in future versions you will be able to message those people.
---
### Catalog of Routes
#### User Routes
* /sign-up - signs up for an account.
* /sign-in - signs in to a already created account.
* /change-password - changes the password to you account.
* /sign-out - logs you out of your acccount.

#### Like Routes
* /likes - to create and show likes
* /likes/:id - to delete a like

#### Profile Routes
* /update-profile - to update your profile

---
### Technologies Used
1. Express
2. MongoDB
3. JavaScript
4. Mongoose
5. Node js
---
### Unsolved Problems
1. Unable to render new state after updating profile
---
### Social Club ERD
![ERD](https://i.imgur.com/NuIfPyD.jpg)
---
### LINKS
* [API SITE] ('https://fierce-taiga-83651.herokuapp.com/')
* [CLIENT SITE] ()
* [API REPO] ('https://github.com/eelopez515/social-club-api')
* [CLIENT REPO] ('https://github.com/eelopez515/social-club-client')
