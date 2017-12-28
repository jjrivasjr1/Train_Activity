

 



     // Initialize Firebase

    var config = {
      apiKey: "AIzaSyCmirOSKW_g0BOiuVKDMkhvEIVB_libCKY",
      authDomain: "interesting-f2e94.firebaseapp.com",
      databaseURL: "https://interesting-f2e94.firebaseio.com",
      projectId: "interesting-f2e94",
      storageBucket: "interesting-f2e94.appspot.com",
      messagingSenderId: "850128346137"

    };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    //button for adding Employees
    $("#add-train-btn").on("click", function() {
        // Don't refresh the page!
      event.preventDefault();
    
    //Initial Values grabs user input
    var tName = $("#train-name-input").val().trim();
    var tDestination = $("#destination-input").val().trim();
    var firstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
    // $("#first-train-time-input").val().trim();
    // 
    var tFrequency = $("#frequency-input").val().trim();

    //Creates local "temporary" object for holding employee data
    var newTrain = {
      name: tName,
      destination: tDestination,
      firstTime: firstTime,
      frequency: tFrequency
    };

      // Uploads employee data to the databasemmmm
      database.ref().push(newTrain);

      //Logs everything to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTime);
      console.log(newTrain.frequency);

      //alert 
      alert("Train successfully added");

      //Clears all of the text-boxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-time-input").val("");
      $("#frequency-input").val("");
    });

     database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(prevChildKey);
      console.log(childSnapshot.val());
      
      //stor everything into a variable
      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var firstTime = childSnapshot.val().firstTime;
      var tFrequency = childSnapshot.val().frequency;

      console.log(tName);
      console.log(tDestination );
      console.log(firstTime);
      console.log(tFrequency);

      // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    // var tFrequency = 3;

    // Time is 3:30 AM
    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination+ "</td><td>" + tFrequency+ "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    
    
    });

