var offer = new Offer();

//Functions for common tasks
function latestDeals() {
  offer.getCollection(function(data) {
    $('#latest-deals').append(
          dealContainer('Senaste Erbjudanden', 'latest-deals-container')
        );
    $( data ).each(function( index, value ) {
      $('#latest-deals-container').append(deals(value));
    });
  });
}

function popularDeals() {
  offer.setPage('1')
  offer.setResults('8')
  offer.setFilter('badges=POPULAR_OFFER')
  offer.getCollection(function(data) {
    $('#popular-deals').append(
        dealContainer('Populära Erbjudanden', 'popular-deals-container')
      );
    $( data ).each(function( index, value ) {
      $('#popular-deals-container').append(deals(value));
    });
  });
}

//Carousel
$(function() {
  var i = 0;
  var className;
   offer.setFilter('"presentation_type=PREMIUM"')
   offer.setOrderBy(null)
   offer.setResults('3')
   offer.setFields(null)
   offer.setPage('1')
   offer.getCollection(function(data){

    $( data ).each(function( index, value ) {
      
      var id = value.image_ids[0];               
      var img = 'https://www.nikimember.se/images/' + id;
      i === 0 ? className = "carousel-item active" : className = "carousel-item"; 
      
      $('.carousel-inner').append(carouselItem(className, img, value));
      i++;
    });
  });
});

//When document is fully loaded
latestDeals();
popularDeals();

//Search
$( "#search" ).keyup(function() {
  var value = $('#search').val()
  var text = $('#latest-deals-header').html()
  console.log(text)
  $('#latest-deals-container, #popular-deals, #popular-deals-container').empty()
  offer.setResults(null);
  offer.setPage(null)
  offer.setFilter('"title='+ value +'%"')
  offer.getCollection(function(data) {
    
    if(value.length === 0) {
      $('#latest-deals').empty()
      offer.resetQueryState()
      latestDeals();
      popularDeals();
    } else {
        if( text !== 'Sökresultat') {
          $('#latest-deals').empty()
          console.log(text)
          $('#latest-deals').append(
            dealContainer('Sökresultat', 'latest-deals-container')
          );
        }
      $( data ).each(function( index, value ) {
        $('#latest-deals-container').append(deals(value));
      });
    }
  });
});

//Popular Search
$( ".popular-search" ).on('click', function() {
  var value = this.text
  console.log(value)
  $('#latest-deals, #latest-deals-container, #popular-deals, #popular-deals-container').empty()
  offer.setResults(null);
  offer.setPage(null)
  offer.setFilter('"text=%'+ value +'%"')
  offer.getCollection(function(data) {
      $('#latest-deals').append(
        dealContainer('Sökresultat', 'latest-deals-container')
      );
      $( data ).each(function( index, value ) {
        $('#latest-deals-container').append(deals(value));
      });
   });
});

//When user clicks the start link in site navigation
$('#home-link').on('click', function(){
  offer.resetQueryState()
  $('#latest-deals, #latest-deals-container, #popular-deals, #popular-deals-container').empty()
  latestDeals();
  popularDeals();
});

//When user clicks on a category
$('.category-link, .category-search, .category-mobile-link').click(function() {

  function getId(target) {
    var id = target.data('id')
    return id;
  }

  var content = this.text;

  offer.setFilter('category_id=' + getId($(this)))
  offer.getCollection(function(data){
    
    $('#latest-deals, #popular-deals').empty()
    $('#latest-deals').append( dealContainer(content, 'latest-deals-container'));

    $( data ).each(function( index, value ) {
      $('#latest-deals-container').append(deals(value));
    });
  });
});

//Removes class from mobile nav toggle button when clicked

$(".nav-link-mobile").click(function() {
  $("#nav-icon").removeClass('open');
  $(".navbar-toggleable-sm").collapse('hide');
});






