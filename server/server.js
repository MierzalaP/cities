Meteor.methods({
    getWeatherData:(city)=>{
      try {
        let result = HTTP.get("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&appid=c6ffc0a1962718b7336b4b16714e5efd");
        return result.data;
      } catch (e) {
            console.log("err",e);
            return e;
      }
  }
});
