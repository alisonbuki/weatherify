// Model

var weather = {
  city: '',
  country: '',
  temperature: '',
  description: '',
  humidity: '',
  clouds: ''
};

// View

// Compile the template outside of the function, so that we only do it once
// instead of on every render.

var template;
$(document).ready(function() {
  var templateSource = $('#weather-template').html();
  template = Handlebars.compile(templateSource);
});

function renderWeather() {
  var weatherHtml = template(weather);
  $('#weather').html(weatherHtml);
}

// Controller

$(document).ready(function() {
  // First render
  renderWeather();

  // Setup Listeners
  $('#searchForm').on('submit', function(event) {
    event.preventDefault();

    // Get the values entered by the user
    var city = $('input[name="city"]').val();
    var country = $('input[name="country"]').val();
    var key = 'fed72799a9784ced4139d9d8fd3b29bc';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    url+= city+','+country+'&units=imperial';
    url+='&appid='+key;

    // 1. Make the request to OpenWeatherMap API
    $.get(url, function(data){

      // 2. Update model
      weather.city= city;
      weather.country= country;
      weather.temperature= data.main.temp;
      weather.description= data.weather.description;
      weather.humidity= data.main.humidity;
      weather.clouds= data.clouds.all;

       // 3. Render view
      renderWeather();

    });

   

  });
});
