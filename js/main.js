$(function(){
	var token = "YzAwNDVhZjYtODUyYS00ZGMwLWE4OTgtZjI5MTUxYjg5MTcw:unused";
	var root = "https://www.nikimember.se/api/v0.1//offers?page=1&results=8&order_by=-id";
	
	$.ajax(root, {
		dataType: 'json',
		method: 'GET',
		success: function(response) {
			console.log(response)
		},
		error: function(request, errorType, errorMsg) {
			alert('There was a propblem with the ajax call ' + errorMsg)
		}
	});
});