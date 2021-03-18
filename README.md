# SciCat Landing Page Server


[![Build Status](https://github.com/SciCatProject/LandingPageServer/actions/workflows/test.yml/badge.svg?branch=develop)](https://github.com/SciCatProject/LandingPageServer/actions)
[![DeepScan grade](https://deepscan.io/api/projects/3011/branches/23762/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=3011&bid=23762)
[![Known Vulnerabilities](https://snyk.io/test/github/SciCatProject/LandingPageServer/develop/badge.svg)](https://snyk.io/test/github/SciCatProject/LandingPageServer/develop)
[![DOI](https://zenodo.org/badge/141108894.svg)](https://zenodo.org/badge/latestdoi/141108894)

![scicat logo2](https://github.com/garethcmurphy/landing_page_server/blob/develop/src/assets/esslogo.png)


A landing page server for publically accessible DOI datasets in SciCat

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Angular 8
Node 10
catamel
mongodb
```

### Installing

A step by step series of examples that tell you have to get a development env running

How to install:

```
npm install
set $env to one of the environment file e.g. 
export env=development
npm run build
```

How to run:

```
npm start
```


## Running the tests

Unit tests 

```
npm test
```


### End to end tests

e2e tests check content is rendered correctly
```
npm run e2e
```



## Deployment

Deploy with Docker

## Built With

* [NPM](http://npmjs.com) - node package manager
* [Node](https://nodejs.org/) - node javascript runtime
* [Angular](https://angular.io) - Web framework

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/garethcmurphy/landing_page_server/tags). 

## Authors

* **Gareth Murphy** - *Initial work* - [garethcmurphy](https://github.com/garethcmurphy)

See also the list of [contributors](https://github.com/scicatproject/landingpageserver/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* ESS, PSI

