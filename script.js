// ============ NAV TOGGLE (mobile hamburger) ============
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Tandai link nav yang aktif sesuai halaman saat ini
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === current) a.classList.add('active');
  });

  // ============ ANIMASI SKILL BAR SAAT TERLIHAT DI LAYAR ============
  const bars = document.querySelectorAll('.skill-bar-fill');
  if(bars.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const target = entry.target.dataset.level;
          entry.target.style.width = target + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(bar => observer.observe(bar));
  }

  // ============ COPY EMAIL ============
  const copyBtn = document.getElementById('copyEmailBtn');
  if(copyBtn){
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback.textContent = 'Email disalin ke clipboard!';
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2200);
      });
    });
  }

  // ============ VALIDASI FORM KONTAK SEDERHANA ============
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#formName').value.trim();
      const email = form.querySelector('#formEmail').value.trim();
      const message = form.querySelector('#formMessage').value.trim();
      const msgBox = document.getElementById('formMsg');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!name || !email || !message){
        msgBox.textContent = 'Semua kolom wajib diisi ya.';
        msgBox.className = 'form-msg error';
        return;
      }
      if(!emailPattern.test(email)){
        msgBox.textContent = 'Format email belum valid.';
        msgBox.className = 'form-msg error';
        return;
      }

      msgBox.textContent = 'Pesan siap dikirim! (Demo — belum tersambung ke server)';
      msgBox.className = 'form-msg success';
      form.reset();
    });
  }
});
