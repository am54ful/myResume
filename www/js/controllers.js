angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('youtubeCtrl', function($scope, $http){

 $scope.videos = [];
 $scope.youtubeParams = {
      key: 'AIzaSyB7wu2PaLCh2qhH7H3ZQ7q393Y-5H0eurU',
      type: 'video',
      maxResults: '50',
      part: 'id,snippet',
      // fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
      q: this.query,
      order: 'date',
      channelId: 'UChz-g669jwIJApRuguWrT1w',
    }


$http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      // console.log(response);
      angular.forEach(response.items, function(child){
        $scope.videos.push(child);
      });
    });

 })



.controller('instaCtrl', function($scope, $http, $q) {

  $scope.init = function(){
    $scope.getImages()
    .then(function(res){
      // success
      // console.log('Images: ',res)
      $scope.imageList = res.data;
    }, function(status){
      // err
      // console.log('Error: ', status)
    })
  }

  $scope.getImages = function(){
    var defer = $q.defer();
    var url = "https://api.instagram.com/v1/users/1264443022/media/recent?access_token=1264443022.1fb234f.20edc1f2e36741ceb9c86947225c0d37&callback=JSON_CALLBACK";
    $http.jsonp(url)
    .success(function(res){
      defer.resolve(res)
    })
    .error(function(status, err){
      defer.reject(status)
    })

    return defer.promise;
  }

  $scope.init();
})



.controller('contactCtrl', function($scope) {})


// mail controller
.controller('mailCtrl', function($scope){
  $scope.mail={};
  $scope.sendEmail = function () {
    
    
    $subject = $scope.mail.subject;
    $comment = $scope.mail.comment;

    // console.log($subject.concat($comment));
    if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            $subject, // Subject
            $comment,                      // Body
            ["lan.psis@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
    }
});