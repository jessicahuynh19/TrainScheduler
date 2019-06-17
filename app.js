//I was able to link my firebase, but the data that would show up all came back undefined 
var firebaseConfig = {
  apiKey: "AIzaSyCq5Fo3cCTxNmm5z2MTtWlu2qU2lv3L-tg",
  authDomain: "train-scheduler-1d159.firebaseapp.com",
  databaseURL: "https://train-scheduler-1d159.firebaseio.com",
  projectId: "train-scheduler-1d159",
  storageBucket: "train-scheduler-1d159.appspot.com",
  messagingSenderId: "247604083337",
  appId: "1:247604083337:web:38f175669183f37c"
};


  
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var currentTime = moment().format();


	console.log("Current Time: " + currentTime);

$("#click-button").on("click", function() {

      event.preventDefault();

	  var trainNameForm = $("#trainNameForm").val().trim();
	  var destinationForm = $("#destinationForm").val().trim();
	  var trainTimeForm = moment($("#trainTimeForm").val().trim(), "HH:mm").format("HH:mm");

	  var frequencyForm = $("#frequencyForm").val().trim();

	  var newTrain = {
		train: trainNameForm,
		destination: destinationForm,
		first: trainTimeForm,
		frequency: frequencyForm
    };
	
	database.ref().push(newTrain);
	

	console.log(newTrain.train);
  console.log(newTrain.destination);
	console.log(newTrain.first);
	console.log(newTrain.frequency);
	

	 $("#trainNameForm").val("");
  $("#destinationForm").val("");
	 $("#trainTimeForm").val("");
	 $("#frequencyForm").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
	
  
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;
  
  
  var trainTimeConverted = moment(trainTime, "HH:mm");
	
 
  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
	console.log(timeDifference);
	
  var frequencyMinutes = childSnapshot.val().frequency;
	console.log("Frequency Minutes: " + frequencyMinutes);
  
  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  	console.log("Minutes Away: " + minutesAway);
  
  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
	console.log("Next Arrival: " + nextArrival);
	
	
  
  $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
