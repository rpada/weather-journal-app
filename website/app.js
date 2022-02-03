/* Global Variables */
const zipCode =  document.getElementById('zip').value;
// Create a new date instance dynamically with JS
const d = new Date();
const month = d.getMonth() + 1
const newDate = month +'.'+ d.getDate()+'.'+ d.getFullYear();

// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=' //api call
const apiKey = '&APPID=8c5af97b42baa34ed4df398ff2a007e3'; // my personal API key

document.getElementById('generate').addEventListener('click', performAction); // action when generate button is clicked

// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2
// with help from https://knowledge.udacity.com/questions/790523
function performAction(e){
  const feelings = document.getElementById('feelings').value; //get the feelings input
  const zipCode =  document.getElementById('zip').value; //get the zip code input
  const month = d.getMonth() + 1 //.getMonth indexes starting at 0. Add 1 to make it match our monthly numeric calendar
  const newDate = month +'.'+ d.getDate()+'.'+ d.getFullYear();
  
  getData(baseURL , zipCode , apiKey )
  .then (function(data) {
      postData('/addData' ,{temp:data.main.temp , name: data.name, description:data.weather[0].description, date:newDate, feelings: feelings} )
  }).then(()=> // https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2
      dynamicUI()
  )};
  
// GET data from API function
// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
const getData = async (baseURL, zipCode, apiKey)=>{
  const res = await fetch(baseURL + zipCode + apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  } catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// post the data
// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/3726b76d-b5c9-4c51-b945-7f1a611a2cb4
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    });

try {
    const newData = await response.json();
    console.log(newData);
    return newData
}catch(error){
    console.log("error", error);
}
}
// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2
// and https://review.udacity.com/#!/rubrics/4671/view
const dynamicUI = async() => {
  const request = await fetch('/all');
  try {
      const allData = await request.json();
      const last = allData[allData.length-1]
      console.log(allData);
      // update new entry values
          document.getElementById('name').innerHTML = last.name + ":" + " " + last.description;
          document.getElementById('date').innerHTML = "Today's date is" + " " + last.date;
          document.getElementById('temp').innerHTML = "The temperature is" + " " + last.temp + " " + "degrees Fahrenheit";
          document.getElementById('content').innerHTML = "You are feeling" + " " + last.feelings;
      
  } catch (error) {
      console.log('error', error);
  }
};
