const button = document.getElementById("get-location-button");
const container = document.getElementById("eco");


async function getData(lat, long)
{
    const promise = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=930971becfa941f882053344220412&q='+lat+','+long+'&aqi=yes');
        return await promise.json();
}

async function gotLocation(position){
    const result = await getData(position.coords.latitude, position.coords.longitude);
    console.log(result);
    let newData = document.createElement("p");
    newData.textContent = JSON.stringify(result);
    container.appendChild(newData);
}

function failedToGet()
{
    console.log("There was some issue");
}

button.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});





