define(['underscore', 'tbd', 'class'], function(_, tbd, Class) {
   var gen = _.extend({
        array: function(fn, freq) {
            freq = freq || 1;
            return _.pluck(tbd.from().prop('data').use(fn).make(freq),'data');
        }
    }, tbd);

    var orig = tbd.utils.sequential;
    gen.utils.sequential = function(start) {
        if (start.constructor === Date && arguments.length > 1 && arguments[1] === 'w') {
            var inc = 0;
            return function () {
                start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
                start.setDate(start.getDate() + inc);
                inc = inc || 7;
                return start;
            }
        }
        else
            return orig.apply(this, arguments);
    };
    return gen;
});
 