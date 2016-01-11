$(function() {



  // Initialize Parse with your Parse application javascript keys
	Parse.initialize("QEUxkgvQIWxrDlMud6qddb3h9o9Sst7MMwrQtuD4",
                   "4ISFMfKcbdCIHeGQOAfnD6bc6NvcOdDU7buGr13J");
	
	
	//Initialize global 2-D array. 4 pieces of information for each game & display 5 games
	var numberOfGames = 5;
	var inforPerGame = 4;
	var gameInfo = new Array();
	for (i=0;i<numberOfGames;i++) {
		gameInfo[i]=new Array();
		for (j=0;j<inforPerGame;j++) {
			gameInfo[i][j]=0;
		}
	}
	
	var homepage = {};
	homepage.userBtnClicked = false;
	homepage.schoolBtnClicked = true;
	homepage.modalSignUpBtn = false
	
	// Ensures that anything javascript does happens only after the html document has been loaded & is ready
$(document).ready(function(){
  
	
	gameInfoLoader();
	
	
	//If the user has already signed in from a previous session, go to the dashboard page
	/*var currentUser = Parse.User.current();
		if (currentUser) {
			window.location.href = "http://teamsync.webflow.io/dashboard";
		} 
	*/
	$("#signup-btn-modal").one( "click" , function(signup) { 
		if (homepage.modalSignUpBtn === false) {
			SigningUp();
		}
	});
});
	
	
	//The 2-D gameInfo array is filled with information for the homepage banner that is underneath navbar
	function gameInfoLoader() {
		homepage.modalSignUpBtn = false;
		var Game = Parse.Object.extend("Game");
		var query = new Parse.Query(Game);
		
		
		query.limit(5);
		query.descending("date");
		query.include("awayTeamScore","awayTeamID","homeTeamID","homeTeamScore");
		query.find({
			success: function(results) {
				console.log("Successfully retrieved " + results.length + " scores.");
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					
					gameInfo[i][0] = object.get("homeTeamID").get("teamName"); 
					gameInfo[i][1] = object.get("homeTeamScore").get("score");
					gameInfo[i][2] = object.get("awayTeamID").get("teamName");
					gameInfo[i][3] = object.get("awayTeamScore").get("score");
					
					for (var c = 0; c < 4; c++) {
						$("#t" + i + "-0" + c).text(gameInfo[i][c])
					}
				}
			},
			error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			}
		});
	}
		
	function SigningUp() {
		var username = document.getElementById("exampleInputUsername").value;
		var password = document.getElementById("exampleInputPassword").value;
		//var email = document.getElementById("signup-email").value;
	
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		//user.set("email", email);
	
		user.signUp(null, {
			success: function(user) {
				alert("Successfully signed up!");
				$('#modal').modal('hide');
				//window.location.href = "http://teamsync.webflow.io/dashboard";
			},
			error: function(user, error) {
			// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
				$('#modal').modal('hide');
			}
		});
	}
	
});