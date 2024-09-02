// Generate blog feed
const FEED_URL = `https://marklucernas.dev/index.xml`;
const FEED_COUNT = 5;

var feed = ""
$.get(FEED_URL, function (data) {
  feed += '<h2>Recent Blog Posts</h2>'
        + '<h5><a href="https://marklucernas.dev/">marklucernas.dev</a></h5>'
        + '<div class="posts">';
  $(data).find("entry").each(function (i) { // or "item" or whatever suits your feed
      var el = $(this);

      var content = el.find("content").text();
      var contentRaw = content.replace(/<\/?[^>]+(>|$)#?/g, " ");
      var ts = new Date(el.find("updated").text());
      var temp = document.createElement("div");
      temp.innerHTML = content;

      feed += '<a href="' + el.find("id").text() + '">'
              +'<p class="title">'
              + el.find("title").text()
              + '</p>'
              + '<small class="date">'
                + ts.toDateString()
              + '</small>'
              + '<div class="flex project-details">'

      if (temp.getElementsByTagName("img").length > 0) {
        feed += temp.getElementsByTagName("img")[0].outerHTML
      }

      feed += '<div class="description">'
              + contentRaw
            + '</div>'
          + '</div>'
          + '</a>';

      return i <= FEED_COUNT;
  });
  feed += '</div>';
  document.getElementById("blog").
    getElementsByClassName("blog-feed")[0].
    innerHTML = feed;
});

