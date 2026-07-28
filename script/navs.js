document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const projectsDropdown = document.getElementById('projectsDropdown');
  const dropdownBtn = projectsDropdown.querySelector('.dropdown-btn');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-btn)');

  // Open/Close Full Screen Menu
  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Prevents scrolling behind the menu
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-active');
    document.body.style.overflow = '';
    closeSubmenu();
  }

  function toggleMenu() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  }

  // Dropdown Submenu Toggle
  function toggleSubmenu(e) {
    e.preventDefault();
    const isOpen = projectsDropdown.classList.contains('is-open');
    if (isOpen) {
      closeSubmenu();
    } else {
      projectsDropdown.classList.add('is-open');
      dropdownBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeSubmenu() {
    projectsDropdown.classList.remove('is-open');
    dropdownBtn.setAttribute('aria-expanded', 'false');
  }

  // Event Listeners
  navToggle.addEventListener('click', toggleMenu);
  dropdownBtn.addEventListener('click', toggleSubmenu);

  // Close menu when clicking any project/navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navMenu.classList.contains('is-active')) {
        closeMenu();
        navToggle.focus();
      } else if (projectsDropdown.classList.contains('is-open')) {
        closeSubmenu();
        dropdownBtn.focus();
      }
    }
  });
});