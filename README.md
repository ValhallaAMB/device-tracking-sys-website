# device-tracking-sys-website

This website is used to track an ESP32 device based on its location. The ESP32 sends its information through the internet to a Firebase Realtime Database, and the website, running with Vite and React with Tailwind styling, pulls the information automatically and displays it.

## Set up

### Realtime database

1. Go to [Google Firebase console](https://firebase.google.com/).
2. Create a new Firebase project.
3. Once logged in, click on Build > Realtime Database in the sidebar.
4. Create a Realtime Database and select "Testing mode", you can change this later.
5. Add values into your database in the following structure:

    ```bash
    {
        "trackers": {
            "esp32_1": {
                "isLocked": true,
                "lat": 0,
                "lng": 0
            }
        }
    }
    ```

6. Finally, create a web app from your project settings, follow through with the steps (selecting the default) and copy the Firebase configuration into the file named `firebaseConfig.js`, only replacing the following with the correct values
    ```js
    const firebaseConfig = {
        apiKey: null,
        authDomain: null,
        databaseURL: null,
        projectId: null,
        storageBucket: null,
        messagingSenderId: null,
        appId: null,
    };
    ```

### Managing dependencies

1. Make sure you have [Node.js](https://nodejs.org/en/download) installed.
2. Go to the project directory.
3. Run in the terminal:
    ```bash
    npm install
    ```
4. After completion, run:
    ```bash
    npm run dev 
    ```
5. Click on the generated local link (this will open a new tab in your browser) 
6. Congratulation the application is running locally. 
