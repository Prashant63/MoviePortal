app.directive('movieReview',[function(){
	return {
		restrict: 'E',
		scope:{
			fav: '=',
			addReview: '='
		},
		link: function(scope){
			scope.review = {
				"stars":'',
				"body":''
			};

			scope.reviewMovie = function(){
				if(scope.review.stars != '' && scope.review.body != ''){
					scope.addReview(scope.fav,scope.review);
					scope.review = {
						"stars":'',
						"body":''
					};
				}
			}
		},
		templateUrl: 'controller/directive/movieReviewView.html'
	};
}]);