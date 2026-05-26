AOS.init({ once: true, offset: 50 });

const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('py-6');
        }
    });
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.add('hidden');
}

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
            icon.style.transform = 'rotate(0deg)';
        } else {
            document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.faq-btn i').forEach(i => {
                i.classList.remove('fa-minus');
                i.classList.add('fa-plus');
                i.style.transform = 'rotate(0deg)';
            });
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

const fileInput = document.getElementById('attachment');
const fileLabel = document.getElementById('file-label');
if (fileInput && fileLabel) {
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
        } else {
            fileLabel.textContent = 'Joindre un fichier (plans, photos, PDF)';
        }
    });
}
