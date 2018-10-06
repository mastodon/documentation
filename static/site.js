(function () {
  'use strict';

  function onLoaded () {
    function toggleSubMenu () {
      var subMenus = document.getElementsByClassName('sub-menu');

      for (var i = 0; i < subMenus.length; i++) {
        subMenus[i].classList.add('collapsed');
      }

      this.parentNode.querySelector('.sub-menu').classList.remove('collapsed');
    }

    var menuLinks = document.getElementsByClassName('menu-item');

    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', toggleSubMenu, false);
    }
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    onLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', onLoaded);
  }
})();
