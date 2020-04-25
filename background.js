// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({className: 'container-lg'}, function() {
    console.log('className is container-lg');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'github.com'},
      })]
      , actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.storage.sync.get(['className'], function (result) {
      var className = result['className'];
      chrome.tabs.executeScript(
        tabId,
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
  }
});