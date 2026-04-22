// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Dark / light mode toggle
function applyTheme(theme) {
    const body = document.body;
    const icon = document.getElementById('theme-toggle-icon');
    if (!body || !icon) return;

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
    }
}

const savedTheme = localStorage.getItem('theme-preference') || 'light';
applyTheme(savedTheme);

const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        const nextTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme-preference', nextTheme);
        applyTheme(nextTheme);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Initialize EmailJS
(function () {
    emailjs.init("sPP6U99_JT2j4U20L");
})();

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const statusDiv = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        statusDiv.className = 'text-center p-4 rounded-lg bg-red-100 text-red-700 border border-red-200';
        statusDiv.textContent = 'Veuillez remplir tous les champs.';
        statusDiv.classList.remove('hidden');
        return;
    }

    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    statusDiv.classList.add('hidden');

    const templateParams = {
        to_email: 'maryamlabyed2002@gmail.com',
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    emailjs.send('service_ve292ea', 'template_5don5bw', templateParams)
        .then(function () {
            statusDiv.className = 'text-center p-4 rounded-lg bg-green-100 text-green-700 border border-green-200';
            statusDiv.textContent = 'Message envoyé avec succès! Je vous répondrai bientôt.';
            form.reset();
        }, function () {
            statusDiv.className = 'text-center p-4 rounded-lg bg-red-100 text-red-700 border border-red-200';
            statusDiv.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
        })
        .finally(function () {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            statusDiv.classList.remove('hidden');
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
});
