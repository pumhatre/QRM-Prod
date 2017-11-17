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
                    '</div>'+
                    '<div id="dataImport"></div>',
        link: function ($scope, element, attributes) {
            var dropZone = element[0].getElementsByClassName("upload-drop-zone")[0];
            //var uploaderBlock = element[0].getElementsByClassName("uploader-block")[0];
            //var loaderBlock = element[0].getElementsByClassName("loader-block")[0];
            var uploaderBlock = ".uploader-block";
            var loaderBlock = ".loader-block";
            var loaderTitle = ".loader-title";
            if (localStorage.getItem("uploading") === "true") {
                $(uploaderBlock).hide();
                $(loaderBlock).show();
            } else if (localStorage.getItem("uploading")) {
                $(uploaderBlock).show();
                $(loaderBlock).hide();
            }
            
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
                localStorage.setItem("uploading", "true");
                $(uploaderBlock).hide();
                $(loaderBlock).show();
                uploadService.UploadFile(files, $scope.SaveData);
            }

            // Save excel data to our database
            $scope.SaveData = function (excelData) {
                console.log(excelData);
                _.each(excelData, function (value, key) {
                    _.each(value, function (val) {
                        val["ProjectId"] = parseInt($scope.projectDetails.selectedProjectDropdown);
                        val["ProjectReleaseId"] = parseInt($scope.projectDetails.month);
                        val["MonthId"] = parseInt($scope.projectDetails.selectedReleaseDropdown);
                    })
                });
                $(loaderTitle).text("Saving...");
                uploadService.SaveExcelData(excelData).then(function (response) {
                    console.log(response);
                    $(loaderTitle).text("Uploading...");
                    $(element.find("input")).val("");
                    localStorage.setItem("uploading", "false");
                    $(uploaderBlock).show();
                    $(loaderBlock).hide();
                },
               function (error) {
                   console.log(error);
               });
                
            }
        }
    };
    return DDO;
}
uploadFile.$inject = ['uploadService'];
angular
    .module('uploadFile', [])
    .directive('uploadFile', ['uploadService', uploadFile]);