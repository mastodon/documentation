(function () {
  'use strict';

  const onLoaded = () => {
    // Nothing for now
  };

  if (['interactive', 'complete'].indexOf(document.readyState) !== -1) {
    onLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', onLoaded);
  }
})();
