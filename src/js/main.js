// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

//http://y-anz-m.blogspot.com/2010/09/google-chrome-extension_15.html
function click(e) {
  var coder = document.getElementById('code-sample');
  var htmlstring = "<!DOCTYPE html>";
  htmlstring += '\n' + '<html lang="ja" data-sticky-footer="tr</html>ue">';
  htmlstring += '\n' + '<head>';
  htmlstring += '\n' + '  <meta charset="utf-8">';
  htmlstring += '\n' + '  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">';
  htmlstring += '\n' + '  <meta name="description" content="description" />';
  htmlstring += '\n' + '  <title>サイトタイトル</title>';
  htmlstring += '\n' + '  <link href="css/reset.css" media="all" rel="stylesheet" type="text/css" />';
  htmlstring += '\n' + '  <link href="css/style.css" media="all" rel="stylesheet" type="text/css" />';
  htmlstring += '\n' + '  <link rel="shortcut icon" href="img/favicon.ico" />';
  htmlstring += '\n' + '</head>';
  htmlstring += '\n' + '<body>';
  htmlstring += '\n' + '<div class="wrapper">';
  htmlstring += '\n' + '  <header>';
  htmlstring += '\n' + '  </header>';
  htmlstring += '\n' + '  <nav>';
  htmlstring += '\n' + '  </nav>';
  htmlstring += '\n' + '  <main>';
  htmlstring += '\n' + '    <section>';
  htmlstring += '\n' + '    </section>';
  htmlstring += '\n' + '  </main>';
  htmlstring += '\n' + '</div>';
  htmlstring += '\n' + '  <script type="text/javascript" src="script.js"></script>';
  htmlstring += '\n' + '</body>';
  htmlstring += '\n' + '</html>';

  htmlstring = htmlstring.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  coder.innerHTML = htmlstring;
  coder.style.backgroundColor = "#ededed";
  coder.style.margin = "8px";
  coder.style.padding = "8px 0 8px 0";
}

document.addEventListener("DOMContentLoaded", function () {
  var divs = document.querySelectorAll("div.item-style");
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", click);
  }
});