/* Global Variables */
const zipCode =  document.getElementById('zip').value;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&APPID=8c5af97b42baa34ed4df398ff2a007e3';

document.getElementById('generate').addEventListener('click', performAction); // action when generate button is clicked

// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2
function performAction(e){
  const feelings = document.getElementById('feelings').value;
  const zipCode =  document.getElementById('zip').value;
  const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
  
  getData(baseURL , zipCode , apiKey )
  .then (function(data) {
      // body...
      console.log(data)
      postData('/addData' ,{temp:data.main.temp ,date:newDate, feelings: feelings} )
      //updateUI()
  })
  .then(
      updateUI()
  )
  };
  
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
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          temp: data.temp,
          date: data.date,
          feelings: data.feelings
      })
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
const updateUI = async() => {
  const request = await fetch('/all');
  try {
      const allData = await request.json();
      const last = allData[allData.length-1]
      console.log(allData);
      // update new entry values
          document.getElementById('date').innerHTML = last.date;
          document.getElementById('temp').innerHTML = last.temp;
          document.getElementById('content').innerHTML = last.feelings;
      
  } catch (error) {
      console.log('error', error);
  }
};
