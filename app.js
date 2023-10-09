const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const userLocation = req.body.user
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&appid=7acc92e1e1eec771f1c1b00a228c73eb"
    https.get(url, function (response) {
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const weatherTemp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const weatherImg = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p> The Weather is currently " + weatherDesc + " </p>")
            res.write("<h1>The temperature in " + userLocation + " is " + weatherTemp + " degree celcius</h1>")
            res.write("<img src = " + weatherImg + " >")
            res.send()
        })
    })
})

app.listen(3000, function () {
    console.log("The server was start at port number 3000")
})