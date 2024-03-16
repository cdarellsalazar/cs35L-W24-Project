# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## GUIDE
Download the repo with git clone https://github.com/cdarellsalazar/cs35L-W24-Project.git
Open the project on your code editor, open a terminal and cd into the project.
Now we have to get you set up with the proper API's
First we have MongoDB
## MONGO DB Keys


## Cloudinary
Cloudinary allows for the upload and processing of image files, and then stores each image into its own database at a url. In order to avoid storing image files for profile pics locally, getting Cloudinary keys is necessary as well as provides access to useful image transformation and processing. Make an account at https://cloudinary.com and access your dashboard, here you will find your personal api keys that you must place into your .env file in your backend folder like so:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

## MongoDB Atlas:

We currently are using MongoDB as our database in traditional MERN fashion. Instead of creating our own database from scratch, we are currently utilizing the free-to-use MongoDB Atlas that holds our collections for us. It requires a URI to access. Due to the configurations of the UCLA wifi, while in a perfect world we would be able to whitelist IPs, we found it most beneficial to whitelist all IPs. This is held in the .env file, and if you have access to the mongo database, can be received from the MongoDB Atlas website. Obviously, we will not be supplying our mongoURI. To generate your own database, go to https://www.mongodb.com/ and create an account. Once you have created an account, it will ask you to create a project which you can name whatever you want. You have the option to add collaborators on this screen as well. Once your project is made, hit the green create button. From the top options, select M0 to use the free option. Then, choose your preferred provider and region based on what global region you are based in.You will now be prompted to connect to your cluster. First, create a database user with your preferred login credentials. Then, hit choose a connection method. Then, select drivers. Make sure mongoDB is installed in npm. Finally, the mongokey is given through the connection string provided. You enter this string where we have process.env.MONGO_URI. Finally, if you hit review steps in the bottom right, you can add IPs (there is an option to make it open to all IPs on this screen), and other database users you may be working with.

## SECRET:

The secret string is a string used in encoding tokens for authentication. Based on the string you provide, the tokens will be generated differently. It is a lot more complicated than that, but that’s all you need to know to get this up and running. Make this secret string whatever you want, although there are generators online such as https://randomkeygen.com/

## PORT:
This is just the port you want your server running on. We keep this a secret to prevent attacks. Standard ports that are used are 3000, 8080, or 4000. Ports from 1024 to 49151 are not assigned or controlled, so you would preferably use one in this range.


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

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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
