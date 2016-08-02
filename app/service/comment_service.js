"use strict";

function CommentAPI($http) {

    this.getComments = function (sortOrder, callback) {
        return $http({
            url: 'https://localhost:9000/comments/all',
            method: "GET",
            params: {sortOrder: sortOrder}
        })
        .success(function(data, status, headers, config){
                callback(null, data);
            })
            .error(function(data, status, headers, config){
                callback(data, {});
            });
        };

    this.addComment = function(parentId, name, commentText, cityName, latitude, longitude, callback){
        return $http.post('https://localhost:9000/comments/add',{parentId: parentId, name: name, commentText: commentText, cityName: cityName, latitude: latitude, longitude: longitude})
            .success(function(data, status, headers, config){
                callback(null, data);
            })
            .error(function(data, status, headers, config){
            });
    };

    this.editComment = function(id, commentText, callback){
        return $http.post('https://localhost:9000/comments/update',{id: id, commentText: commentText})
            .success(function(data, status, headers, config){
                callback(null, data);
            })
            .error(function(data, status, headers, config){
            });
    };
    
}

app.service('commentSrv', ['$http', CommentAPI]);