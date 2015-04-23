var app = angular.module('BeiriPage', ['youtube-embed',
                                        'duScroll',
                                        'angular-carousel',
                                        'cfp.hotkeys']);

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

app.controller('BeiriController', ['$scope', '$document', '$http', 'hotkeys',
                                    function($scope, $document, $http, hotkeys) {
    $scope.aboutExpanded = false;
    $scope.contactExpanded = false;
    $scope.likes = '---';
    var ctrl = this;
    ctrl.carouselVisible = false;
    ctrl.carouselPictures = false;
    ctrl.carouselIndex = 0;

    hotkeys.add({
        combo: 'right',
        description: 'This one goes to 11',
        callback: function() {
            ctrl.carouselIndex++;
        }
    });

    hotkeys.add({
        combo: 'left',
        description: 'This one goes to 11',
        callback: function() {
            ctrl.carouselIndex--;
        }
    });

    hotkeys.add({
        combo: 'esc',
        description: 'This one goes to 11',
        callback: function() {
            ctrl.carouselVisible = false;
        }
    });

    this.expand = function(view) {
        this.collapseAll();

        switch (view) {
            case 'contact':
                $scope.contactExpanded = true;
                scrollTo('contact');
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

    this.contact = function(name, phone, mail, msg) {
        var DEST = 'tonipenyaalba@gmail.com';
        console.log({
                    from: mail,
                    to: DEST,
                    subject: 'Missatge de ' + name + ' ' + phone,
                    text: msg
                });

        $http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
        $http.defaults.headers.common['Authorization'] = 'Basic ' + '8925958ecf7b7596d7243473c897b51c:d298e35a3b0fa04532a89f4326ac3650';

        // var req = {
        //         method: 'POST',
        //         url: 'https://api.mailjet.com/v3/send/message',
        //         headers: {
        //             "Access-Control-Request-Headers": "accept, origin, authorization",
        //             'Authorization': 'Basic ' + '8925958ecf7b7596d7243473c897b51c:d298e35a3b0fa04532a89f4326ac3650'
        //         },
        //         data: {
        //             from: mail,
        //             to: DEST,
        //             subject: 'Missatge de ' + name + ' ' + phone,
        //             body: msg
        //         }
        // };
        //
        //
		// $http(req)
		$http
            .post('https://api.mailjet.com/v3/send/message'
            // .post('https://8925958ecf7b7596d7243473c897b51c:d298e35a3b0fa04532a89f4326ac3650@api.mailjet.com/v3/send/message'
                , {
                    from: mail,
                    to: DEST,
                    subject: 'Missatge de ' + name + ' ' + phone,
                    body: msg
                })
            .success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				console.log('yes!');

			})
			.error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log('no!');
			});
	};

    this.collapseYears = function(exceptionYear) {
        for (var i = 0; i < $scope.years.length; i++) {
            if ($scope.years[i].year != exceptionYear) {
                $scope.years[i].expanded = false;
            }
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
        // TODO: This function hurts my eyes. Please refactor.
        this.carouselPictures = [];
        if (gig) {
            var pictures = gig.content.pictures.fullsize;
            for (var k in pictures) {
                this.carouselPictures.push({url: pictures[k], title: gig.title});
            }
        } else {
            for (var i in $scope.years) {
                for (var j in $scope.years[i].gigs) {
                    var gig = $scope.years[i].gigs[j];

                    if (gig.content && gig.content.pictures
                                    && gig.content.pictures.fullsize) {
                        var pictures = gig.content.pictures.fullsize;
                        for (var k in pictures) {
                            this.carouselPictures.push({url: pictures[k], title: gig.title});
                        }
                    }
                }
            }
        }

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

                $scope.years[0].expanded = true;
                ctrl.collapseYears($scope.years[0].year);
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
}]);
