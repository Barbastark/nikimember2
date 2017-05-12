$(document).ready(function() {
			  var id = window.location.hash;
			      id = id.substring(1,id.length);
			  var group = 'Nikifriends';
			  var loggedIn = true;
			  
			offer.getOne(id, function(data) {
		      $('#site-wrapper').append(dealDetails(data, categoryArr));
		      $('[data-toggle="tooltip"]').tooltip()
		      //$('[data-toggle="popover"]').popover()
		      $('.popover').popover({
  				  container: 'body'
  				})
			  if(loggedIn) {
			  	var id = data.id;

		      	var groups = offer.getMemberGroups(2, function(data) {
		      		$('#group-list').append(groupList({id: null, name: 'Välj Senare'},id))

			  	  $.each(data, function(key, value){
			  	  	$('#group-list').append(groupList(value, id))
			  	  })
			  	  $("#btn-activate").popover({
			  		  placement: 'top',
			  	      html: true,
			  	      title : '<span class="text-info"><strong>Till Erbjudandet</strong></span>'+
			  	              '<button type="button" id="close" class="close" onclick="$(&quot;#btn-activate&quot;).popover(&quot;hide&quot;);">&times;</button>',
			  	      content : $("#popover-content").html(),
			  	      trigger: 'focus',
			  	      container: 'body'
			  	   });
			  	  });
				 } else {
			     	window.location.href = "https://www.nikimember.se/signup";
 			     }
			  });
			});