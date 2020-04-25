// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let okBtn = document.getElementById('okBtn');
var classNameInput = document.getElementsByName('className')[0];
chrome.storage.sync.get(['className'], function (result) {
  classNameInput.value = result['className'];
})
okBtn.addEventListener('click', function() {
  var className = classNameInput.value;
  chrome.storage.sync.set({className}, function() {
    console.log('className is ' + className);
  })
});