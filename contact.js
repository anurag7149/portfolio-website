(() => {
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const mobile = String(data.get('mobile') || '').trim();
    const location = String(data.get('location') || '').trim();
    const enquiry = String(data.get('enquiry') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Portfolio enquiry — ${enquiry} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Mobile: ${mobile}`,
      `Location: ${location}`,
      `Enquiry about: ${enquiry}`,
      '',
      'Project brief:',
      message || 'Not provided'
    ].join('\n');

    if (status) status.textContent = 'Your enquiry is ready. Opening your mail app…';
    window.location.href = `mailto:anuragyadav7149@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
