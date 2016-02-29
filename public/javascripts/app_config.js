'use strict';
angular.module('Birthday')
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
            // we will go to dashboard by default
            .state(
                'index', {
                    url: '/',
                    controller: 'IndexCtrl',
                    controllerAs: 'indexCtrl',
                    templateUrl: '/module/main/main.html'
            })
            .state(
                'calculatePercentage', {
                    url : '/calculatePercentage',
                    controller : 'CalculatePercentageCtrl',
                    controllerAs : 'calculatePercentageCtrl',
                    templateUrl : '/module/calculatePercentage/calculatePercentage.html'
            })
            .state(
                'editExcel', {
                    url : '/editExcel',
                    controller : 'EditExcelCtrl',
                    controllerAs : 'editExcelCtrl',
                    templateUrl  : '/module/edit/editExcel.html'
                }
            )
            .state(
                'searchAndCopy', {
                    url : '/searchAndCopy',
                    controller : 'SearchAndCopyCtrl',
                    controllerAs : 'searchAndCopyCtrl',
                    templateUrl : "/module/searchAndCopyModule/searchAndCopy.html"
                }
            )
            .state(
                'moreFunction', {
                    url:'/moreFunction',
                    templateUrl:"/module/moreFunction/moreFunction.html"
                }
            )
        ;
	});