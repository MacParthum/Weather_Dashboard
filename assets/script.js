var apiKey = "c7f874b0c6f8219e0ea1d8074ac09d1e"
var prevSearch = JSON.parse(localStorage.getItem("weather")) || []
console.log(prevSearch)
const fiveDayWeather = city => {
    $.get("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey)
        .then(data => {
            console.log(data)
            // loop over all forecasts (by 3-hour increments)
            for (var i = 0; i < data.list.length; i++) {
                // only look at forecasts around 3:00pm
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    // create html elements for a bootstrap card
                    var col = $("<div>").addClass("col-md-2");
                    var card = $("<div>").addClass("card bg-primary text-white");
                    var body = $("<div>").addClass("card-body p-2");

                    var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());

                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

                    var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                    var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                    // merge together and put on page
                    col.append(card.append(body.append(title, img, p1, p2)));
                    $("#futureWeather").append(col);
                }
            }
        })
}
function showWeather(city) {
    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
        .then(function (res) {
            $("#currentWeather").empty()
            console.log(res)
            var jumbotron = $("<div>").addClass("jumbotron bg-primary text-white")
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

    fiveDayWeather(city)
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


