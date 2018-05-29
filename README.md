# Prediction App

Simple web application which allows you to predict football matches during World Cup 2018 in Russia (and next events in the future).

## Getting Started

Application will be available online (link soon). To run it locally, use docker script (soon).

### Prerequisites

For development, you need:
- [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Node JS >= 8.9](https://nodejs.org/en/download/)

For **front-end** development you need to install at least `@angular/cli @ 6.0.5`. To do it, type in your console:

```
npm install -g @angular/cli@6.0.5
```

After that, go to the `client` folder nd install needed packages by `install` npm command:

```
cd client
npm install
```

To run front-end in development mode, just type:

```
ng serve
```

Client should be available on `http://localhost:4200` address. Also, web client has a proxy in development mode which sends request to server on `http://localhost:8080` address.

For **back-end**, you need to build gradle project. To do this, can go to the `server` folder in the main project folder. There, you can just run `assemble` gradle task.

```
cd server
./gradlew assemble
```

Before you run program in dev mode, you need to provide file with users. To do this, create `users.csv` file in `/server/src/main/resources/db/changelog/samples` folder. This file should looks like this:

```
USR_LOGIN;USR_EMAIL;USR_ROLE;USR_FIRST_NAME;USR_LAST_NAME;USR_ENABLED;USR_CREATED
login1;mail@user1.com;REGULAR;name1;surname1;true;'2018-05-27'
login2;mail@admin1.com;ADMIN;admin1;adminsurname1;true;'2018-05-27'
```

You can also write a message to me. Maybe I will send you a valid file ;)

First line is mandatory. In the next lines, you can see other users. No passwords stored because authentication is based on external systems.

For development mode, this external system is...flag with configuration :). To set your user name which should be logged in in a development mode, go to `/server/src/main/resources/application-dev-ms.yml` and find `spring.security.static-user` property. Value of this property is a login of logged in user in development mode.

To run back-end in development mode (no change profile!), just type

```
./gradlew bootRun
```

Of course, you can use your IDE to do some things easier. Note that default profile is a `dev-ms`. To change it, go to `/server/src/main/resources/application.yml` and change `spring.profiles.active` property on name of your profile.

Server should be available on `http://localhost:8080` address.

### Installing

For now, we don't have production version. Instruction will be available after first release.

## Running the tests

To run **front-end** unit tests, go to the `client` folder and run `test` ng task:

```
cd client
ng test
```

To run **back-end** unit tests, go to the `server` folder and run `test` gradle task:

```
cd server
./gradlew test
```

### Coding style tests

For **front-end**, we use [ESLint](https://eslint.org/) to verify our code. You need to configure linter for yourself with IDE to check continuously your code. If you want to check it from console, just type:

```
cd client
ng lint
```

For **back-end**, we use [KtLint](https://ktlint.github.io/) to verify our code. You need to configure linter for yourself with IDE to check continuously your code. If you want to check it from console, just type:

```
cd server
./gradlew lintKotlin
```

## Deployment

For now, we don't have production version. Instruction will be available after first release.

## Built With

* [Gradle](https://gradle.org/) - Back-end dependency management
* [npm](https://www.npmjs.com) - Front-end dependency management

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ArturCzopek/prediction-app/tags). 

## Authors

* **Artur Czopek**  - *developer* - [SimpleCoding blog](https://simplecoding.pl)

## To do - 1.0

- [ ] - BE - logging configuration
- [ ] - FE - adding match result (only admin user)
- [ ] - FE - adding user type/prediction
- [ ] - FE - whole ranking table
- [ ] - FE - not found page
- [ ] - D - installation instruction

## To do - 1.1

- [ ] - BE/FE - tests
- [ ] - BE - CI/CD process
- [ ] - BE/FE - fb oauth security
- [ ] - BE/FE - AWS deployment
- [ ] - I - license

## Todo - 1.2

- [ ] - FE - privacy policy etc


## Done
- [x] - BE - Database structure
- [x] - BE - Liquibase integration with database
- [x] - BE - security integration with waffle
- [x] - BE - match functionality, adding new, adding results
- [x] - BE - result functionality, calculating table, calculating match etc
- [x] - BE - type functionality, adding type by user
- [x] - BE - provided sample data
- [x] - FE - beautiful match card with match time, result, user points etc
- [x] - FE - front-end integration with security
- [x] - FE - nice loader :)
- [x] - BE - gradle build task for building front-end and copying files to jar + tests if it works ofc
- [x] - BE - introducing whole WC 2018 calendar
- [x] - BE - connection to mysql based on envs
- [x] - FE - case handling on match card (add type only if match has not started yet)
- [x] - FE - adding new match (only admin user)


## License

// TODO 
