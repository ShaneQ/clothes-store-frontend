//
// vote.js
//

"use strict";

(function () {
  var $toggle = $('[data-bs-toggle="vote"]');

  $toggle.on("click", function (e) {
    e.preventDefault();

    var $this = $(this);
    var count = $this.attr("data-count");

    $this.attr("data-count", ++count);
  });
})();
