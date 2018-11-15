## Install

```
$ npm install --save rp-queue
```

## Usage

```js
const RPQueue = require('rp-queue');

let tasks = [
	function(){
		return Promise.resolve()
	},
	function(){
		return Promise.resolve()
	},
	function(){
		return Promise.resolve()
	},
	function(){
		return Promise.resolve()
	},
	function(){
		return Promise.resolve()
	}
];

RPQueue(tasks, 2).then(()=>{
	console.log('done');
});

=======================

const RPQueue = require('rp-queue');

let tasks = [
	1,2,3,4,5
];

RPQueue(tasks, {
    limit: 2,
    process: tid => Promise.resolve(tid)
}).then(()=>{
	console.log('done');
});

```