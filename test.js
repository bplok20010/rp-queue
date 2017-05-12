'use strict';
const RPQueue = require('./index');



function getTasks() {
    var tasks = [];
    for (let i = 0; i < 30; i++) {
        tasks.push(function() {
            return new Promise(function(resolve) {
                var time = ~~(Math.random() * 2000)
                setTimeout(() => {
                    console.log(i, time);
                    resolve();
                }, time);
            });
        });
    }

    return tasks;
}



RPQueue(getTasks()).then(function() {
    console.log('----------')
    return RPQueue(getTasks(), 1);
}).then(function() {
    console.log('----------')
    RPQueue(getTasks(), 5);
});