This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run the following commands using `make` command:(Refer `Makefile` inside root folder)

| Command         | Action                                                                                                                                                                                                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `make develop`  | Runs the app in the development mode.<br>Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>A mock server will also be spawn at [http://localhost:5000](http://localhost:5000).<br>The page will reload if you make edits.<br>You will also see any lint errors in the console. |
| `make start`    | Runs only the react app at [http://localhost:3000](http://localhost:3000)                                                                                                                                                                                                                                      |
| `make install`  | Install the npm dependencies with frozen lock file                                                                                                                                                                                                                                                              |
| `make build`    | Builds the app for production to the `build` folder.<br>It correctly bundles React in production mode and optimizes the build for the best performance.<br>The build is minified and the filenames include the hashes.<br>Your app is ready to be deployed!                                                    |
| `make test`     | Launches the test runner in the interactive watch mode.                                                                                                                                                                                                                                                        |
| `make coverage` | Generates test coverage.                                                                                                                                                                                                                                                                                       |
| `make lint`     | Launches EsLint.                                                                                                                                                                                                                                                                                               |
| `make prettier` | Formats the javascript-css-md files as per specification.                                                                                                                                                                                                                                                      |

### Steps to start development

1. `git clone <repository_url>`
2. `make install` (_NB: <span style="color:orange">Don't run npm install always run `make install` for consistency in package libarary versions.</span>_)
3. `make develop`
4. Make the code changes and when the code is ready to push follow:
5. `git add`
6. `git commit` - git commit has a pre-hook which automatically runs prettier and adds the formatted code to the commit incase you have forgotten to run prettier.
7. `git push`

## Architectural Decision Records

Project related Architectural decision are recorded for historical references. They can be found here at
* [ADR index](doc/adr/README.md)
