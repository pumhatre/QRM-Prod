angular.module('splitFilter', [])
    .filter('split', function () {
        return function (input, splitChar) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar);
        }
    });