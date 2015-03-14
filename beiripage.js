var app = angular.module('BeiriPage', ['youtube-embed']);

app.controller('BeiriController', ['$scope', function($scope) {
    $scope.posts = getPosts();
}]);

function getPosts() {
    return [
        {
            title: 'bolo fotos',
            date: 'una data',
            desc: 'descripcio del bolo amb fotos',
            pictures: [
                'https://scontent-mad.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/10308344_908973512470629_452133408834186550_n.jpg?oh=838bc895a1d7b44a2b41ed5ca9ab8a0c&oe=557E2D4C',
                'https://scontent-mad.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11034308_908973482470632_7041379705912555940_n.jpg?oh=f8f983b1a4d4bad9953a537474733f36&oe=55B67BA3',
                'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/11021153_908973435803970_4972357321582845133_n.jpg?oh=57b7725fb62aed5d1e92b2d636dc409a&oe=5577C64A&__gda__=1438387744_e5d825251b97fe90c8e80342d1d49d70'
            ],
            youtube: ''
        },
        {
            title: 'bolo amb descripcio',
            date: 'una data',
            desc: 'descripcio del bolo amb descripcio',
            pictures: [],
            youtube: ''
        },
        {
            title: 'bolo amb youtube',
            date: 'una data',
            desc: 'descripcio del bolo amb youtube',
            pictures: [],
            youtube: 'cUmOx3m_WJU'
        }
    ];
}
