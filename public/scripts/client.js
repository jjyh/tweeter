/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
//upon loading do not show errors
$("#error-msg-empty").hide();
$("#error-msg-long").hide();

// prevent cross-scripting escape text function from LHL example
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

   //appending tweets to #tweet-container for render 
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      //console.log($tweet);
      $('#tweets-container').append($tweet);
    }
  };

  //create the tweet html from the data object
  const createTweetElement = function(tweet) {
  /* Your code for creating the tweet element */
    let $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div class="name-left">
            <img class="user-icon" src="${tweet.user.avatars}"></img> 
            <h3>${tweet.user.name}</h3>
          </div>
          <div class="name-right">
            ${tweet.user.handle}
          </div>
        </header>
        <div class="posted-tweet">
          ${escape(tweet.content.text)}
        </div>
        <footer>
          <span class=""footer-left"">${timeago.format(tweet.created_at)}</span>
          <div class="footer-right">
            <div class='icons'>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </footer>
      </article>`);
    return $tweet;
  };

  //GET tweets from server sort
  const loadTweets = function() {
    $.ajax("/tweets/", {method: "GET", dataType: "json",})
    .then((newTweet) => {
      renderTweets(newTweet.reverse());
    });
  };

  loadTweets();

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();

    //hide errors upon submittal first
    $("#error-msg-empty").hide();
    $("#error-msg-long").hide();

    const inputLength = $(this).find("#tweet-text").val().length;    
    if (!inputLength) {
      //return alert("Please enter text to tweet");
      $("#error-msg-empty").slideDown();
      $("#error-msg-long").hide();
    } if (inputLength > 140) {
      //return alert("Please shorten the tweet to within 140 character");
      $("#error-msg-empty").hide();
      $("#error-msg-long").slideDown();
    } else {
    const newTweet = $(this).serialize();
    $.post("/tweets/", newTweet, () => {
      loadTweets();
      $(this).find("#tweet-text").val("");
      const displayCounter = $(this).closest("section").find("output")[0];
      displayCounter.innerHTML = 140;
      });
    }
  });

});