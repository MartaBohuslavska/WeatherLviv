$(document).ready(function() {

    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        time: 'numeric'
    };

    var date = new Date();
    var date1 = date.toLocaleDateString("en-US", options);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var dateString = date.toDateString();

    $(".date").html(date1);
    if (minute < 10) {
        $('.time').html(hour + ':0' + minute);
    } else {
        $('.time').html(hour + ':' + minute);
    }
    $('#dateAndTime').html(dateString + ' ' + hour + ':' + minute);

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19',
        type: "GET",
        dataType: "json",
        success: function(data) {
            var widget = show(data);
            console.log(data);
            $('.parameters').html(widget);
            var iconCode = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $('#icon').attr('src', iconUrl);
            $('#temp').html(data.main.temp + '&deg;C');
            $('.parameters2').html("<p>Feels like: " + data.main.temp + '&deg;C' + "</p>" +
                "<p style='font-size: 20px; font-weight: bold; text-transform: capitalize; '>" + data.weather[0].description + "</p>")
        }
    });

    function show(data) {
        return "<br><p>Humidity: " + data.main.humidity + "%" + "</p>" +
            "<p>Pressure: " + data.main.pressure + " hPa" + "</p>" +
            "<p style='line-height: 50px;'>Wind: " + data.wind.speed + " km/h SSE" + "</p>"
    }

    $(".refresh_link").click(function() {
        location.reload();
    });

});