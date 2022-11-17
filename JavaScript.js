const CLIENT_ID = '94d397db951549bbae0e8996e31aafc3';
const CLIENT_SECRET = '58037c60e9cd4e30b35cbd0eb09d49e9';

let token;

    fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  body: 'grant_type=client_credentials',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  },
}).then((response) => {
  response.json().then((data) => {
    token=data.access_token
    console.log( token);
    localStorage.setItem('Token',token)
   
   
  })
  .catch(error => {
    console.log(error);
})
  
});
var search;
function change(){
   search=document.getElementById('value').value
}


function sea(){
 
    localStorage.setItem('search',search)
   }
  
  
  
   const a=document.getElementById('search').addEventListener('click',data)
  
  
  function data () {
    let c=localStorage.getItem('search')
    console.log(c)
    getTrackData(c)
    map()
  }
function getTrackData(query) {
    Token1=localStorage.getItem('Token')
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + Token1 },
    }).then((response) =>
      response.json()
      .then((data) => {
         console.log(data)
         localStorage.setItem('items', JSON.stringify(data));
      })
      
    );
  
 
  }



  let items=JSON.parse(window.localStorage.getItem('items'))
//     let track=items.tracks
//    let t= track.items
//     console.log(t)
    const main=document.querySelector('#main')
    
let output=''
const div=document.createElement('div')
div.className='cards'


function map(){
items.tracks.items.map((data,index)=>{
 
  let output=` 
  <div class="card"><img class='images' src="${data.album.images[0].url}"/>
  <h1 class="heading">${data.name}</h1>
  <div class="play"><i class="fa-solid fa-play"id="myBtn " onclick="display('${data.preview_url}' , '${data.album.images[0].url}' , '${data.album.name}')"></i></div>
  
  </div>

  `
     div.innerHTML+=output
      main.appendChild(div)
  
  })}
  console.log(div)


  var audio1;
 const btn=document.getElementById('mybtn')
 var modal = document.getElementById("myModal");
 var span = document.getElementsByClassName("close")[0];
 const head=document.getElementById('heading')
 const img=document.getElementById('img')
 let playpause_btn = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;
let curr_track = document.createElement('audio');
 
 function display (music,image,name) {
  modal.style.display = "block";
img.src=image
  head.innerHTML=name
  curr_track.src=music
 console.log(curr_track)
}

function loadTrack() {

  updateTimer = setInterval(seekUpdate, 1000);


}


span.onclick = function() {
  modal.style.display = "none";
  pauseTrack()
}
 

function playpauseTrack() {
  if (!isPlaying)
   playTrack();
  else pauseTrack();
  }
  
  function playTrack() {
 
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  
  function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
  
  function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
    }
    
  
    
    function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
    
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
 
    }
loadTrack();
      

  

  









  








