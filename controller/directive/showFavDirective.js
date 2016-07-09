
app.directive('showFav',["omdbapiService", function(omdbapiService){
	return {
		restrict: 'E',
		scope:{
			fromLib: '=',
			addReview: '='
		},
		templateUrl: 'controller/directive/showFavView.html'
	};
}]);