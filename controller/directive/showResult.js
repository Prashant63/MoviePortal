
app.directive('showResult',["omdbapiService", function(omdbapiService){
	return {
		restrict: 'E',
		scope:{
			movieData: '=',
			addToFav: '=',
			getPoster: '='
		},
		link:function(scope){
		},	
		templateUrl: 'controller/directive/showResultView.html'
	};
}]);