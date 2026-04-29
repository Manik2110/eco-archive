const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const { requireLogin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/browse', async (req, res) => {
  const { q, subject, type } = req.query;
  let sql = 'SELECT * FROM resources WHERE 1=1';
  const params = [];
  if (q) { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  if (subject) { sql += ' AND subject = ?'; params.push(subject); }
  if (type) { sql += ' AND file_type = ?'; params.push(type); }
  sql += ' ORDER BY created_at DESC';
  const [resources] = await db.query(sql, params);
  const [subjects] = await db.query('SELECT DISTINCT subject FROM resources');
  res.render('browse', { user: req.session.user, resources, subjects, query: req.query });
});

router.get('/upload', requireLogin, (req, res) =>
  res.render('upload', { user: req.session.user, error: null })
);

router.post('/upload', requireLogin, upload.single('file'), async (req, res) => {
  const { title, description, subject, type } = req.body;
  await db.query(
    'INSERT INTO resources (title, description, subject, file_type, filename, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, subject, type, req.file.filename, req.session.user.id]
  );
  res.redirect('/resources/browse');
});

router.get('/download/:id', async (req, res) => {
  const [[resource]] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
  if (!resource) return res.status(404).send('Not found');
  await db.query('UPDATE resources SET downloads = downloads + 1 WHERE id = ?', [req.params.id]);
  res.download(path.join(__dirname, '../public/uploads', resource.filename), resource.title);
});

router.post('/delete/:id', requireLogin, async (req, res) => {
  const [[resource]] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
  if (!resource) return res.status(404).send('Not found');
  if (resource.uploaded_by !== req.session.user.id && !req.session.user.is_admin)
    return res.status(403).send('Forbidden');
  await db.query('DELETE FROM resources WHERE id = ?', [req.params.id]);
  res.redirect('/resources/browse');
});

router.get('/dashboard', requireLogin, async (req, res) => {
  const [resources] = await db.query(
    'SELECT * FROM resources WHERE uploaded_by = ? ORDER BY created_at DESC',
    [req.session.user.id]
  );
  res.render('dashboard', { user: req.session.user, resources });
});

module.exports = router;
