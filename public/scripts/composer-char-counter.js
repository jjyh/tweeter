//Using jQuery and an appropriate selector, 
//register an event handler to the textarea element 
//for the form inside of the .new-tweet section.
$(document).ready(function() {
  // https://flex-web.compass.lighthouselabs.ca/p/3/workbooks/web-flex-v2-m04w8/activities/611?journey_step=81&workbook=51
  // --- our code goes here ---
  //console.log("ready");
  $('form').find('#tweet-text').val(""); // clear text area otherwise it retains old entries
  $('#tweet-text').on('input', function() {
    //Use this to grab the value of the textarea in question, and determine the length of that input value.
    let counter = $(this).val().length;
    // leverage this again to get to the counter. this points to the textarea- traverse up the DOM tree from that node/element and then back down to a node that matches the '.counter' CSS selector
    const displayCounter = $(this).closest("section").find("output")[0];
    displayCounter.innerHTML = 140 - counter;
    //if users exceed the 140 character limit, the counter should appear red, 
    if ((140 - counter) < 0) {
      $("output").css({'color': 'red'});
    } else {
      $("output").css('color', '#545149');
    }
  });
});