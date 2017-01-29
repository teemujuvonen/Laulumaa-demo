angular.module('starter.services', [])

.factory('Globals', function(){
	var data ={};
	data.in_sub_category = false;
	data.product;
	data.img;
	/*
	data.categories = [
			{ title: "Pihapöydät", category: 1,  img: "cat_poyta.JPG" },
			{ title: "Pihatuolit", category: 2, img: "cat_tuoli.JPG" },
			{ title: "Ulkosohvat", category: 3, img: "cat_sohva.JPG" },
			{ title: "Lattiaritilät", category: 4, img: "cat_laatat.JPG" }
			];
	data.products = [
			{ title: "Pöytä1", category: 1,  img: "cat_poyta.JPG" },
			{ title: "Pöytä2", category: 1, img: "poyta2.JPG" },
			{ title: "Tuoli1", category: 2, img: "cat_tuoli.JPG" },
			{ title: "Tuoli2", category: 2, img: "tuoli2.JPG" },
			{ title: "Ulkosohva1", category: 3, img: "cat_sohva.JPG" },
			{ title: "Ulkosohva2", category: 3, img: "sohva2.JPG" },
			{ title: "Lattiaritilä1", category: 4, img: "cat_laatat.JPG" }
			];
	*/
	
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
		set_in_sub_category: function(value){
			data.in_sub_category=value;
			
		},
		get_in_sub_category: function(){
			return data.in_sub_category;
		},
		get_categories: function(){
			return data.categories;
		},
		get_products: function(){
			return data.products;
		},
		get_img: function(){
			return data.img;
		},
		set_img: function(value){
			data.img=value;
		}
	}
});