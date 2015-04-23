var CoomingSoon = function () {

    return {
        //main function to initiate the module
        init: function () {

            $.backstretch([
    		        "assets/img/bg/bg1.jpg",
    		        "assets/img/bg/bg2.jpg",
    		        "assets/img/bg/bg3.jpg",
    		        "assets/img/bg/bg4.jpg",
    		        "assets/img/bg/bg5.jpg"
    		        ], {
    		          fade: 1000,
    		          duration: 10000
    		    });

            var austDay = new Date();
//            austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
            austDay = new Date(2015,3,25);
            $('#defaultCountdown').countdown({until: austDay});
            $('#year').text(austDay.getFullYear());
        }

    };

}();