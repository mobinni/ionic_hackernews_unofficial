/**
 * Created by mobinni on 06/04/15.
 */
angular.module('hackerNewsApp')
    .controller('StoriesCtrl', ['$scope', 'svNews', '$ionicLoading', '$ionicModal', '$location', '$ionicScrollDelegate',
        function ($scope, svNews, $ionicLoading, $ionicModal, $location, $ionicScrollDelegate) {
            var isNew = $location.path() == '/app/new';

            $scope.stories = [];
            $scope.currentStory = null;
            $scope.title = isNew ? 'New' : 'Top';
            $scope.from = 0;
            $scope.to = 50;

            $scope.reload = function () {

                $ionicLoading.show({
                    template: 'Loading...'
                });
                svNews.getArticles(isNew, $scope.from, $scope.to).then(function (topstories) {
                    $ionicLoading.hide();
                    if (topstories.data) {
                        $scope.stories = topstories.data;
                    } else {
                        // Get cached data if connection would be faulty
                        $scope.stories = JSON.parse(window.localStorage['storyCache'])
                    }
                    if($scope.from <= 0) $ionicScrollDelegate.scrollTop();
                    else $ionicScrollDelegate.scrollTo(0, 55);
                });
            };
            $scope.reload();

            $scope.loadNextStories = function () {
                $scope.from += 51;
                $scope.to += 51;
                $scope.reload();
            };
            $scope.loadPreviousStories = function () {
                $scope.from -= 51;
                $scope.to -= 51;
                $scope.reload();
            };
            $scope.$on('reloadEvent', function () {
                $scope.reload();
            });

            $scope.goToStory = function (story) {
                if (story.url) {
                    // _blank inappview
                    // _self = same window
                    // _system = safari
                    window.open(story.url, '_blank', 'location=yes');
                } else if (story.text) {
                    $scope.showStoryInfo(story);
                }
            };
            $scope.showStoryInfo = function (story) {
                $ionicModal.fromTemplateUrl('templates/modals/post_info.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.currentStory = story;
                    $scope.modal.show();
                });
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
        }]);
