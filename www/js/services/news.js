/**
 * Created by mobinni on 06/04/15.
 */
angular.module('hackerNewsApp')
    .service('svNews', ['Api', '$resource', '$q', function (Api, $resource, $q) {
        return {
            getArticles: function (isNew, from, to) {
                // initial state
                if (!from) from = 0;
                if (!to) to = 50;

                var deferred = $q.defer();

                var url = isNew ? Api.news.new_stories : Api.news.top_stories;

                $resource(url).query().$promise.then(function (result) {
                    var topstories = result;
                    var promises = [];
                    for (var i = from; i < to && to < topstories.length; i++) {
                        var storyCode = topstories[i];
                        var promise = $resource(Api.item(storyCode)).get().$promise;
                        promises.push(promise);
                    }

                    $q.all(promises).then(function (data) {
                        if (data) {
                            window.localStorage['storyCache'] =  JSON.stringify(data);
                            return deferred.resolve({
                                error: null,
                                data: data
                            });
                        }
                        else {
                            deferred.resolve({
                                error: 'Something went wrong while retrieving the data',
                                data: {}
                            })
                        }
                    });
                });

                return deferred.promise
            },
            getNewArticles: function (from, to) {
                // initial state
                if (!from) from = 0;
                if (!to) to = 50;

                var deferred = $q.defer();
                $resource(Api.news.new_stories).query().$promise.then(function (result) {
                    var topstories = result;
                    var promises = [];
                    for (var i = from; i < to && to < topstories.length; i++) {
                        var storyCode = topstories[i];
                        var promise = $resource(Api.item(storyCode)).get().$promise;
                        promises.push(promise);
                    }
                    var suppress = function(x) { return x.catch(function(){}); }
                    $q.all(promises.map(suppress)).then(function (data) {
                        console.log(data);

                        if (data) {
                            window.localStorage['storyCache'] =  JSON.stringify(data);
                            return deferred.resolve({
                                error: null,
                                data: data
                            });
                        }
                        else {
                            deferred.resolve({
                                error: 'Something went wrong while retrieving the data',
                                data: {}
                            })
                        }
                    })
                });

                return deferred.promise
            },
            getItem: function (itemCode) {
                return $resource(Api.item(itemCode)).get()
            }
        };
    }]);