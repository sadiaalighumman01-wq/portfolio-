/* ==========================================================
   Sadia Ihsan - Portfolio Website JavaScript
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Navbar shadow & glass on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-brand-600', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-brand-600', 'font-bold');
      }
    });
  });
});

// 4. Copy to Clipboard utility
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = `<i class="fa-solid fa-check mr-1 text-emerald-600"></i> Copied!`;
    buttonElement.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
    
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
    }, 2500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// 5. Handle Contact Form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('form-feedback');

  if (!name || !email || !message) {
    feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 block';
    feedback.innerText = 'Please fill out all required fields.';
    return;
  }

  // Compose mailto link so it directly opens user's email client ready to send to Sadia!
  const mailtoLink = `mailto:sadiaalighumman01@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

  feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 block';
  feedback.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Opening your email client to send your message to <strong>sadiaalighumman01@gmail.com</strong>...`;

  setTimeout(() => {
    window.location.href = mailtoLink;
  }, 700);
}
