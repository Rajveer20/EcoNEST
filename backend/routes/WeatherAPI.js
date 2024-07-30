async function getData(lat, long)
{
    const promise = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=930971becfa941f882053344220412&q='+lat+','+long+'&aqi=yes');
        return await promise.json();
}

async function getLocation(position){
    const result = await getData(position.coords.latitude, position.coords.longitude);
    if(result){
        console.log(result);
    }else{
        console.log("WeatherApi Failed to fetch data");
    }
}

export default getLocation();