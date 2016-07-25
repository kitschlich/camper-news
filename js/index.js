$(document).ready(function() {

  function getStories() {
    return $.getJSON('http://www.freecodecamp.com/stories/hotStories');
  }

  function renderStories(data) {

    var story;
    var storyList = '';
    var storyHTML;
    var link, image, headline, comments, author, upvotes;

    for (var i = 0; i < data.length; i++) {
      story = data[i];

      link = story.link;
      headline = story.headline;
      comments = 0;
      author = story.author.username;
      upvotes = story.upVotes.length;

      // if the story doesn't have an image or the image doesn't load, use the author image
      if (story.image.substring(0, 7) != 'http://') {
        image = story.author.picture;
      } else {
        image = story.image;
      }

      storyHTML = '<div class="grid-item"><a href="' + link + '"><div class="image-box"><img src="' + image + '" alt="" class="story-image img-responsive" /><p class="upvotes"><span class="glyphicon glyphicon-arrow-up"></span> ' + upvotes + '</p></div><div class="info-container clearfix"><h3 class="title">' + headline + '</h3><p class="comments">' + comments + ' Comments</p><p class="author">' + author + '</p></div></a></div>';

      storyList += storyHTML;
    }
    $('.grid').append(storyList);
    runMasonry();
  };

  function runMasonry() {
    // init Masonry
    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function() {
      $grid.masonry('layout');
    });
    upvoteCards();
  };

  function upvoteCards() {
    $(".grid-item").hover(function() {
      $(this).find(".upvotes").slideToggle('fast');
    });
  };

  getStories().done(renderStories);

});