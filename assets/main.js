(function () {
  'use strict';

  const onLoaded = () => {
    document.documentElement.classList.add('js');

    for (const header of document.querySelectorAll('.sidebar .sub-title')) {
      header.role = 'button';
      header.tabIndex = 0;
      header.ariaExpanded = true;
      header.ariaControlsElement = header.nextElementSibling;
      const toggle = () => {
        header.nextElementSibling.classList.toggle('collapsed');
        const collapsed =
          header.nextElementSibling.classList.contains('collapsed');
        header.ariaExpanded = !collapsed;
        header.parentNode.classList.toggle('collapsed', collapsed);
      };
      header.addEventListener('click', toggle);
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Space' || e.key === ' ') {
          toggle();
          e.preventDefault();
        }
      });
      if (!header.nextElementSibling.querySelector('.active')) {
        toggle();
      }
    }

    const toggle = document.querySelector('.sidebar .toggle-button');
    toggle.addEventListener('click', () => {
      const collapsed = document.querySelectorAll(
        '.sidebar li.collapsed:not(.stay-collapsed)'
      );
      if (collapsed.length) {
        for (const collapsible of collapsed) {
          collapsible.querySelector('.sub-title').click();
        }
        toggle.querySelector('strong').textContent = '\u2212'; // minus sign
        toggle.querySelector('span').textContent = 'Collapse All';
      } else {
        for (const collapsible of document.querySelectorAll(
          '.sidebar > ul > li:not(.stay-collapsed)'
        )) {
          collapsible.querySelector('.sub-title').click();
        }
        toggle.querySelector('strong').textContent = '+';
        toggle.querySelector('span').textContent = 'Expand All';
      }
    });
  };

  if (['interactive', 'complete'].indexOf(document.readyState) !== -1) {
    onLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', onLoaded);
  }
})();
