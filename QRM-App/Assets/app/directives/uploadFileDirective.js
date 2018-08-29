//uploadFile Directive
function uploadFile(uploadService) {
    var DDO = {
        restrict: 'ECA',
        template: '<div class="uploader-block"><input type="file" name="file" id="fileUpload" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" style="display:none"/>' +
                    ' <div class="upload-drop-zone" id="drop-zone">'+
                        'Drag the Metric excel sheet here or click to upload'+
                      '</div>'+
                    '</div>'+
                    '<div class="loader-block">' +
                        '<div id="loader-wrapper">'+
                            '<div id="loader"></div>'+
                        '</div>' +
                        '<span class="loader-title">Uploading...</span>' +
                    '</div>' +
                    '<div class="complete-block">' +
                        '<div class="circle-loader">' +
                              '<div class="checkmark draw"></div>' +
                            '</div>' +
                         '</div>' +
                    '</div>' +
                    '<div class="info-block">' +
                            '<div class="alert alert-warning fade in" style="display:none">'+
                                '<span class="close">&times;</span>' +
                                '<strong>Warning!</strong> There was a problem with your <a href="#" class="alert-link">network connection</a>.'+
                            '</div>'+
                            '<div class="alert alert-danger fade in" style="display:none">' +
                                '<span class="close">&times;</span>' +
                                '<strong>Error!</strong> Excel data not uploaded.Please correct the below rows.'+
                            '</div>'+
                            '<div class="alert alert-success fade in" style="display:none">' +
                                '<span class="close">&times;</span>' +
                                '<strong>Success!</strong> Excel data uploaded successfully.'+
                            '</div>'+
                            '<div class="alert alert-info fade in" style="display:none">' +
                                '<span class="close">&times;</span>'+
                                '<strong>Note!</strong> This may take several minutes. Please do not refresh.' +
                            '</div>'+
                    '</div>'+
                    '<div class="error-block">' +
                        '<table class="table table-striped">'+
                            '<thead>'+
                              '<tr>'+
                                '<th>SheetName</th>' +
                                '<th>RowNumber</th>' +
                                '<th>ColumnName</th>' +
                                '<th>Error</th>' +
                              '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                              '<tr ng-repeat="error in errors">' +
                                '<td>{{error.SheetName}}</td>' +
                                '<td>{{error.RowNumber}}</td>' +
                                '<td>{{error.ColumnName}}</td>' +
                                '<td>{{error.Error}}</td>' +
                              '</tr>'+
                            '</tbody>'+
                          '</table>'+
                    '</div>',
        link: function ($scope, element, attributes) {
            var dropZone = element[0].getElementsByClassName("upload-drop-zone")[0];
            //var uploaderBlock = element[0].getElementsByClassName("uploader-block")[0];
            //var loaderBlock = element[0].getElementsByClassName("loader-block")[0];
            var uploaderBlock = ".uploader-block";
            var loaderBlock = ".loader-block";
            var completeBlock=".complete-block";
            var loaderTitle = ".loader-title";
            var circleLoader = ".circle-loader";
            var errorBlock = ".error-block";
            var clockAlert = ".close";
            var infoBlock = ".info-block";
            var alertInfo = ".alert-info";
            var alertSuccess = ".alert-success";
            var alertDanger = ".alert-danger";
            $(circleLoader).hide();
            $(completeBlock).hide();
            $(errorBlock).hide();
            $(infoBlock).hide();
            if (localStorage.getItem("uploading") === "true") {
                $(uploaderBlock).hide();
                $(loaderBlock).show();
            } else if (localStorage.getItem("uploading")) {
                $(uploaderBlock).show();
                $(loaderBlock).hide();
            }
            $(clockAlert).click(function () {
                var parent = $(this).closest('.alert');
                $(parent).hide();
            });
            dropZone.onclick = function (e) {
                $(element.find("input")).click();
            }
            dropZone.ondrop = function (e) {
                e.preventDefault();
                this.className = 'upload-drop-zone';

                $scope.UploadFile(e.dataTransfer.files)
            }

            dropZone.ondragover = function () {
                this.className = 'upload-drop-zone drop';
                return false;
            }

            dropZone.ondragleave = function () {
                this.className = 'upload-drop-zone';
                return false;
            }
            $scope.UploadFile = function (files) {
                if (files.length > 0) {
                    localStorage.setItem("uploading", "true");
                    $scope.$apply(function () {
                        $scope.isUploaded = true;
                    });
                    $(alertDanger).hide();
                    $(infoBlock).show();
                    $(alertDanger).hide();
                    $(alertSuccess).hide();
                    $(alertInfo).show();
                    $(uploaderBlock).hide();
                    $(loaderBlock).show();
                    uploadService.UploadFile(files, $scope.SaveData);
                    $scope.disabledUploadNext = false;
                }
                else {
                    $scope.disabledUploadNext = true;
                }
            }
               

            // Save excel data to our database
            $scope.SaveData = function (excelData) {
                if (excelData.Errors.length <= 0) {
                    $(errorBlock).hide();
                    $scope.$apply(function () {
                        $scope.errors = [];
                    });
                    _.each(excelData, function (value, key) {
                        _.each(value, function (val) {
                            val["ProjectId"] = parseInt($scope.projectDetails.selectedProjectDropdown);
                            val["ProjectReleaseId"] = parseInt($scope.projectDetails.selectedReleaseDropdown);
                            val["MonthId"] = parseInt($scope.projectDetails.month);
                        })
                    });
                    $(loaderTitle).text("Saving...");
                    $scope.isUploaded = false;
                    uploadService.SaveExcelData(excelData).then(function (response) {
                        $(loaderTitle).text("Uploading...");
                        $(alertInfo).hide();
                        $(alertSuccess).show();
                        $(element.find("input")).val("");
                        localStorage.setItem("uploading", "false");
                        $(completeBlock).show();
                        $(circleLoader).show();
                        $(circleLoader).toggleClass('load-complete');
                        $('.checkmark').toggle();
                        $(loaderBlock).hide();
                        setTimeout(function () {
                            $(circleLoader).hide();
                            $(completeBlock).hide();
                            $(uploaderBlock).show();
                        }, 1000);
                    },
                   function (error) {
                       console.log(error);
                   });
                } else {
                    $scope.$apply(function () {
                        $scope.errors = excelData.Errors;
                    });
                    $(loaderTitle).text("Uploading...");
                    $(element.find("input")).val("");
                    localStorage.setItem("uploading", "false");
                    $(loaderBlock).hide();
                    $(uploaderBlock).show();
                    $(errorBlock).show();
                    $(alertInfo).hide();
                    $(alertDanger).show();
                    $('.nextBtn:visible').attr('disabled', true)
                }
                
            }
        }
    };
    return DDO;
}
uploadFile.$inject = ['uploadService'];
angular
    .module('uploadFile', [])
    .directive('uploadFile', ['uploadService', uploadFile]);