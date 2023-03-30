let weather = {
    apiKey: "e3eb45e31337d2dd04cd94be5a2bb746",
    fetchWeather: function(city) {
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey,
        method: "GET",
        success: function(data) {
          weather.displayWeather(data);
        },
        error: function() {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
      });
    },
    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      $(".city").text("Weather in " + name);
      $(".icon").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
      $(".description").text(description);
      $(".temp").text(temp + "°C");
      $(".humidity").text("Humidity: " + humidity + "%");
      $(".wind").text("Wind speed: " + speed + " km/h");
      $(".weather").removeClass("loading");
      $("body").css("background-image", "url('https://source.unsplash.com/1600x900/?" + name + "')");
    },
    search: function() {
      this.fetchWeather($(".search-bar").val());
    },
  };
  
  $(".search button").on("click", function() {
    weather.search();
  });
  
  $(".search-bar").on("keyup", function(event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  weather.fetchWeather("Lagos");
