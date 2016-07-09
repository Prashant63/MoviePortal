app.factory('storageService',function(){
	return {
		get: function(args){
			if(window && window.localStorage){
				var object;

				try{
					object = window.localStorage.getItem(args.key);
				}
				catch (err){
				}

				if(args.type === "json" && object != null && object != ""){
					return JSON.parse(object);
				} else{
					return object;
				}
			}
		},

		set: function(args){
			if(window && window.localStorage){
				if(typeof (args.data) === "object"){
					args.data = JSON.stringify(args.data);
				}

				try{
					window.localStorage.setItem(args.key, args.data);
				}
				catch(err){
				}
			}
		}
	};
});
