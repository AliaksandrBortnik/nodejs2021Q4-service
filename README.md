# RS School REST service

Don't forget to switch to ```task5-ts``` branch and `cd nodejs2021Q4-service`.

To generate documentation, use `npm run doc`. Then open `docs` folder in the project, where you can find the result and open `index.html` in your browser.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

### Auto-fix and format

```
npm run lint
```
