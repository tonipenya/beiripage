var app = angular.module('BeiriPage', ['youtube-embed',
                                        'duScroll',
                                        'angular-carousel']);

app.value('duScrollDuration', 500);
app.value('duScrollOffset', 20);

app.directive("navscroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            var YOFFSET_SHRINK = 420;

            if (this.pageYOffset > YOFFSET_SHRINK) {
                scope.shrinkNav = true;
            } else {
                scope.shrinkNav = false;
            }

            scope.$apply();
        });
    };
});

app.controller('BeiriController', ['$scope', '$document', '$http', function($scope, $document, $http) {
    $scope.aboutExpanded = false;
    $scope.contactExpanded = false;
    $scope.likes = '---';
    var ctrl = this;
    this.carouselVisible = false;
    this.carouselPictures = false;
    this.carouselIndex = 0;

    this.expand = function(view) {
        this.collapseAll();

        switch (view) {
            case 'contact':
                $scope.contactExpanded = true;
                scrollTo('contact');
                break;

            case 'pictures':
                expand(function (gig) {
                    return gig.content && gig.content.pictures
                            && gig.content.pictures.thumbnails
                            && gig.content.pictures.thumbnails.length > 0;
                });
                break;

            case 'videos':
                expand(function (gig) {
                    return gig.content && gig.content.youtube;
                });
                break;

            case 'about':
                $scope.aboutExpanded = true;
                scrollTo('about');
                break;

            default:
                $document.scrollTo(0,0);
                break;
        }
    };

    this.contact = function(msg) {
        console.log('contact form filled with: ' + msg);
    };

    this.collapseYears = function() {
        $scope.years[0].expanded = true;

        for (var i = 1; i < $scope.years.length; i++) {
            $scope.years[i].expanded = false;
        }
    };

    this.collapseAll = function(exceptionId) {
        $scope.aboutExpanded = false;
        $scope.contactExpanded = false;

        for (var i in $scope.years) {
            for (var j in $scope.years[i].gigs) {
                if ($scope.years[i].gigs[j].id != exceptionId) {
                    $scope.years[i].gigs[j].expanded = false;
                }
            }
        }
    };

    this.showCarousel = function (gig, index) {
        this.carouselPictures = gig.content.pictures.fullsize;
        this.carouselVisible = true;
        this.carouselIndex = index? index: 0;
    };

    this.carouselHasNext = function () {
        return this.carouselIndex < (this.carouselPictures.length-1);
    };

    this.carouselHasPrev = function () {
        return this.carouselIndex > 0;
    }

    this.prevPicture = function () {
        if (this.carouselIndex > 0) {
            this.carouselIndex--;
        }
    };

    this.nextPicture = function () {
        if (this.carouselIndex < this.carouselPictures.length) {
            this.carouselIndex++;
        }
    };

    loadYears();
    loadLikes();

    function loadYears() {
        $http.get('years.json')
            .success(function (years) {
                var gigId = 1;
                for (var i in years) {
                    var year = years[i];

                    for (var j in year.gigs) {
                        year.gigs[j].id = gigId;
                        gigId++;
                    }
                }

                var totalGigs = 0;

                for(var i in years) {
                    totalGigs += years[i].ngigs;
                }

                $scope.years = years;
                $scope.totalGigs = totalGigs;

                ctrl.collapseYears();
                ctrl.collapseAll();
        });
    }

    function loadLikes() {
        $http.get('https://graph.facebook.com/beiraopercussio/')
            .success(function (data) {
                $scope.likes = data.likes;
            })
            .error(function () {
                $scope.likes = '---';
            });
    }

    function scrollTo(id) {
        var element = angular.element(document.getElementById(id));
        $document.scrollToElementAnimated(element);
    }

    function expand(condition) {
        var firstGigId;
        for (var i in $scope.years) {
            var year = $scope.years[i];

            for (var j in year.gigs) {
                var gig = year.gigs[j]
                if (condition(gig)) {
                    firstGigId = firstGigId? firstGigId: gig.id;
                    $scope.years[i].gigs[j].expanded = true;
                }
            }
        }

        scrollTo('gig' + firstGigId);
    };

}]);
