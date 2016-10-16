# Protractor E2E GUI Test Automation

###What's this

I think everyone using Protractor to test their AngularJS web app should be able to straightaway:

- Run the tests with multi-capabilities (run every test in different browsers)
- Run every test in parallel (file sharding)
- Have an XML JUnit format report already consolidated that supports multi-capabilities and file sharding
- Have a neat HTML format report with screen captures that supports multi-capabilities and file sharding
- Be able to run all tests or a subset of tests with one simple command (we used grunt)

So this project, called ruru, is one Protractor configuration put together to meet these requirements. We will include other stuff we like or think is useful and Protractor does not come out of the box with.


###Requirements:

1. You should have Java Development Kit installed in your system to be able to run Selenium tests

2. Install Grunt-cli


###Give it a go

If the generator didn't already do it for you, you will need to run npm install and grunt install:

```
$ npm install

$ grunt install
```

Otherwise just run all tests by:

```
$ grunt
```

###From here on

Create test specs in tests/e2e/specs

Create page objects in tests/e2e/pageobjects

And test away.


##Parameterized execution

We are using grunt-protractor-runner so you will be able to pass parameters by the command line such as:
```
$ grunt --baseUrl http://www.angularjs.org --suite myTestSuite --seleniumAddress http://199.99.99.100:4444/wd/hub
```


##What is a ruru?
The ruru is the morepork owl http://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/morepork-ruru/ In Maori tradition this owl is seen as a guardian, its "ru-ru" chant can mean a good sign of things to come or its high pitched cry can mean bad news.