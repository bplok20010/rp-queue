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

```