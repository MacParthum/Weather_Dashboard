var apiKey = "c7f874b0c6f8219e0ea1d8074ac09d1e"
var prevSearch = JSON.parse(localStorage.getItem("weather")) || []
console.log(prevSearch)
function showWeather(city) {
    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
        .then(function (res) {
            $("#currentWeather").empty()
            console.log(res)
            var jumbotron = $("<div>").addClass("jumbotron ")
            var cityName = $("<h2>").text(res.name + " (" + moment.unix(res.dt).format('L') + ')')
            var img = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + ".png")
            cityName.append(img)
            var tempText = $("<div>").text("Temperature: " + res.main.temp + " F°")
            var humidity = $("<div>").text("Humidity: " + res.main.humidity + " %")
            var wind = $("<div>").text("Wind Speed: " + res.wind.speed + "")
            $.get("https://api.openweathermap.org/data/2.5/uvi?lat=" + res.coord.lat + "&lon=" + res.coord.lon + "&appid=" + apiKey)
                .then(function (uvRes) {
                    var uv = $("<div>").text("UV Index: " + uvRes.value)
                    jumbotron.append(cityName, tempText, humidity, wind, uv)
                    $("#currentWeather").append(jumbotron)
                })
        })
    // for (let i = 0; i < 5; i++) {
    //     var card = $("<div>").addClass("card bg-primary col-md-2 text-light")
    //     var date = $("<div>").text("8/13/2020")
    //     var temp = $("<div>").text("Temp: 86.27 F")
    //     var humidity = $("<div>").text("Humidity: 68%")
    //     card.append(date, temp, humidity)
    //     $("#futureWeather").append(card)
    // }
}
function renderList() {
    $("#citySearch").empty()
    for (let i = 0; i < prevSearch.length; i++) {
        var div = $("<div>").text(prevSearch[i])
        div.addClass("past text-center py-1 bg-light mb-1")
        div.attr("data-city", prevSearch[i])
        $("#citySearch").prepend(div)
    }
}
$(".btn-primary").on("click", function () {
    var city = $("#cityName").val()
    prevSearch.push(city)
    localStorage.setItem("weather", JSON.stringify(prevSearch))
    renderList()
    showWeather(city)
})
$("#citySearch").on("click", ".past", function () {
    var prevCityName = $(this).attr("data-city")
    showWeather(prevCityName)
})
function init() {
    showWeather(prevSearch[prevSearch.length - 1])
}
init()
renderList()