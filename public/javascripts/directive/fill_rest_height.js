/**
 * Created by Administrator on 2016/2/1.
 */
angular.module('Birthday')
    .directive('fillRestHeight', function() {
        console.log("hehe");
        return {
            restrict : "A",
            link: function(scope, elements, attribute) {
                console.log("hehe");
                console.log(elements);
                for (var index = 0; index < elements.length; index++) {
                    var offsetTop = elements[index].offsetTop;
                    var windowHeight = window.screen.height;
                }
            }
        };
    })
;