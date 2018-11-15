'use strict';
const RPQueue = require('./index');



function getTasks() {
    var tasks = [];
    for (let i = 0; i < 30; i++) {
        tasks.push(function () {
            return new Promise(function (resolve) {
                var time = ~~(Math.random() * 1000)
                setTimeout(() => {
                    console.log(i, time);
                    resolve();
                }, time);
            });
        });
    }

    return tasks;
}


console.log('-----A.limit 30-----')
RPQueue(getTasks())
    .then(function () {
        console.log('-----B.limit 1-----')
        return RPQueue(getTasks(), 1);
    })
    .then(function () {
        console.log('-----C.limit 5-----')
        return RPQueue(getTasks(), 5);
    })
    .then(function () {
        console.log('-----D.limit 1-----');
        var tasks = [];
        for (var i = 0; i < 30; i++) {
            tasks.push(100 + i);
        }
        return RPQueue(tasks, {
            limit: 1,
            process: function (task) {
                console.log(task)
                return Promise.resolve(task)
            }
        });
    })
    .then(function () {
        console.log('-----E.limit 5-----');
        var tasks = [];
        for (var i = 0; i < 30; i++) {
            tasks.push(100 + i);
        }
        return RPQueue(tasks, {
            limit: 5,
            process: function (task) {
                console.log(task)
                return () => Promise.resolve(task)
            }
        });
    });