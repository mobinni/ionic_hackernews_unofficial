/**
 * Created by mobinni on 06/04/15.
 */
angular.module('hackerNewsApp').factory('Api',
    function () {
        var endpoint_base;
        var ApiObject;

        endpoint_base = 'https://hacker-news.firebaseio.com/v0/';

        ApiObject = new (function Api() {

            this.news = {
                top_stories: endpoint_base + 'topstories.json',
                new_stories: endpoint_base + 'newstories.json'
            };
            this.item = function(code) {
                return endpoint_base + 'item/' + code + '.json';
            }

        });
        return ApiObject;
    });