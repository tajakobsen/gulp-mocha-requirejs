define(['jquery'], function($){
    return {
        list: function(){
            return $.getJSON("api/users");
        }
    };
});