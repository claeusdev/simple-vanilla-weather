window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature_description'
  );
  let temperatureDegree = document.querySelector('.temperature_degree-number');
  const locationTimeZone = document.querySelector('.location_timezone');
  const iconElem = document.querySelector('#icon1');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/4846c6ad69c6603ba4cde2e5c9d6bc4f/${lat},${long}`;
      fetch(api)
        .then((r) => {
          return r.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;

          temperatureDegree.textContent = (
            ((temperature - 32) * 5) /
            9
          ).toFixed(2);
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          setIcons(icon, iconElem);
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: 'black' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
