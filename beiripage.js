var app = angular.module('BeiriPage', ['youtube-embed', 'ngAnimate', 'duScroll']);

app.controller('BeiriController', ['$scope', '$document', function($scope, $document) {
    $scope.aboutExpanded = false;
    $scope.contactExpanded = false;

    loadPosts();

    this.expand = function(view) {
        collapseAll();

        switch (view) {
            case 'contact':
                $scope.contactExpanded = true;
                var contact = angular.element(document.getElementById('contact'));
                $document.scrollToElementAnimated(contact, 20, 500);
                break;

            case 'pictures':
                for (var i in $scope.posts) {
                    var post = $scope.posts[i];
                    if (post.content && post.content.pictures && post.content.pictures.length > 0) {
                        $scope.posts[i].expanded = true;
                    }
                }
                break;

            case 'videos':
                for (var i in $scope.posts) {
                    var post = $scope.posts[i];
                    if (post.content && post.content.youtube) {
                        $scope.posts[i].expanded = true;
                    }
                }
                break;

            case 'about':
                $scope.aboutExpanded = true;
                var about = angular.element(document.getElementById('about'));
                $document.scrollToElementAnimated(about, 20, 500);
                break;

            default:
                // Do nothing
                break;
        }
    }

    this.contact = function(msg) {
        console.log('contact form filled with: ' + msg);
    }

    function loadPosts() {
        $scope.posts = getPosts();
        collapseAll();
    }

    function collapseAll() {
        $scope.aboutExpanded = false;
        $scope.contactExpanded = false;

        for (var i in $scope.posts) {
            $scope.posts[i].expanded = false;
        }
    }

}]);

function getPosts() {
    return [
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
        }
    ];
}
