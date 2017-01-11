angular.module('starter.services', [])

.factory('Globals', function(){
	var data ={};
	data.product;
    data.product_size;
	
	return {
		all: function(){
			return data;
		},
		set_product: function(value){
			data.product=value;
			
		},
		get_product: function(){
			return data.product;
			
		},
        set_product_size: function(value){
			data.product_size=value;
			
		},
		get_product_size: function(){
			return data.product_size;
			
		}
	};
});