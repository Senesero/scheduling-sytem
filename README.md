# Required requirements

## Task

You are required to implement an application using React Framework that implements the following:

- List, create, view, edit and delete game presenters
- List, create, view, edit and delete tables
- Use proper validation techniques when creating and editing data
- Mock the backend API and set up mock data accordingly
- Navigate between screens
- Compute the rotation schedule of game presenters for a single day (3 shifts) and display it on screen using components of your choice.

## Additional Challenges

You can boost your solution by implementing the following optional challenges:

- Typescript Write your code using typescript.
- Security Implement a login screen such that only authenticated users can make use of the application. In addition, implement permission based access for certain screens, components and/or actions.
- Configurable List View Allow users to switch between 2 visualization techniques in order to list the game presenters on screen.
- Loading Component Display some sort of loading/skeleton components when loading data.
- Docker Create a Dockerfile (and an optional docker compose file) and provide instructions on how to build and run the application.

# Run the app

### `npm install`

Install project dependencies.

### `npm run server`

Will start a server. The server data is in the file “db.json”

### `npm start`

In another console, execute the "npm start" command to launch the application, which will open at [http://localhost:3000](http://localhost:3000)

### `npm run test`

It will execute the unit tests configured in the application

# Explanation design and solution

For the implemented solution we have 3 main scenarios:

### `Employees not logged in`

In this scenario, only the "Home" screen is available, in which a form is displayed for the employee to log in.
All paths show “Page not found” except the root path.
The form has validations to check if the fields have been filled in, if not, it shows a "Field required" message.
After entering a correct username and password, it will take us to one of the other two scenarios.
A button to register an employee has not been enabled. It has been suggested that bosses are added by another method. And to register a presenter, a boss has to register it.

### `Presenters`

To enter this mode we can enter “Presenter2” in user and password, logging in as presenter.
When a user has logged in, a "Close session" button appears at the top right, which will cause a logout.
If after logging out we are not in "Home", the application will take us to "Home" to be able to log in again and not stay in a "Page not found" path.
The presenter has the following screens:

- Home: where you are welcomed
- Presenters: where the data of the logged-in presenter will be displayed and with a "Modify Presenter" button which, if pressed, takes us to a form to modify the data of the logged-in user.
- Schedule: Shows the schedule of the day and highlighted in green the shift that has to work.

### `Boss`

To enter this mode we can enter "Boss" in username and password, logging in as boss.
The boss has all of the options described previously in the presenter plus the following:

- Presenters: The boss can see, modify and delete the data of all registered presenters.
- Tables: It has a view to be able to see, modify or delete game tables
- Schedule: It has a form to select the preferences of the employees, the available tables and the duration of each shift.
  After configuring the form, the boss will press "Calculate turns" which will calculate the turns for each presenter at each table. There are several validations to verify, for example, that not all employees have the same priority selected, or that there are enough presenters to cover all the selected tables in all shifts.

# Limitations and improvements

## `Limitations`

I find the main limitation in the "Schedule" screen, since the design is fine for few users but if we had many employees it would be a bad distribution of the data and the screen design would have to be rethought.

## `Improvements`

- The main improvement would be to add Redux. The reason is that "presenters" and "tables" are propagated from the App component to practically all the components of the application. Using the Redux function useSelector in each of the components would save us a lot of propagation of these objects.
- Add more unit tests, since I haven't had time to configure many.
- Configure that there may be several bosses and that they cannot modify the data between them
- Give a nice design to the “Page not found” screen

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
