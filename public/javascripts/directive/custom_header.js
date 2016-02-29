/**
 * Created by Administrator on 2016/2/3.
 */
angular.module('Birthday')
    .directive('customHeader', function() {
        return {
            restrict : "A",
            link: function(scope, elements) {
                var allLiElements = elements.find("li");
                allLiElements.on("click", function(event, element) {

                    for(var i = 0; i < allLiElements.length; ++i) {
                        allLiElements.removeClass("active");
                    }
                    $(event.target).parent().addClass("active");
                });
            }
        };
    })
;