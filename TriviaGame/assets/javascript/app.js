 // Hidding 'secondScreen'
 $("#secondScreen").hide()
 // Hidding 'tirdScreen'
 $("#tirdScreen").hide()

 var allowedTime=60;  //60 seconds
 var totalCorrect=0;
 var totalIncorrect=0;
 var unanswered=0;   
 var correctAnswers = ["Argentina", "Rigoberta_Menchu","La_Malinche","Frida_Kahlo","Las_Damas_de_Blanco"];
 
 window.onload = function() {
   //   Click events
        $("#bottonStart").click(stopwatch.start); //game starts when 'start' button is clicked
        $("#bottonDone").click(stopwatch.stop);
        $('.options').on('click', function(){
          var answer = $(this).attr('data-answer'); // to identify what botton whas clicked
          var questionNumber = $(this).attr('data-question');
             if( correctAnswers[questionNumber] == answer) {
                totalCorrect++;
               $("#correctAnswers").html(totalCorrect);
             } else {
               totalIncorrect++;
             }
             $("#correctAnswers").html(totalCorrect);
             $("#incorrectAnswers").html(totalIncorrect);
             unanswered = correctAnswers.length - totalCorrect - totalIncorrect;
             $("#unanswered").html(unanswered); 
        });
 };
 // STEP 1.Setting timer
 // stopwatch (START) object
 var stopwatch = {
   time:allowedTime,
   start: function() {  //starts the countdown
           // Hidding 'firstScreen'
           $("#firstScreen").hide();
           // Hidding 'tirdScreen'
           $("#tirdScreen").hide();
           // Showing 'secondScreen'
           $("#secondScreen").show();
           //to display to the user every 1 second    
           counter = setInterval(stopwatch.count, 1000);   //starting the count
           // here will go a function acepting answers while counter is grater than 60
   },      
   stop: function() {  //stopping the count
           clearInterval(counter);  // this, effectively stops the timer
           // Hidding 'firstScreen'
            $("#secondScreen").hide();
            // Showing 'firstScreen'
            $("#tirdScreen").show();
   },
   count: function() {
           stopwatch.time--;     //decreases the time by one
           console.log(stopwatch.time);
           if ( stopwatch.time<0) {      /// this conditions will check if the time is runed out
             stopwatch.stop();
           } 
           //display the new time to the user
           $("#display").html(stopwatch.time);
   },
 };