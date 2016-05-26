define(function(){
    var data = [{
        name: 'MyName'
    }];

    var result = {
        done: function(callback){
            callback(data);
            return result;
        }
    };

    return {
        list: function(){
            return result;
        }
    };
});