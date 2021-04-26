# USA Weather
This is a React application that uses D3.js to render a map of the United States. A user can click on the map to find both the current weather and the 10-day forecast of the closest city near the click.

Explor Online: https://usa-weather.netlify.app/

## Language and Tools

- [D3.JS](https://d3js.org/)
- [Visual Crossing API](https://www.visualcrossing.com/)
- [IQ Air API](https://www.iqair.com/us/air-pollution-data-api)

## About
See the current weather of a city.

![Current Weather](https://i.imgur.com/6hjEOVt.png)

See the forecast - the minimum, average and maximum temperatures.
![Forecast](https://i.imgur.com/NnNqKUK.png)

## Setup
1. Make sure that `node` is installed on your local machine.
If you're using [Homebrew](https://brew.sh/)

```
brew install node
```

2. Clone down the project.

```
git clone git@github.com:HyeokJungKim/USA-Weather.git
cd USA-Weather
```

3. Download all the dependencies.
```
npm install
```

4. Create a `.env` file with the following keys:
```
REACT_APP_AIRVISUAL_API= <KEY FROM THE IA AIR API>
REACT_APP_VISUALCROSSING_API= <KEY FROM THE VISUAL CROSSING API>
```

5. Start the app on <http://localhost:3000/>.
```
npm start
```
