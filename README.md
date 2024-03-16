# Getting Started with DisruptChat

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## GUIDE
Download the repo with git clone https://github.com/cdarellsalazar/cs35L-W24-Project.git
Open the project on your code editor, open a terminal and cd into the project.
Now we have to get you set up with the proper API's


## Cloudinary
Cloudinary allows for the upload and processing of image files, and then stores each image into its own database at a url. In order to avoid storing image files for profile pics locally, getting Cloudinary keys is necessary as well as provides access to useful image transformation and processing. Make an account at https://cloudinary.com and access your dashboard, here you will find your personal api keys that you must place into your .env file in your backend folder like so:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

## MongoDB Atlas:

We currently are using MongoDB as our database in traditional MERN fashion. Instead of creating our own database from scratch, we are currently utilizing the free-to-use MongoDB Atlas that holds our collections for us. It requires a URI to access. Due to the configurations of the UCLA wifi, while in a perfect world we would be able to whitelist IPs, we found it most beneficial to whitelist all IPs. This is held in the .env file, and if you have access to the mongo database, can be received from the MongoDB Atlas website. Obviously, we will not be supplying our mongoURI. To generate your own database, go to https://www.mongodb.com/ and create an account. Once you have created an account, it will ask you to create a project which you can name whatever you want. You have the option to add collaborators on this screen as well. Once your project is made, hit the green create button. From the top options, select M0 to use the free option. Then, choose your preferred provider and region based on what global region you are based in.You will now be prompted to connect to your cluster. First, create a database user with your preferred login credentials. Then, hit choose a connection method. Then, select drivers. Make sure mongoDB is installed in npm. Finally, the mongokey is given through the connection string provided. You enter this string into a line called MONGO_URI=(*enter your string here*) in your .env file. Finally, if you hit review steps in the bottom right, you can add IPs (there is an option to make it open to all IPs on this screen), and other database users you may be working with. 

## SECRET:

The secret string is a string used in encoding tokens for authentication. Based on the string you provide, the tokens will be generated differently. It is a lot more complicated than that, but that’s all you need to know to get this up and running. Make this secret string whatever you want, although there are generators online such as https://randomkeygen.com/. In your .env file, it should say SECRET= (the string you chose)

## PORT:
This is just the port you want your server running on. We keep this a secret to prevent attacks. Standard ports that are used are 3000, 8080, or 4000. Ports from 1024 to 49151 are not assigned or controlled, so you would preferably use one in this range. In your .env file, it should have a line that says PORT= (your selected port)


## env:
After all this is done you should create a file named .env within the backend folder with the following keys inside that you got from the previous four steps from Port, Secret, MongoDB, and Cloudinary :
MONGO_URI= 
PORT=
Secret=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

## NPM install
Now that we have all the API's set up, we need to install some modules.
Using a terminal cd into the frontend folder, and run the command
### `npm install`
Do the same in backend folder.

## Congrats! You are ready to run the project!
Just use npm start first in the backend folder, and then in the frontend folder and you should see a webpage popup with the project.

## Available Scripts

In the project directory, you can run:

### `npm start`

Create two terminals, In one, cd into backend, and the other cd into frontend. Run this command in both, on the backend to start the express and sockets server, and on the frontend to start your react application

### `npm run dev`

You also have the option to run this in the backend folder. This will restart the backend server automatically every time code is updated in the backend folder, making the development process easier.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
