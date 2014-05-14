/**
 * Returns an object on the format {distance: value}
 *
 * If a callback function is supplied, the return value will instead be sent to
 * that function.
 */
var getDistanceAPI = function (callback) {
    var distance = {distance: Math.floor((Math.random()*4)+1)},
        delay = Math.floor((Math.random()*1800)+200),
        sleep = function (delay) {
            for (var i = 0; i < delay*0.1; i++) {
                console.log("");
            }
        };
    if (typeof callback !== 'undefined') {
        setTimeout(function () {
            callback(distance);
        }, delay);
        return false;
    }

    sleep(delay);
    return distance;
};