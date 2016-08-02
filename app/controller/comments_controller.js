"use strict";

var app = angular.module('CommentApp');
app.controller('commentsController', ['$scope', 'commentSrv', '$http',
    function ($scope, commentSrv, $http) {


        $scope.modelOptions = {
            debounce: {
                default: 750,
                blur: 250
            },
            getterSetter: true
        };


        $scope.sortOrder = "descending";

        $scope.typeaheadObject = {
            query: ''
        };

        $scope.makeReply = function (parentCommentId, name, body) {
            var exactPlace = $scope.typeaheadObject.query;
            if (parentCommentId === undefined) {
                parentCommentId = null;
            }
            commentSrv.addComment(parentCommentId, name, body, exactPlace.name, exactPlace.latitude, exactPlace.longitude, function (err, comment) {
                $scope.loadComments($scope.sortOrder);
            });
        };

        $scope.onSortChanged = function () {
            $scope.loadComments($scope.sortOrder);
        };

        $scope.editComment = function (id, commentText) {
            commentSrv.editComment(id, commentText, function (err, comments) {
                if (err) {
                } else {
                    $scope.loadComments($scope.sortOrder);
                }
            });
        };

        $scope.loadComments = function (sortOrder) {
            commentSrv.getComments(sortOrder, function (err, comments) {
                if (err) {
                    $scope.commentThread = {};
                } else {
                    $scope.commentThread = comments;
                }
            });
        };

        $scope.checkLocation = function (placeName) {
            return $http({
                url: 'https://localhost:9000/locations/check',
                method: "GET",
                params: {placeName: placeName}
            })
                .then(function successCallback(response) {
                        return response.data.slice(0, 9);
                    },
                    function errorCallback(response) {
                    });
        };

        $scope.loadComments($scope.sortOrder);
    }]);

app.filter('latFilter', function () {
    return function (x) {
        if (x === null) {
            return;
        }
        if (x < 0) {
            return x + "\u00B0S";
        } else {
            return x + '\u00B0N';
        }
    };
});

app.filter('longFilter', function () {
    return function (x) {
        if (x === null) {
            return;
        }
        if (x < 0) {
            return x + '\u00B0W';
        } else {
            return x + '\u00B0E';
        }
    };
});

app.filter('millisecondsToDateTime', [function () {
    return function (milliseconds) {
        return new Date(1970, 0, 1).setMilliseconds(milliseconds);
    };
}]);