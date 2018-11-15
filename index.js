'use strict';

function isPromiseLike(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var TASK_RUNNNG = 1;
var TASK_COMPLETE = 2;
/**
 * 
 * @param {array} iarr 任务列表
 * @param {number[iarr.length]|object} limit 并发执行数 默认为所有任务同时执行
 * @param limit.limit [iarr.length]
 * @param limit.process [t => Promise...]
 * @example
 * RPQueue([1,2,3], {
 *  limit: 1,
 *  process: t => Promise.resolve(t)
 * })
 */
module.exports = function RPQueue(iarr, limit) {

    return new Promise(function (resolve, reject) {
        var taskStat = {};
        var idx = 0;
        var process = null;

        if (typeof limit === 'object') {
            process = limit.process;
            limit = limit.limit || iarr.length;
        }

        iarr = iarr || [];
        limit = Math.min(Math.max(limit || iarr.length, 1), iarr.length);

        if (!iarr.length) {
            resolve();
            return;
        }

        function complete() {
            var isRunning = false;
            for (var tid in taskStat) {
                if (taskStat[tid] === TASK_RUNNNG) {
                    isRunning = true;
                    break;
                }
            }

            if (!isRunning) {
                resolve();
            }
        }

        var next = function (taskId) {
            if (idx >= iarr.length) {
                complete();
                return;
            }
            var promise;
            var fn = iarr[idx++];

            if (typeof process === 'function') {
                fn = process(fn);
            }

            if (isPromiseLike(fn)) {
                promise = fn;
            } else {
                promise = fn();
            }

            taskStat[taskId] = TASK_RUNNNG;

            function start() {
                taskStat[taskId] = TASK_COMPLETE;
                next(taskId);
            }

            promise.then(start, start);
        };

        for (var i = 1; i <= limit; i++) {
            next(i);
        }
    });
}