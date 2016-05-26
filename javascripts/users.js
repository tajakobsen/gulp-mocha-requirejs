define(['jquery', 'services/userservice'], function($, UserService){
    return {
        listUsers: function(){
            return UserService.list().done(function(users){
                $.each(users, function(i, user) {
                    $("<li>").text(user.name).appendTo("#users");
                });
            });
        }
    };
});