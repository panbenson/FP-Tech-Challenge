'use strict';
/* Controller */
angular.module('myApp', []).
	controller('AppCtrl', function ($scope, $http) {
		// variables used
		$scope.apparel;
		$scope.price;

		// ng-model variables
		$scope.selectedStyle;
		$scope.selectedColor;
		$scope.selectedSize;
		$scope.quantity;
		$scope.errorMsg;
		$scope.total;

		// stores formatted color and size values to be more readable
		$scope.mappedColor;
		$scope.mappedSize;

		$http.get('/api/apparel/:styleCode?').then(function(apparel, status) {
			$scope.apparel = apparel.data;
		});
		$scope.submitForm = function(){
			$scope.total ='';
			var errors=[];

			if ($scope.selectedStyle === undefined)
				errors.push('style')
			else{// clean up code here
				if ($scope.selectedColor !== undefined){
					if (!$scope.selectedStyle.color_codes.includes($scope.selectedColor
					                                               .substring($scope.selectedColor.indexOf(':') + 1).toUpperCase()))
						errors.push('color');
				}
				else
					errors.push('color');

				if (!$scope.selectedStyle.size_codes.includes($scope.selectedSize))
					errors.push('size');

				if ($scope.quantity	=== undefined)
					errors.push('quantity');
			}


			if (errors.length){
				$scope.errorMsg = 'Please select valid values for ' + errors.join(', ') + '.';
			}
			else
			{
				$scope.errorMsg = null;
				var data = {'sr': $scope.selectedStyle.style_code,
				'cc':$scope.selectedColor.substring(0, $scope.selectedColor.indexOf(':')),
				'sc':$scope.selectedSize.substring(0, $scope.selectedSize.indexOf(':'))};

				$http.post('/api/quote/',data).then(function(price, status) {
					$scope.price = Number(price.data);

					var weight = Number($scope.selectedStyle.weight);
					var shippingCost = 0;
					var cost = $scope.price * $scope.quantity;
					var markup = 0;
					var finalWShipping = 0;
					var finalWCompensation = 0;

					if (weight >= 0.4){
						if ($scope.quantity < 48)
							shippingCost = $scope.quantity;
						else
							shippingCost = 0.75 * $scope.quantity;
					}
					else{
						if ($scope.quantity < 45)
							shippingCost = 0.5 * $scope.quantity;
						else
							shippingCost = 0.25 * $scope.quantity;
					}

					markup = (cost < 800 ? cost * 1.5 : cost * 1.45);
					finalWShipping = markup	+ shippingCost;
					finalWCompensation = finalWShipping * 1.07;

					// debug values below
					/*
					console.log('cost: ' + cost.toFixed(2) +
					'\nmarkup cost: ' + markup.toFixed(2) +
					'\nweight: ' + weight +
					'\nshippingCost: ' + shippingCost.toFixed(2) +
					'\nfinal cost w shipping: ' + finalWShipping.toFixed(2) +
					'\nfinal cost w compensation: ' + finalWCompensation.toFixed(2) +
					'\ncustomer unit price = ' + (finalWCompensation/$scope.quantity).toFixed(2));
					*/
					$scope.total = "Total cost of this order is $" + finalWCompensation.toFixed(2) +
					".\n Individual cost is $" + (finalWCompensation / $scope.quantity).toFixed(2) +
					"/item.";
				});
			}
		}
		$scope.updateFields = function(){
			$scope.mappedColor=$scope.selectedStyle.color_codes.split(';').sort()
			.map(x => x.substr(0,x.indexOf(':') + 1) + x.substring(x.indexOf(':', 3))[1].toUpperCase()
			     +x.substring(x.indexOf(':', 3) + 2).toLowerCase());

			$scope.mappedSize=$scope.selectedStyle.size_codes.split(';').sort()
		}
	});


