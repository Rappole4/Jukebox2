	var tracks, player, currentTrack;

document.addEventListener("DOMContentLoaded",function(){

//allows access to sound clouds library
SC.initialize({
	client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

//below allows you to search songs
// SC.get('/tracks',{
// 	q:"pirates"
// }).then(function(response){
// 	console.log(response);
// })

//below all of our created variables
	 tracks = ['66301726','46051523','79084857','2912004','117335458'];
	 players = [];
	 // information = [];
	 currentTrack = 0;
	var plays = document.getElementById("play");
	var stops = document.getElementById("stop");
	var next = document.getElementById("next");

//Add extra song to list
function jukeBox(){
	this.addSong = function(track){
		tracks.push(track);
	}
	// this.addInfo = function(inform){
	// 	information.push(inform);
	// }
	// this.listInfo = function(inform){
	// 	return information.toString();
	// }
}

	var realAlbum1 = new jukeBox();
	document.getElementById("submit1").onclick = function(){
		realAlbum1.addSong( document.getElementById("img1").value )
	}

	// var Info1 = new jukeBox();
	// Info1.addInfo("Where I Come From");


//below play button functionality
plays.onclick = function() {
	players[currentTrack].play();
}

//below stop button functionality
stops.onclick = function() {
	players[currentTrack].pause();
}

//below is the sound cloud player and line 2 is what connects our buttons to it
SC.stream('/tracks/' + tracks[currentTrack]).then(function(_player){
	players[currentTrack] = _player;
  	players[currentTrack].play();

 	console.log(this)
});

//below is next button functionality
next.onclick = function() {

	// spans = document.getElementById("span");
	// spans.innerText = Info1.listInfo();

	currentTrack += 1;
		if ( currentTrack>= tracks.length) {
			currentTrack = 0;
		}  

	console.log(currentTrack,tracks,tracks[currentTrack]);

	if( !players[currentTrack] ) {
		SC.stream( '/tracks/' + tracks[currentTrack]).then(function(player){
			players[currentTrack] = player; 
			players[currentTrack].seek(0);
			players[currentTrack].play();
		});
	} else {
		players[currentTrack].seek(0);
		players[currentTrack].play();
	}
  
}
});