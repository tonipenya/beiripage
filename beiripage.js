var app = angular.module('BeiriPage', ['youtube-embed',
                                        // 'ngAnimate',
                                        'duScroll']);

app.value('duScrollDuration', 500);
app.value('duScrollOffset', 20);

app.controller('BeiriController', ['$scope', '$document', function($scope, $document) {
    $scope.aboutExpanded = false;
    $scope.contactExpanded = false;
    var ctrl = this;

    this.expand = function(view) {
        this.collapseAll();

        switch (view) {
            case 'contact':
                $scope.contactExpanded = true;
                scrollTo('contact');
                break;

            case 'pictures':
                expand(function (gig) {
                    return gig.content && gig.content.pictures && gig.content.pictures.length > 0;
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

    this.collapseAll = function() {
        $scope.aboutExpanded = false;
        $scope.contactExpanded = false;

        for (var i in $scope.years) {
            for (var j in $scope.years[i].gigs) {
                $scope.years[i].gigs[j].expanded = false;
            }
        }

        return true;
    };

    loadYears();

    function loadYears() {
        $scope.years = getYears();
        ctrl.collapseYears();
        ctrl.collapseAll();
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

function getYears() {
    years = [
        {
            year: 2015,
            ngigs: 200,
            coverpic: 'img/year_cover_bw.jpg',
            gigs: [
                {
                    title: 'bolo fotos',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb fotos',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'bolo amb descripcio',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                },
                {
                    title: 'bolo sense contingut',
                    date: 'una data'
                },
                {
                    title: 'bolo amb youtube',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb youtube',
                        youtube: 'cUmOx3m_WJU'
                    }
                },
                {
                    title: 'bolo fotos',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb fotos',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },{
                    title: 'bolo fotos',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb fotos',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'bolo amb descripcio',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                },
                {
                    title: 'bolo sense contingut',
                    date: 'una data'
                },
                {
                    title: 'bolo amb youtube',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb youtube',
                        youtube: 'cUmOx3m_WJU'
                    }
                },
                {
                    title: 'bolo fotos',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb fotos',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                }
            ]
        },
        {
            year: 2014,
            ngigs: 200,
            coverpic: 'img/year_cover_bw.jpg',
            gigs: [
                {
                    title: 'bolo amb descripcio',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                },
                {
                    title: 'bolo sense contingut',
                    date: 'una data'
                },
                {
                    title: 'bolo amb youtube',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb youtube',
                        youtube: 'cUmOx3m_WJU'
                    }
                },
                {
                    title: 'bolo fotos',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb fotos',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'bolo amb descripcio',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                }
            ]
        },
        {
            year: 2013,
            ngigs: 100,
            coverpic: 'img/year_cover_bw.jpg',
            gigs: [
                {
                    title: 'bolo sense contingut',
                    date: 'una data'
                },
                {
                    title: 'bolo amb youtube',
                    date: 'una data',
                    content: {
                        desc: 'descripcio del bolo amb youtube',
                        youtube: 'cUmOx3m_WJU'
                    }
                }
            ]
        }
    ];

    var gigId = 1;
    for (var i in years) {
        var year = years[i];

        for (var j in year.gigs) {
            year.gigs[j].id = gigId;
            gigId++;
        }
    }

    return years;
}
