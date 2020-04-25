(function () {
	console.log('start inject')
	var a = document.querySelector('main>.container-lg');
	a.className = a.className.replace('container-lg', '');
	console.log('end inject', a)
})();