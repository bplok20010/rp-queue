'use strict';

module.exports = function RPQueue(iarr, limit) {
    return new Promise(function(resolve, reject) {
        var taskStat = {};
        iarr = iarr || [];
        limit = Math.min(Math.max(limit || iarr.length, 1), iarr.length);

        if (!iarr.length) {
            resolve();
            return;
        }

        function complete() {
            var doing = false;
            for (var k in taskStat) {
                if (taskStat[k]) {
                    doing = true;
                    break;
                }
            }

            if (!doing) {
                resolve();
            }
        }

        var next = function(taskId) {
            if (!iarr.length) {
                complete();
                return;
            }

            var fn = iarr.shift();
            taskStat[taskId] = true;

            function start() {
                taskStat[taskId] = false;
                next(taskId);
            }

            fn().then(start, start);
        };


        for (var i = 1; i <= limit; i++) {
            next(i);
        }
    });
}