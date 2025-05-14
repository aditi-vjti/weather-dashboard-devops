document.getElementById('searchBtn').addEventListener('click', getWeather);

const apiKey = 'fa40669a8220f1919ec8e439d0ed7f65';  // Replace with your actual API key

function getWeather() {
  const city = document.getElementById('city').value;
  
  if (city === '') {
    document.getElementById('error').textContent = 'Please enter a city name.';
    return;
  }

  // Clear previous weather or error data
  document.getElementById('weatherData').innerHTML = '';
  document.getElementById('error').textContent = '';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('error').textContent = 'City not found. Please try again.';
        return;
      }

      displayWeather(data);
    })
    .catch(err => {
      document.getElementById('error').textContent = 'Error fetching data. Please try again later.';
    });
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const weatherCondition = weather[0].main.toLowerCase();
  
    const weatherHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}" />
      <p>${weather[0].description}</p>
      <p>Temperature: ${main.temp}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    `;
  
    // Change background based on weather condition
    changeBackground(weatherCondition);
  
    document.getElementById('weatherData').innerHTML = weatherHTML;
  }

function changeBackground(weatherCondition) {
  let backgroundUrl = '';

  switch(weatherCondition) {
    case 'clear':
      backgroundUrl = 'url("https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22sunnyjpeg.jpeg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-04-24T15%3A18%3A59.919Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Fa85358a4fe8543ba%2Fsunnyjpeg.jpeg%3FExpires%3D1840202340%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DkekwIP8ytElcFsCEt9QYWNHbECA3GwHI5sD-trQJUJaARM~0Kaq4tdLS~lY-eYGrkHQ1tmaEg7dho8jydtXWz41xgmqGIMmBvOx-pSUAVhs~-qTla9LaYHTYFsuipjCBiQFchp4yBFQm~VF8bP2tone88-ZD~-5e9BhGbgDgiZghYO7UtEBtm9wMl7qlGAsqRJAzPBy22Vd~uEw8uJT2fseIbaDPyhc5P6Ow-s58im6cWCTukfszj1aYwhtVT373J0vpmpmetJyPu~IBic~wm7U05GDOB6inncjJAYfo4fmU8OItViOzkzNJFS4jyy7nRKCSOndYzJAg8ci8cWM5Qg__%22%7D")'; // Replace with your background image
      break;
    case 'clouds':
      backgroundUrl = 'url("https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22cloudy.jpeg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-04-24T15%3A19%3A29.029Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Fb2dae0e167174c79%2Fcloudy.jpeg%3FExpires%3D1840202369%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3Dxh8uhwU8tTW7HqCYr1zR9dIFAQkQM4f9mSrHwqEOG0utHQRDiL-mKtse4aIkjKcVlPtHhPXn1S2cYPmi2LUQGRdJU1em34fGzKsNyDQOf7ul1dW-1SOGShZv1t5PJklb3xnIfv-H2u9MP~AzJeJrdc0irW9d3PICvRAYkMatJH1qUCVbP3KRI2~3I0WegRAOLZtW-cActdJ02QAXvrOX1YTavevTpapB-3vyVl4C0GPcPWssbB~thRstuW0VaFNf7RQ5m5XM3cIiFm3YdLXHk0p1enyE9-6pWidj88snpxr8ZodOn1Ww0UMYHg6QUbZR53D-3faBGonKHtEa~MsMXA__%22%7D")'; // Replace with your background image
      break;
    case 'rain':
      backgroundUrl = 'url("https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22rainy.jpeg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-04-24T15%3A20%3A02.242Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F5965a96c16774760%2Frainy.jpeg%3FExpires%3D1840202402%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DR9M6eDYAxTRQkJFD8MlBppS2drSqUGsEmN9M6~HYJUTox2jOPmW3Cp2kgTE0zkTgdugZkVF8IDYiDbgfkCenwGTkrN~VULdaqwFEGe363NyjqKwIQF-eVRtqMuCBBh7O6xmTN-BRy9wK-JMgBBe1Y6wB3NrJLDji9yneMDaEQ58xlEwWhrKiu6h1SmdG9H8T4-TNtd0OEVnxdGyLIcs4zSTIZFxqp1HhTW6TcrS0GSFyW9o1nLFoFcfBCt8m7WVPRzNElIkAQmjS7nrDDGIL2ylv7wDV5kDg8GwRrnvp20Fr~FB1easG1WInmrzxcOpTS-NKdhZlIRPIgIHji5NqGg__%22%7D")'; // Replace with your background image
      break;
    case 'snow':
      backgroundUrl = 'url("https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22snowy.jpeg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-04-24T15%3A20%3A31.871Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F991192e0dd8846d5%2Fsnowy.jpeg%3FExpires%3D1840202432%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DZAbmdweuXdPyXnKElvO0jf3uVGcNlt3fQj3ReDsWttPuJLiyXKn4ttb7sxtPk1rmRrdg6rQ6PssSL6V7eFiQze6y6P78lwFu~w7XSDcnH19qQ3-gySwWvotQManJbzyU6OYBnq5s0jEONyJ7qEhw7pf2D81ibRD70VDub-Xe8pENU~eFKSQwDi~y3Nk8rpDPAn5MsndRlv22l3GMz8R6HbEM~cwUpyAFLbcv4CrDMlQ2uF5S1prSoalJVt5WqVM3qjhROHAH~ktr~3iEX8OhTA63x-f7TNrpb6UB4lejxsXOasNrMuq7IJ0uczbHN1-6qkFoLgWEeoMrUmPmp8~HWA__%22%7D")'; // Replace with your background image
      break;
    case 'storm':
      backgroundUrl = 'url("https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22stormy.jpeg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-04-24T15%3A21%3A01.067Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Fc24988b2a3c246f9%2Fstormy.jpeg%3FExpires%3D1840202461%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DochHHMy7uwGGZZCN1eF5pwQi0bPBw3jGp44ZMtZyIsSsGe3-pwI0FM3RMYQzN0AasAgz4znEpKIOyI2HqToR7AJw6Qr2auLrFyaV14KNfm9KDevTBi2vgn-akPUMLTp1WJvstFhLldXuEVjelYwj~B0TL~-sQcU8GT8TuQJ1gy1EGiiCs1GYxEHcQ2DlwcdqYFBum2PDZYcKe4~09mu9Zo-B~OkgQXS-8lerrCm5kyzNdC0mOgsRPyKIZxjMCc8GLk0vVG91hwfg2xp7Al~wX5~-ZAIiIVlGgFUjPtPMgfFdDJQ6UlGeLBlz9FdkKfUyVPTN~JRdK2QN~G5jPp6eIw__%22%7D")'; // Replace with your background image
      break;
    default:
      backgroundUrl = 'url("https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22white.jpeg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-04-24T15%3A21%3A24.397Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F5792dc157fc948cd%2Fwhite.jpeg%3FExpires%3D1840202484%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DnvajjQIqQleA4hVFO8kiQu0ZGZI1XBzAufXMC0P6aoyjqw5E9zVtizs7yDf6AXQYC83BTuBFQns3JxyH0EeDdCo56ertYeHqsekeHuvlEroozUwg2hMrD2JvkMjftgSqR-R61DKJX36usfPy~hM~ZJGGlsszoawhAy3BjXfQ~Y7ywTRK43~5LU8apYBYObZ66tXlkriYjwitNEvrDMDEEteHt7o9MF4RONVhJH-yBzUeKU-EHaBEdGN4~Grrz0-sPMb0e-wNKSKIiFAFzRdho7NgVuuDZPfO8utACLP5RwYgjhYlLVj0C68a2NHS6pu8tcq90JdFV28OaPSGiNyDHQ__%22%7D")'; // Default background
  }

  document.getElementById('background').style.backgroundImage = backgroundUrl;
}

// Toggle theme based on checkbox
document.getElementById('themeToggle').addEventListener('change', toggleTheme);

function toggleTheme() {
  const body = document.body;
  const container = document.querySelector('.container');
  const weatherData = document.querySelector('.weather-data');

  if (document.getElementById('themeToggle').checked) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    container.classList.remove('light-mode');
    container.classList.add('dark-mode');
    weatherData.classList.remove('light-mode');
    weatherData.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    container.classList.remove('dark-mode');
    container.classList.add('light-mode');
    weatherData.classList.remove('dark-mode');
    weatherData.classList.add('light-mode');
  }
}
