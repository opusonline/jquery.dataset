jQuery dataset
==============

jQuery approach ist to use `$.fn.data` but this does not updates dom, only memory - this script makes use of native js `element.dataset`

# Features

- prefers [HTML5 dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- fallback to elements attribute `data-*`

# Examples

```javascript
$('#element').dataset('foo', 'bar');

var foo = $('#element').dataset('foo'); // 'undefined' if not set

$('#element').dataset('fooBar', '1'); // <div id="element" data-foo-bar="1"></div>

$('#element').dataset({
	'foo': 'bar',
	'bla': 'blub'
});

var array = [1, 2, 3];
$('#element').dataset('foo', array);
// uses toString() method - <div id="element" data-foo="1,2,3"></div>

$('#element').removeDataset('foo');

$('#element').removeDataset('foo bar');
```