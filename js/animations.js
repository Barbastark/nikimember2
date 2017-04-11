//Hamburger icon
  let hamburgerIcon = document.querySelector('#nav-icon');
  let siteNav = document.querySelector('#site-nav');

//Categories section
  let categories = document.querySelector('#filter');
  let toggleCategoriesBtn = document.querySelector('#btn-category-toggler');

//Hide/show sitenav on scroll
  let lastScrollTop = 0;

  hamburgerIcon.addEventListener('click', () => {
    
    !hamburgerIcon.classList.contains('open') ? hamburgerIcon.classList.add('open') : hamburgerIcon.classList.remove('open')
  })

  toggleCategoriesBtn.addEventListener('click', () => {

    !categories.classList.contains('filter-open') ? categories.classList.add('filter-open') : categories.classList.remove('filter-open')
    
  })
  
  window.addEventListener("scroll", () =>{ 

     let st = window.pageYOffset || document.documentElement.scrollTop; 

     st > lastScrollTop ? siteNav.classList.add('sitenav-hidden') : siteNav.classList.remove('sitenav-hidden')
     
     lastScrollTop = st;
  }, false);

  $(".nav-item, .dropdown-item").click(function() {
    $('html, body').animate({
        scrollTop: $("#latest-deals").offset().top
    }, 500);
    //$('#filter').removeClass('filter-open')
  });
      
      
      