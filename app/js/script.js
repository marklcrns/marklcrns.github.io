$(function () {
  let headerElem = $('header');
  let logo = $('#logo');
  let navMenu = $('#nav-menu');
  let navToggle = $('#nav-toggle');

  $('#projects-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="fas fa-caret-left"></i></a>',
    nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="fas fa-caret-right"></i></a>',
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  });

  navToggle.on('click', () => {
    navMenu.css('right', '0');
  });

  $('#close-flyout').on('click', () => {
    navMenu.css('right', '-100%');
  });

  $(document).on('click', (e) => {
    let target = $(e.target);
    if (!(target.closest('#nav-toggle').length > 0 || target.closest('#nav-menu').length > 0)) {
      navMenu.css('right', '-100%');
    }
  });

  $(document).scroll(() => {
    let scrollTop = $(document).scrollTop();

    if (scrollTop > 0) {
      navMenu.addClass('is-sticky');
      logo.css('color', '#000');
      headerElem.css('background', '#fff');
      navToggle.css('border-color', '#000');
      navToggle.find('.strip').css('background-color', '#000');
    } else {
      navMenu.removeClass('is-sticky');
      logo.css('color', '#fff');
      headerElem.css('background', 'transparent');
      navToggle.css('bordre-color', '#fff');
      navToggle.find('.strip').css('background-color', '#fff');
    }

    headerElem.css(scrollTop >= 200 ? {'padding': '0.5rem', 'box-shadow': '0 -4px 10px 1px #999'} : {'padding': '1rem 0', 'box-shadow': 'none' });
  });

  $(document).trigger('scroll');
});

// Generate blog feed
const FEED_URL = `https://marklucernas.dev/index.xml`;

var feed = ""
$.get(FEED_URL, function (data) {
  feed += '<h2>Recent Blog Posts</h2>'
        + '<h5><a href="https://marklucernas.dev/">marklucernas.dev</a></h5>'
        + '<div class="posts">';
  $(data).find("entry").each(function () { // or "item" or whatever suits your feed
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
        console.log(temp.getElementsByTagName("img")[0].outerHTML);
        feed += temp.getElementsByTagName("img")[0].outerHTML
      }

      feed += '<div class="description">'
              + contentRaw
            + '</div>'
          + '</div>'
          + '</a>';
  });
  feed += '</div>';
  document.getElementById("blog").
    getElementsByClassName("blog-feed")[0].
    innerHTML = feed;
});

