app.factory('omdbapiService',function($http){
	var myData;
	return {
		get: function(url){
			return $http.get(url).success(function(data){
				myData = data;
			});
		},
		data: function() { return myData;}
	};
});