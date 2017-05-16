  //Hide/show site navigation on scroll
  let lastScrollTop = 0;
  let siteNav = document.querySelector('#site-nav');

   window.addEventListener("scroll", () => { 
    if(window.pageYOffset > 200) {
      let st = window.pageYOffset || document.documentElement.scrollTop; 
      st > lastScrollTop ? siteNav.classList.add('sitenav-hidden') : siteNav.classList.remove('sitenav-hidden')
      lastScrollTop = st;
    }
  }, false);
   
  //Add remove class on mobile nav button
  $('#nav-icon').on('click', function(){
    if($( "#nav-icon" ).hasClass( "open" )) {
      $("#nav-icon").removeClass("open");
    } else {
      $("#nav-icon").addClass("open");
    }
  });

  //Toggles filter section
  $('#btn-category-toggler').on('click', function() {
    if($('#filter').hasClass('filter-open')) {
      $('#filter').removeClass('filter-open')
    } else {
      $('#filter').addClass('filter-open')
    }
  });
  
  //Closes mobile sitenav when navlink or filter button is clicked
  $(".nav-link-mobile, #btn-mobile-dropdown-toggle").click(function() {
    $("#nav-icon").removeClass('open');
    $(".navbar-toggleable-sm").collapse('hide');
  });

  //Smooth scroll
  $(".nav-item:first-child, .dropdown-item").click(function() {
    $('html, body').animate({
        scrollTop: $("#latest-deals").offset().top
    }, 500);
  });
  //Rotate arrow toggle icon categories menu
  $("#btn-category-toggler").click(function() {
    if($('.toggle-icon').hasClass('toggle-icon-rotate')) {
      $('.toggle-icon').removeClass('toggle-icon-rotate')
    }
    else {
      $('.toggle-icon').addClass('toggle-icon-rotate')
    }
  });

  
 
  
      
      
      