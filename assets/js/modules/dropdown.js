export function initializeDropdown() {
  console.log('Initializing dropdown...');
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  console.log('Dropdown items found:', dropdownItems);

  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');

    console.log('Item:', item);
    console.log('Toggle:', toggle);
    console.log('Menu:', menu);

    if (!toggle || !menu) {
      console.warn('Missing .dropdown-toggle or .dropdown-menu');
      return;
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        menu.style.display = 'none';
      }
    });
  });
}


  