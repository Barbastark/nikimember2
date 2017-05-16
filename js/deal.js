$(document).ready(function() {
  var id = window.location.hash;
      id = id.substring(1,id.length);
  var group = 'Nikifriends';
  var loggedIn = true;

offer.getOne(id, function(data) {
$('#site-wrapper').append(dealDetails(data, categoryArr));
$('[data-toggle="tooltip"]').tooltip()
$('[data-toggle="popover"]').popover()
		  
  if(loggedIn) {
  	var id = data.id
	var groups = offer.getMemberGroups(2, function(data) {
	$('#group-list').append(groupList({id: null, name: 'Välj Senare'},id))

  	  $.each(data, function(key, value){
  	  	$('#group-list').append(groupList(value, id))
  	  })
  	  $("#btn-activate").popover({
  		  placement: function(){
            var scrollTop = $(window).scrollTop(),
            elementOffset = $('#btn-activate').offset().top,
            distance = (elementOffset - scrollTop);
            
            if(distance < 337) {
              return 'bottom'
            }
              return 'top'
          },
  	      html: true,
  	      title : '<span class="text-info"><strong>Till Erbjudandet</strong></span>'+
  	              '<button type="button" id="close" class="close" onclick="$(&#39;#btn-activate&#39;).popover(&#39;hide&#39;);">&times;</button>',
  	      content : $("#popover-content").html(),
  	      trigger: 'click',
  	      container: '#deal-overview',
          
  	   })
  	   $('#deal-overview').on('hidden.bs.popover', function (e) {
  	   	    $(e.target).data("bs.popover").inState = { click: false }
  	   	    //console.log(e.target)
			      //console.log($(e.target).data('bs.popover').inState)
		  });
    });} else {
     	window.location.href = "https://www.nikimember.se/signup";
      }
  });
});