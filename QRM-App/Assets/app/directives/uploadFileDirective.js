﻿//uploadFile Directive
function uploadFile(uploadService) {
    var DDO = {
        restrict: 'ECA',
        scope: {
            callback: '&'
        },
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
                $scope.callback({ msg: excelData });
                localStorage.setItem("uploading", "false");
                $(uploaderBlock).show();
                $(loaderBlock).hide();
            }
        }
    };
    return DDO;
}
uploadFile.$inject = ['uploadService'];
angular
    .module('uploadFile', [])
    .directive('uploadFile', ['uploadService', uploadFile]);