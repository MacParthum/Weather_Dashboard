function showWeather() {
    var jumbotron = $("<div>").addClass("jumbotron")

    var cityName = $("<h2>").text("memphis")

    var tempText = $("<div>").text("Temperature: 82.53 F")

    var humidity = $("<div>").text("Humidity: 58%")

    var wind = $("<div>").text("Wind Speed: 10.29 MPH")

    var uv = $("<div>").text("UV Index: 5")

    $("#currWeather").append(jumbotron)


    for (let i = 0; i < 5; i++) {
        var card = $("<div>").addClass("card bg-primary col-md-2 text-light")
        var date = $("<div>").text("8/13/2020")
        var temp = $("<div>").text("Temp: 86.27 F")
        var humidity = $("<div>").text("Humidity: 68%")
        card.append(date, temp, humidity)
        $("#futureWeather").append(card)
    }





}


