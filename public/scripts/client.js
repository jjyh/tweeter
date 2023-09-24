/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const newTweet = $(this).serialize();
    $.post("/tweets/", newTweet);
  });

  
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      //console.log($tweet);
      $('#tweets-container').append($tweet);
    }
  };

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
            ${tweet.content.text}
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

  const loadTweets = function() {
    $.get("/tweets/", function(newTweet) {
      renderTweets(newTweet);
    }); 
  };

  loadTweets();
});
