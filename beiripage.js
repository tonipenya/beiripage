var app = angular.module('BeiriPage', ['youtube-embed',
                                        'duScroll']);

app.value('duScrollDuration', 500);
app.value('duScrollOffset', 20);

app.directive("navscroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            var YOFFSET_SHRINK = 10;

            if (this.pageYOffset > YOFFSET_SHRINK) {
                scope.shrinkNav = true;
            } else {
                scope.shrinkNav = false;
            }

            scope.$apply();
        });
    };
});

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
                    title: 'Port Aventura 20è aniversari',
                    date: '01 de Maig de 2015'
                },
                {
                    title: '2n Aniversari Beirão Percussió',
                    date: '25 d\'Abril de 2015',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'Sant Medir',
                    date: '03 de Març de 2015'
                },
                {
                    title: 'Any nou Xinès',
                    date: '21 de Febrer de 2015',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        youtube: 'cUmOx3m_WJU'
                    }
                },
                {
                    title: 'Carnestoltes a Nou Barris',
                    date: '14 de Febrer de 2015',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },{
                    title: 'Correfoc de Santa Eulàlia',
                    date: '07 de Febrer de 2015'
                },
                {
                    title: 'Festival de la Infància',
                    date: '03 de Gener de 2015',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
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
                    title: 'La Marató de TV3',
                    date: '14 de Desembre de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'Classe de Zumba al Claror',
                    date: '27 de Setembre i 19 d\'Octubre de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        youtube: 'cUmOx3m_WJU'
                    }
                },
                {
                    title: 'Mercè 2014',
                    date: '20 i 21 de Setembre de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        youtube: 'cUmOx3m_WJU'
                    }
                },
                {
                    title: 'Port Aventura - Oktoberfest',
                    date: '12, 13 i 19 de Setembre de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'Port Aventura - Festa Pirata',
                    date: '16 d\'Agost de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'Port Aventura - Nit Blanca',
                    date: '26 de Juliol de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'Residència Alella',
                    date: '05 de Juliol de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'Barcelona Gay Pride',
                    date: '28 de Juny de 2014',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                },
                {
                    title: 'Revetlla de Sant Joan a Sagrada Família',
                    date: '23 de Juny de 2014',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                },
                {
                    title: 'Festival Kutuprá',
                    date: '21 de Juny de 2014',
                    content: {
                        desc: 'descripcio del bolo amb descripcio'
                    }
                },
                {
                    title: 'Concerts al barri de La Prosperitat',
                    date: '30 i 31 de Maig de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: 'AS de Repiques 2014',
                    date: '17 de Maig de 2014',
                    content: {
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sagittis ante. Praesent ac ligula ac lacus pulvinar hendrerit. Integer in lacus nisi. Mauris pulvinar nisi eu bibendum ultricies. Fusce scelerisque in dui non molestie. ',
                        pictures: [
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                            'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                            'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
                        ]
                    }
                },
                {
                    title: '1r Aniversari Beirão Percussió',
                    date: '03 de Maig de 2014'
                },
                {
                    title: 'Festa Major de la Sagrada Família',
                    date: '26 d\'Abrol de 2014'
                },
                {
                    title: 'Carnestoltes',
                    date: '27 i 28 de Febrer i 1 de Març de 2014'
                },
                {
                    title: 'Any nou Xinès',
                    date: '01 de Febrer de 2014'
                }
            ]
        },
        {
            year: 2013,
            ngigs: 100,
            coverpic: 'img/year_cover_bw.jpg',
            gigs: [
                {
                    title: '20 anys de la Farfolla de la Sagrada Família',
                    date: '14 de Desembre de 2013'
                },
                {
                    title: 'Bodes',
                    date: '03 d\'Agost de 2013'
                },
                {
                    title: 'Torneig Solidari de Futbol',
                    date: '29 de Juny de 2013'
                },
                {
                    title: 'Vilanova Somriu',
                    date: '15 de Juny de 2013'
                },
                {
                    title: 'Fundació Disgrup',
                    date: '26 de Maig de 2013'
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
