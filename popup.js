// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
chrome.storage.sync.get(['className'], function (result) {
	var className = result['className'];
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.executeScript(
	    tabs[0].id,
	    {
	    	code: `(function () {
					console.log('start inject')
					var a = document.querySelector('main>.${className}');
					if (!a) return;
					a.className = a.className.replace('${className}', '');
					console.log('end inject', a)
				})();`
		});
	});
});