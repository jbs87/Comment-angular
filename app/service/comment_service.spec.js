"use strict";

describe("comment service", function () {
    var commentSrv, httpBackend;

    beforeEach(module("CommentApp"));

    beforeEach(inject(function (_commentSrv_, $httpBackend) {
        commentSrv = _commentSrv_;
        httpBackend = $httpBackend;
    }));

    it("success get all", function () {
        var responseData = [
            {
                "id": 92,
                "name": "Jopprey",
                "commentText": "Wunderbar",
                "cityName": "New Delhi",
                "latitude": 28.6358,
                "longitude": 77.2244,
                "temperature": 87.8,
                "created": 1468956791000,
                "commentReplies": []
            }];
        var callback = function(){};
        httpBackend
            .expectGET("https://localhost:9000/comments/all?sortOrder=descending")
            .respond(function () {
                return [200, {success:true, errors: [], data: responseData}];});

        var returnedPromise = commentSrv.getComments('descending', callback);
        var result;
        returnedPromise.then(function(body) {
             result = body.data.data;
        });
        httpBackend.flush();
        expect(result).toEqual(responseData);
    });

});