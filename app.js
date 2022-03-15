/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'1'+'.'+ d.getDate()+'.'+ d.getFullYear();
// base url and apikey
let baseURL ='https://api.openweathermap.org/data/2.5/weather?zip'
let apiKey='&appid=c83395b55cbc02440bef4e57a975d9a5&units=metric';
// add function to html
document.getElementById('generate').addEventListener('click',peformAction);
//const btn= document.querySelector('#generate');

// function to get web api data
function peformAction(e){

const newZip=document.getElementById('zip').value;
const feelings=document.getElementById('feelings').value;
getWeather(baseURL,newZip,apiKey)
.then(function(data){
    console.log(data);
    postData('/add',{date:d,temp:data.list[0],content:feelings})
    updateUI();
})
};

const getWeather = async (baseURL,zip,Key) => {
    const request = await fetch(baseURL+zip+Key);
    try{
      const data = await request.json();

      return data;
  
    }catch(error){
      console.log("error", error);
    }
  }

  // function to post data
  const postData = async ( url = '', data = {})=>{
console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(data);
      return newData
    }catch(error) {
    console.log("error", error);
    }
}
// function to GET project data
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML =`date: ${allData[0].date}`;
      document.getElementById('temp').innerHTML =`temperature: ${allData[0].temp}`;
      document.getElementById('content').innerHTML =`I feel: ${allData[0].content}`;
  
    }catch(error){
      console.log("error", error);
    }
  }