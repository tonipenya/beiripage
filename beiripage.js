var app = angular.module('BeiriPage', ['youtube-embed', 'ngAnimate', 'duScroll']);

app.value('duScrollDuration', 500);
app.value('duScrollOffset', 20);

app.controller('BeiriController', ['$scope', '$document', function($scope, $document) {
    $scope.aboutExpanded = false;
    $scope.contactExpanded = false;

    loadPosts();

    this.expand = function(view) {
        collapseAll();

        switch (view) {
            case 'contact':
                $scope.contactExpanded = true;
                scrollTo('contact');
                break;

            case 'pictures':
                expand(function (post) {
                    return post.content && post.content.pictures && post.content.pictures.length > 0;
                });
                break;

            case 'videos':
                expand(function (post) {
                    return post.content && post.content.youtube;
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

    function scrollTo(id) {
        var element = angular.element(document.getElementById(id));
        $document.scrollToElementAnimated(element);
    }

    function expand(condition) {
        var firstPostId;
        for (var i in $scope.posts) {
            var post = $scope.posts[i];
            if (condition(post)) {
                firstPostId = firstPostId? firstPostId: post.id;
                $scope.posts[i].expanded = true;
            }
        }

        scrollTo('post' + firstPostId);
    };

}]);

function getPosts() {
    posts = [
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

    for (var i in posts) {
        posts[i].id = i;
    }

    return posts;
}
