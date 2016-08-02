"use strict";

describe('commentsController', function() {

    var scope;
    var CommentServiceMock;
    var CommentCtrl;

    // load the controller's module
    beforeEach(module('CommentApp'));

    // define the mock Comment service
    beforeEach(function() {
        CommentServiceMock = {
            getComments: function(sortOrder) {},
            addComment: function(parentId, name, commentText, cityName, latitude, longitude) {},
            editComment: function(id, commentText) {}
        };
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        CommentCtrl = $controller('commentsController', {
            $scope: scope,
            commentSrv: CommentServiceMock
        });
    }));

    it('default sort should be descending', inject(function() {
        expect(scope.sortOrder).toBe("descending");
    }));


    it('add comment method should be called with correct values', inject(function() {
        var comment = [
            {
                "id": 92,
                "name": "Jopprey",
                "commentText": "Wunderbar",
                "created": 1468956791000,
                "commentReplies": []
            }];
        spyOn(CommentServiceMock, "addComment").and.returnValue(comment);
        scope.makeReply(null, "Jopprey", "Wunderbar");
        expect(CommentServiceMock.addComment).toHaveBeenCalledWith(null, 'Jopprey', 'Wunderbar', undefined, undefined, undefined, jasmine.any(Function));
    }));

    it('edit comment method should be called with correct values', inject(function() {
        var comment = [
            {
                "id": 92,
                "commentText": "Drama",
                "cityName": "New Delhi",
                "latitude": 28.6358,
                "longitude": 77.2244,
                "temperature": 87.8,
                "created": 1468956791000,
                "commentReplies": []
            }];
        spyOn(CommentServiceMock, "editComment").and.returnValue(comment);
        scope.editComment(92, "Drama");
        expect(CommentServiceMock.editComment).toHaveBeenCalledWith(92, 'Drama', jasmine.any(Function));
    }));

    it('load comment method should be called with correct values', inject(function() {
        var comment = [
            {
                "id": 92,
                "commentText": "Drama",
                "cityName": "New Delhi",
                "latitude": 28.6358,
                "longitude": 77.2244,
                "temperature": 87.8,
                "created": 1468956791000,
                "commentReplies": []
            }];
        spyOn(CommentServiceMock, "getComments").and.returnValue(false,comment);
        scope.loadComments("descending");
        expect(CommentServiceMock.getComments).toHaveBeenCalledWith("descending", jasmine.any(Function));
    }));

});