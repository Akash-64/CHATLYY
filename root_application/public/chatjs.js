const menuButton = document.querySelector('.menu-icon');
const dropdownMenu = document.querySelector('.dropdown-content');

menuButton.onclick = (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
};

document.querySelectorAll('.dropdown-item > a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = this.nextElementSibling;

        document.querySelectorAll('.submenu').forEach(otherSubmenu => {
            if (otherSubmenu !== submenu) {
                otherSubmenu.classList.remove('show');
            }
        });

        submenu.classList.toggle('show');
    });
});

window.onclick = () => {
    document.querySelectorAll('.dropdown-content, .submenu').forEach(menu => {
        menu.classList.remove('show');
    });
};

document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const linkText = this.textContent.trim();
        const parentItem = this.closest('.dropdown-item');

        if (linkText === 'Private group') {
            if (parentItem.querySelector('a').textContent === 'Create group') {
                window.open('privatecreate.html', 'Create Group', 
                    'width=450,height=500,top=50%,left=50%,transform=translate(-50%,-50%)');
            } else if (parentItem.querySelector('a').textContent === 'Join group') {
                window.open('privatejoin.html', 'Join Group', 
                    'width=450,height=400,top=50%,left=50%,transform=translate(-50%,-50%)');
            }
        }
        else if (linkText === 'Public group') {
            // Get username from existing context or use default
            const username = localStorage.getItem('savedUsername') || 'Anonymous';
            const room = 'general';  // Default public room
            
            // Redirect with parameters
            window.location.href = `http://localhost:3000?username=${encodeURIComponent(username)}&room=${encodeURIComponent(room)}`;
        }
        
        
    });
});