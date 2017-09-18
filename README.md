# Vue-Easy-Alert

![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")

A alert plugin for vue2.

[DEMO](https://ae86jung.github.io/vue2-easy-alert/example/)


**Note:**

Issue/PR is welcomed, I'll response as soon as possible.

## Usage

#### install
`npm install vue-easy-alert-wangzhy --save`

#### Quickstart
```javascript

	// before start
	import Alert from 'vue-easy-alert-wangzhy'
	
	Vue.use(Alert)
	
	// in your code
	Vue.alert('Can I have everybody`s attention?')
	
	// or
	$vm.$alert('Let me give a toast to you all.')
```

#### More

`alert` or `$alert` takes 2 parameter: `(message, [options])`

##### Options

Parameter | Type |Default| Description
--------- | ---- | ------|-----------
id | `string` | `easy-alert-default` | Unique identifier globally. Use this to create multiple toasts with different setups.
parent | `string`| `body` | Selector of the container (TODO, not ready yet, position is fixed to the window)
title | `string` | | Self-defined title to pass through. 
titleStyle | `string` |  | You can custom title properties here.
isConfirm | `boolean` | `false` | You can open the function of confirm here.
isAsync | `boolean` | `false` | If the request is asynchronous when you click the OK button,you can set this true.This property only applies when `isConfirm` is true.
onOk | `function` |  | When you click the Ok button, this function will be called.If the `isAsync` is true, this function has a parameter `success`.You can call `success` when the asynchronous request is success.


##### example
```javascript
//Simplest alert
$vm.$alert(this.message);

//alert with title and custom the title style
$vm.$alert(this.message, {
  title: '提醒',
  titleStyle: 'color:red;'
});

//cofirm with title  
$vm.$alert(this.message, {
  title: '提醒',
  titleStyle: 'color:red;',
  isConfirm: true,
  onOk(){
	
  }
});

//cofirm with title and Synchronous request
$vm.$alert(this.message, {
  title: '提醒',
  titleStyle: 'color:red;',
  isConfirm: true,
  isAsync: true,
  onOk(success){
	ajax({
		//...ajax success call the parameter function
        success();
    })
  }
});

```

##### TODO
*  Custom button styles and content styles

## License
MIT

