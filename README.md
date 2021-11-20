<br>
<h3 align=center>Cycling API</h3>

  <p align=center>
    <samp>A free restful API serving selected data from Pro Cycling Stats</samp>
    <br />
    <br />
    <a href="https://rapidapi.com/BD4vid777/api/pro-cycling-stats/"><strong>Explore the api »</strong></a> <br>
    <a href="#" style="pointer-events: none"><strong>Check API usage (Coming soon)»</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/BD4vid777/Cycling_API/issues">Bug report</a>
    ·
    <a href="https://github.com/BD4vid777/Cycling_API/issues/1">More Endpoints requests</a>
  </p>

<br/>

![GitHub top language](https://img.shields.io/github/languages/top/BD4vid777/Cycling_API)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/BD4vid777/Cycling_API)
![GitHub package.json version](https://img.shields.io/github/package-json/v/BD4vid777/Cycling_API)
![Website](https://img.shields.io/website?label=Published%20at&up_message=RapidAPI&url=https%3A%2F%2Frapidapi.com%2FBD4vid777%2Fapi%2Fpro-cycling-stats%2F)
![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fpro-cycling-stats-api.herokuapp.com%2FshieldsIO_Badge)

### Usage - endpoints

**GET All Teams - JS with RAPID API SIGN UP**

```javascript
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://pro-cycling-stats.p.rapidapi.com/teams',
  headers: {
    'x-rapidapi-host': 'pro-cycling-stats.p.rapidapi.com',
    'x-rapidapi-key': 'SIGN-UP-IN-RAPIDAPI.COM-FOR-KEY'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

```

Via browser - https://pro-cycling-stats-api.herokuapp.com/teams

```json
[
    {
        "position": "1",
        "before": "1",
        "name": "Deceuninck - Quick Step",
        "countryCode": "be",
        "countryFlag": "https://flagcdn.com/24x18/be.png",
        "shortUrl": "deceuninck-quick-step-2021",
        "url": "https://www.procyclingstats.com/team/deceuninck-quick-step-2021",
        "teamClass": "WT"
    },
    {
        "position": "2",
        "before": "4",
        "name": "INEOS Grenadiers",
        "countryCode": "gb",
        "countryFlag": "https://flagcdn.com/24x18/gb.png",
        "shortUrl": "ineos-grenadiers-2021",
        "url": "https://www.procyclingstats.com/team/ineos-grenadiers-2021",
        "teamClass": "WT"
    },
    {
        "position": "3",
        "before": "2",
        "name": "Team Jumbo-Visma",
        "countryCode": "nl",
        "countryFlag": "https://flagcdn.com/24x18/nl.png",
        "shortUrl": "team-jumbo-visma-2021",
        "url": "https://www.procyclingstats.com/team/team-jumbo-visma-2021",
        "teamClass": "WT"
    } (...)
]
```

### Techstack

* [Express.js](http://expressjs.com/) - Minimalist web framework for node.
* [Axios](https://axios-http.com/) - Promise based HTTP client
* [Cheerio.js](https://cheerio.js.org/) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.
* [Angular](https://angular.io/) - Frontend framework 

* API frontend deployed via [Netlify](https://www.netlify.com/)
* API server deployed via [Heroku](https://pro-cycling-stats-api.herokuapp.com/)
* API published on [RapidAPI](https://rapidapi.com/)

<br/>

### About

I made this API as a side project for my portfolio and learning purposes.


### Support

If you use the api in your projects then consider showing some support with a cup of coffee.

<a href="https://www.buymeacoffee.com/codearcher" title="Support my work"><img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" height="35px"/></a>

<br/>

<!-- CONTRIBUTING -->
### Contributing

- For new ENDPOINTS requests please [add comments here](https://github.com/BD4vid777/Cycling_API/issues/1).
- And for any bug or issues - [Submit it here](https://github.com/BD4vid777/Cycling_API/issues).

Also please see the [open issues](https://github.com/BD4vid777/Cycling_API/issues/1) for a list of proposed features before submitting one.

<br/>

<!-- LICENSE -->
### Copyright

Copyright © 2021 [Code: Archer - Dawid Budziński](https://github.com/BD4vid777)
