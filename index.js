import express from "express";
import axios from 'axios';
import cheerio from 'cheerio'

const PORT = 8000;
const app = express()

const teams = []
const riders = []

const mainUrl = "https://www.procyclingstats.com/"

app.get('/', (req, res) => {

    const welcomeMessage = {
        "Title": "Cycling API powered by data from Pro Cycling Stats",
        "Author": "Dawid Budziński - Code: Archer",
        "Endpoints": {
            "Welcome": "/",
            "List of teams": "/teams",
            "Specific team": "/teams/:team => where :team is a shortUrl data from main list of teams",
            "Riders": "/riders => with Points per race day ranking",
            "Specific rider": "/riders/:name => where :name is a shortUrl data from main list of riders"
        },
        "Data from": mainUrl,
        "GitHub project info": {
            "Project repository": "https://github.com/BD4vid777/Cycling_API",
            "API Stack": ["express", "axios", "cheerio"],
            "FRONT Stack": ["Angular", "Angular Material"]
        },
        "Support": "https://buymeacoffee.com/codearcher",
        "Issues submit": "https://github.com/BD4vid777/Cycling_API/issues",
        "Endpoints requests": "https://github.com/BD4vid777/Cycling_API/issues/1"
    }

    res.json(welcomeMessage)
})

app.get('/teams', (req, res) => {
    axios.get('https://www.procyclingstats.com/rankings/me/teams')
        .then(response => {

            const html = response.data
            const $ = cheerio.load(html)
            const main = $('main')

            const title = main.children('h1').text()
            const subtitle = main.children('span.red').text()
            teams.push(`${title} - ${subtitle}`)

            const tr = $('tbody tr');

            tr.each(function () {
                const position = $(this).children().first().text()
                const before = $(this).children('td.cu600.fs10').text()
                const name = $(this).children('td').children('a').first().text()
                const country = $(this).children('td').eq(3).children('span').attr('class').split(" ")[1]
                const url = $(this).children('td').children('a').first().attr('href')
                const teamClass = $(this).children('td.cu600').last().text()


                teams.push({
                    position: position,
                    before: before,
                    name: name,
                    countryCode: country,
                    countryFlag: `https://flagcdn.com/24x18/${country}.png`,
                    shortUrl: url.slice(5),
                    url: mainUrl + url,
                    teamClass: teamClass
                })
            })
            res.json(teams)
        }).catch((err) => console.error(err))
})

app.get('/teams/:team', (req, res) => {

    const team = []
    const teamRiders = []
    const staff = []
    const lastVictories = []
    const topResults = []

    const url = `https://www.procyclingstats.com/team/${req.params.team}`

    axios.get(`${url}`)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const mt20 = $('.mt20')
            const main = $('.main')

            /* Team Main Info */
            const name = main.children('h1').text()
            const country = main.children('span').eq(0).attr('class').split(" ")[1]
            const infolist = $('.infolist')
            const abbreviation = infolist.children('li').eq(1).children('div').eq(1).text()
            const bike = infolist.children('li').eq(2).children('div').eq(1).text()
            const shirt = infolist.children('li').eq(3).children('div').eq(1).children('img').attr('src')

            /* Team Social Sites */
            const sites = $('.list.horizontal.sites')
            const instagram = sites.children('li:contains("instagram")').children('a').attr('href')
            const facebook = sites.children('li:contains("facebook")').children('a').attr('href')
            const site = sites.children('li:contains("site")').children('a').attr('href')
            const twitter = sites.children('li:contains("twitter")').children('a').attr('href')

            /* Team Riders */
            const ridersData = $('.photos').children('li')
            ridersData.each(function () {
                const rider = $(this).text()
                const riderPhoto = $(this).children('a').css('background').split(" ")[0].substring(4).replace(")","")

                teamRiders.push({
                    rider,
                    photo: `${mainUrl}${riderPhoto}`
                })
            })

            /* Team Staff */
            const staffData = mt20.children('h3:contains("Staff")').next('table').children('tbody').children('tr')
            staffData.each(function () {
                const name = $(this).children('td').eq(0).children('a').text()
                const position = $(this).children('td').eq(1).text();
                const url = $(this).children('td').eq(0).children('a').attr('href');

                staff.push({
                    name,
                    position,
                    staffUrl: `${mainUrl}${url}`
                })
            })

            /* Team Last Victories */
            const lstVic = mt20.children('h3:contains("Last victories")').next('table').children('tbody').children('tr')
            lstVic.each(function () {
                const nr = $(this).children('td').eq(0).text();
                const raceName = $(this).children('td').eq(1).children('a').text();
                const raceClass = $(this).children('td').eq(2).text();
                const rider = $(this).children('td').eq(3).text();

                lastVictories.push({
                    "Win number": nr,
                    "Name of race": raceName,
                    "Class of race": raceClass,
                    "Winner": rider
                })
            })

            /* Team Top results */
            const topRes = $('.mt30').children('h3:contains("Top results")').next('table').children('tbody').children('tr')
            topRes.each(function () {
                const result = $(this).children('td').eq(0).text();
                const raceName = $(this).children('td').eq(1).children('a').text();
                const raceClass = $(this).children('td').eq(2).text();
                const rider = $(this).children('td').eq(3).text();

                topResults.push({
                    result,
                    "Name of race": raceName,
                    "Class of race": raceClass,
                    "Rider": rider
                })
            })

            /* Team JSON Response */
            team.push({
                "Main info": {
                    name,
                    countryCode: country,
                    countryFlag: `https://flagcdn.com/24x18/${country}.png`,
                    abbreviation,
                    bike,
                    shirtImg: `${mainUrl}${shirt}`
                },
                "Social": {
                    website: site,
                    twitter,
                    facebook,
                    instagram
                },
                teamRiders,
                staff,
                lastVictories,
                topResults
            })

            res.json(team)
        })
        .catch(err => console.error(err))

})

app.get('/riders', (req, res) => {
    axios.get("https://www.procyclingstats.com/statistics/riders/points-per-raceday")
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            const tr = $('tbody tr');

            tr.each(function () {
                const position = $(this).children().first().text()
                const name = $(this).children('td').children('a').text()
                const country = $(this).children('td').eq(1).children('span').attr('class').split(" ")[1]
                const url = $(this).children('td').children('a').attr('href')
                const pointsperraceday = $(this).children('td').eq(2).text()
                const points = $(this).children('td').eq(3).text()
                const racedays = $(this).children('td').eq(4).text()

                riders.push({
                    position,
                    name,
                    countryCode: country,
                    countryFlag: `https://flagcdn.com/24x18/${country}.png`,
                    ":name for riders/:name endpoint": url.slice(6),
                    "points per raceday": pointsperraceday,
                    points,
                    racedays
                })
            })
            res.json(riders)
        }).catch(err => console.error(err))
})

app.get('/riders/:name', (req, res) => {

    const rider = []
    const topResults = []
    const pcsPositions = []
    const teamsRides = []
    const url = `https://www.procyclingstats.com/rider/${req.params.name}`

    axios.get(`${url}`)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            /* Rider Main Info */
            const main = $('.main')

            const name = main.children('h1').text()
            const team = main.children('span.red').text()
            const country = main.children().first().attr('class').split(" ")[1]
            const riderImgUrl = $('.rdr-img-cont').children('a').children('img').attr('src')

            const riderInfo = $('.rdr-info-cont')
            const splitInfo = riderInfo.text().split(" ")

            const dateOfBirth = `${splitInfo[3]} ${splitInfo[4]} ${splitInfo[5]} ${splitInfo[6].slice(0,4)}`
            const weight = `${splitInfo[8]} kg`
            const height = `${splitInfo[12]} m`
            const nationality = riderInfo.children('a').first().text()

            /* Rider Social Sites */
            const sites = $('.list.horizontal.sites')
            const instagram = sites.children('li:contains("instagram")').children('a').attr('href')
            const strava = sites.children('li:contains("strava")').children('a').attr('href')
            const facebook = sites.children('li:contains("facebook")').children('a').attr('href')
            const site = sites.children('li:contains("site")').children('a').attr('href')
            const twitter = sites.children('li:contains("twitter")').children('a').attr('href')

            /* Rider Top Results */
            const topList = $('.list.moblist.flex li.main')
            topList.each(function () {
                const qty = $(this).children('.ar').text()
                const type = $(this).children('div').eq(1).children('.blue').text()
                const race = $(this).children('div').eq(1).children('a').text()
                const years = $(this).children('div').eq(1).children('span').eq(1).text().slice(2)

                topResults.push({
                    races: `${qty}${type} ${race}`.trim(),
                    years
                })
            })

            /* Rider KPI */
            const riderKpi = $('.rider-kpi')
            const wins = riderKpi.children('li').eq(0).children('.nr').text()
            const grandTours = riderKpi.children('li').eq(1).children('.nr').text()
            const classics = riderKpi.children('li').eq(2).children('.nr').text()

            /* Rider PCS Stats */
            const pcsRankingsStats = $('.rdr-season-stats tbody tr')
            pcsRankingsStats.each(function () {
                const season = $(this).children('.season').text()
                const points = $(this).children('.bar').children('.barCont').text()
                const position = $(this).children('.ac').text()

                pcsPositions.push({
                    year: season,
                    points,
                    ranking: position
                })
            })

            /* Rider Teams*/
            const rdrTeams = $('.rdr-teams li')
            rdrTeams.each(function () {
                const year = $(this).children('.season').text()
                const team = $(this).children('.name').children('a').text()
                const teamClass = $(this).children().eq(2).text().trim()

                teamsRides.push({
                    year,
                    team,
                    teamClass
                })
            })

            /* Rider JSON Response */
            rider.push({
                "Main info": {
                    name,
                    team,
                    "date of birth (years)": dateOfBirth,
                    weight,
                    height,
                    nationality,
                    countryCode: country,
                    countryFlag: `https://flagcdn.com/24x18/${country}.png`,
                    "riders photo url": mainUrl + riderImgUrl
                },
                "Social": {
                    strava,
                    facebook,
                    instagram,
                    twitter,
                    website: site
                },
                "Key Statistics": {
                    "Wins": wins,
                    "Grand Tours Ridden": grandTours,
                    "Classics Ridden": classics
                },
                "Top results": topResults,
                "PCS Ranking position per season": pcsPositions,
                "Teams": teamsRides
            })

            res.json(rider)
        }).catch(err => console.error(err))
})

app.get("/shieldsIO_Badge", (req, res) => {

    const badgeIO = {
        "schemaVersion": 1,
        "label": "Test ENDPOINT",
        "message": "Passed - API working",
        "color": "success"
    }

    res.json(badgeIO)
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
