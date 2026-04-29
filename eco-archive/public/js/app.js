// ── Theme toggle (dark default) ──
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') document.body.classList.add('light');

themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  themeBtn.textContent = document.body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
});
if (themeBtn) themeBtn.textContent = document.body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';

// ── Low-Data toggle ──
const lowBtn = document.getElementById('lowDataToggle');
if (localStorage.getItem('lowData') === 'true') document.body.classList.add('low-data');
lowBtn?.addEventListener('click', () => {
  document.body.classList.toggle('low-data');
  localStorage.setItem('lowData', document.body.classList.contains('low-data'));
});

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

// ── File preview ──
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('filePreview');
fileInput?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    preview.textContent = `📄 ${file.name} — ${(file.size / 1024).toFixed(1)} KB`;
    preview.style.display = 'block';
  }
});
