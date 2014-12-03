'use strict';

/* Controllers */

var shopApp = angular.module('SampleShop', [
	'ngRoute'
]);

// to get filter properties
var uniqueItems = function (data, key) {
    var result = new Array();
    for (var i = 0; i < data.length; i++) {
        var value = data[i][key];
 
        if (result.indexOf(value) == -1) {
            result.push(value);
        }
    
    }
    return result;
};

// routing
shopApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/products', {
			templateUrl: 'partials/product-list.html',
			controller: 'ProductListCtrl'
		}).
		when('/products/:productId', {
			templateUrl: 'partials/product-detail.html',
			controller: 'ProductDetailCtrl'
		}).
		otherwise({
			redirectTo: '/products'
		});
}]);


shopApp.controller('ProductListCtrl', function($scope){

	//to store which property of filter is selected
	$scope.useColors={};
	$scope.useMaterials={};

	/*
	** No need for prefed filter, will generate properties of filter relating to products **
	$scope.filters=[
		{
			'id':1, 'name':"Color",
			'properties':[
				{'id':13, 'name':"Blue", 'selected':false},
				{'id':34, 'name':"Red", 'selected':false},
				{'id':104, 'name':"Green", 'selected':false}
		]},
		{
			'id':2, 'name':"Material",
			'properties':[
				{'id':49, 'name':"Rubber", 'selected':false},
				{'id':74, 'name':"Cotton-polyester", 'selected':false},
				{'id':93, 'name':"Textile", 'selected':false}
		]}
	];
	*/
	$scope.products=[
		{
			'id':1,
			'name':"Product-Blue-Textile",
			'image':"images/stuff180x180.jpg",
			'price':12400,
			'properties':['1-13', '2-49'],
			'color':"Blue",
			'material':"Textile"
		},
		{
			'id':2,
			'name':"Product-Blue-Cotton-polyester",
			'image':"images/stuff180x180.jpg",
			'price':21000,
			'specialPrice':15000,
			'properties':['1-13', '2-74'],
			'color':"Blue",
			'material':"Cotton-polyester"
		},
		{
			'id':3,
			'name':"Product-Red-Textile",
			'image':"images/stuff180x180.jpg",
			'price':2400,
			'properties':['1-34', '2-93'],
			'color':"Red",
			'material':"Textile"
		},
		{
			'id':4,
			'name':"Product-Red-Rubber",
			'image':"images/stuff180x180.jpg",
			'price':14130,
			'specialPrice':9900,
			'properties':['1-104', '2-93'],
			'color':"Red",
			'material':"Rubber"
		},
		{
			'id':5,
			'name':"Product-Green-Rubber",
			'image':"images/stuff180x180.jpg",
			'price':33210,
			'properties':['1-104', '2-74'],
			'color':"Green",
			'material':"Rubber"
		}
	];
	
	$scope.$watch(function () {
		return {
			products: $scope.products,
			useColors: $scope.useColors,
			useMaterials: $scope.useMaterials
		}
	}, function (value) {
		var selected;
		
		$scope.colorsGroup = uniqueItems($scope.products, 'color');		// autogenerate properties of color filter - here blue red green
		var filterAfterColors = [];										// to store products after filter through color selected
		selected = false;												// if selected none then all of the products should be displayed
		for (var j in $scope.products) {								// parse thru' all products
			var p = $scope.products[j];									
			for (var i in $scope.useColors) {							// parse thru' all selected properties
				if($scope.useColors[i]){
					selected = true;									// selected changed to true as atleast 1 property of filter selected
					if (i == p.color) {
						filterAfterColors.push(p);
						break;
					}
				}
			}
		}
		
		if(!selected) {
			filterAfterColors = $scope.products;						// all products stored as selected not true
		}
		
		$scope.materialsGroup = uniqueItems(filterAfterColors, 'material');
		var filterAfterMaterials = [];
		selected = false;
		for (var j in filterAfterColors) {
			var p = filterAfterColors[j];
			for (var i in $scope.useMaterials) {
				if($scope.useMaterials[i]){
					selected = true;
					if (i == p.material) {
						filterAfterMaterials.push(p);
						break;
					}
				}
			}
		}
		
		if(!selected) {
			filterAfterMaterials = filterAfterColors;
		}
		
		$scope.filterProducts = filterAfterMaterials;
	}, true);
		
		

	$scope.selectUnselect=function(filter, property){
		property.selected=!property.selected;

		if(property.selected){
			//addto selected
		}
		else{
			//removefrom selected
		}
	};

});

shopApp.controller('ProductDetailCtrl', function($scope, $routeParams){
	$scope.productID = $routeParams.productId;
});
