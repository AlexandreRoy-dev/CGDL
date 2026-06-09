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

document.querySelectorAll('form[action*="formspree.io"]').forEach(form => {
    const nextInput = form.querySelector('input[name="_next"]');
    if (nextInput) {
        nextInput.value = new URL('merci.html', window.location.href).href;
    }
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

if (!document.getElementById('messenger-float')) {
    const messengerBtn = document.createElement('a');
    messengerBtn.id = 'messenger-float';
    messengerBtn.className = 'messenger-float';
    messengerBtn.href = 'https://m.me/100063132765716';
    messengerBtn.target = '_blank';
    messengerBtn.rel = 'noopener noreferrer';
    messengerBtn.setAttribute('aria-label', 'Discuter sur Messenger avec Groupe CGDL');
    messengerBtn.innerHTML = '<i class="fa-brands fa-facebook-messenger" aria-hidden="true"></i><span class="messenger-float-label">Messenger</span>';
    document.body.appendChild(messengerBtn);
}

(function initCookieConsent() {
    const STORAGE_KEY = 'cgdl-cookie-consent';
    if (localStorage.getItem(STORAGE_KEY)) return;

    const isServicePage = window.location.pathname.includes('/services/');
    const privacyHref = isServicePage ? '../politique-de-confidentialite.html' : 'politique-de-confidentialite.html';

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consentement aux témoins');
    banner.innerHTML = `
        <div class="cookie-banner-inner">
            <p class="cookie-banner-text">
                Ce site utilise des témoins (cookies) pour améliorer votre expérience et analyser la fréquentation.
                En cliquant sur « Accepter », vous consentez à leur utilisation conformément à notre
                <a href="${privacyHref}">politique de confidentialité</a>.
            </p>
            <div class="cookie-banner-actions">
                <button type="button" class="cookie-banner-btn cookie-banner-btn-decline" data-cookie-action="decline">Refuser</button>
                <button type="button" class="cookie-banner-btn cookie-banner-btn-accept" data-cookie-action="accept">Accepter</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);
    document.body.classList.add('cookie-banner-visible');

    requestAnimationFrame(() => banner.classList.add('is-visible'));

    function dismissConsent(value) {
        localStorage.setItem(STORAGE_KEY, value);
        banner.classList.remove('is-visible');
        document.body.classList.remove('cookie-banner-visible');
        setTimeout(() => banner.remove(), 400);
    }

    banner.querySelector('[data-cookie-action="accept"]').addEventListener('click', () => dismissConsent('accepted'));
    banner.querySelector('[data-cookie-action="decline"]').addEventListener('click', () => dismissConsent('declined'));
})();
