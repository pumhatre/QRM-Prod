//Step tabs Directive
function StepTabs(){
        var DDO  = {
            restrict: 'ECA',
            scope: {
                options: '=',
            },
            template: '<div class="stepwizard col-md-offset-3">' +
                        ' <div class="stepwizard-row setup-panel">' +
                            '<div class="stepwizard-step" ng-repeat="option in options" style="width:{{width}}%">' +
                                '<button id="{{$index}}" href="#{{option.Id}}"type="button" ng-class="{' +'\'btn-black\'' + ':{{$index==0}} ,' + '\'btn-default\'' + ':{{$index!=0}}}"class="btn btn-circle" ng-disabled="{{$index!=0}}" ng-click="buttonClick($index)">{{$index+1}}</button>' +
                                '<p>{{option.DisplayHeaderName}}</p>' +
                                '<p>{{option.DisplaySubHeaderName}}</p>' +
                            '</div>'+
                          '</div>'+
                      '</div>',
            link: function ($scope, element, attributes) {
                $scope.width = (100 / $scope.options.length);
              var navListItems = $('div.setup-panel div button'),
              allWells = $('.setup-content'),
              allNextBtn = $('.nextBtn');
              allPreviousBtn = $('.previousBtn');
              allWells.hide();
                $(allWells[0]).show();
                $scope.buttonClick=function (e) {
                    var $target = $($("#" + e).attr("href")),
                        $item = $("#" + e);
                        $('div.setup-panel div button').removeClass('btn-black').addClass('btn-default');
                        $item.removeClass('btn-default').addClass('btn-black');
                        allWells.hide();
                        $target.show();
                        $target.find('input:eq(0)').focus();
                };

                allNextBtn.click(function (e) {
                    var curStep = $(this).closest(".setup-content"),
                        curStepBtn = curStep.attr("id"),
                        nextStepWizard = $('div.setup-panel div button[href="#' + curStepBtn + '"]').parent().next().children("button"),
                        curInputs = curStep.find("input[type='text'],input[type='url']"),
                        isValid = true;
                    var index=_.findIndex($scope.options,function(step){
                        return step.Id == curStepBtn
                    });
                    if ($scope.options[index].NextClickCallback) {
                        $scope.options[index].NextClickCallback(e);
                    }
                    $(".form-group").removeClass("has-error");
                    for (var i = 0; i < curInputs.length; i++) {
                        if (!curInputs[i].validity.valid) {
                            isValid = false;
                            $(curInputs[i]).closest(".form-group").addClass("has-error");
                        }
                    }

                    if (isValid) {
                        $('div.setup-panel div button[href="#' + curStepBtn + '"]').removeClass('btn-black').addClass("btn-success");
                        $('div.setup-panel div button[href="#' + curStepBtn + '"]').attr('disabled', 'disabled');
                        nextStepWizard.removeAttr('disabled').trigger('click');
                    }
                });
                allPreviousBtn.click(function () {
                    var curStep = $(this).closest(".setup-content"),
                        curStepBtn = curStep.attr("id"),
                        nextStepWizard = $('div.setup-panel div button[href="#' + curStepBtn + '"]').parent().prev().children("button"),
                        curInputs = curStep.find("input[type='text'],input[type='url']");
                        $('div.setup-panel div button[href="#' + curStepBtn + '"]').removeClass('btn-black').addClass("btn-success");
                        $('div.setup-panel div button[href="#' + curStepBtn + '"]').attr('disabled', 'disabled');
                        nextStepWizard.removeAttr('disabled').trigger('click');
                });
           
            }
        };
        return DDO;
}
angular
    .module('stepTabs', [])
    .directive('stepTabs', StepTabs);