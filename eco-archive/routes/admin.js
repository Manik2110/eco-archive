const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

router.use(requireAdmin);

router.get('/', async (req, res) => {
  const [users] = await db.query('SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC');
  const [resources] = await db.query('SELECT r.*, u.name AS uploader FROM resources r JOIN users u ON r.uploaded_by = u.id ORDER BY r.created_at DESC');
  res.render('admin', { user: req.session.user, users, resources });
});

router.post('/delete-user/:id', async (req, res) => {
  await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.redirect('/admin');
});

router.post('/toggle-admin/:id', async (req, res) => {
  await db.query('UPDATE users SET is_admin = NOT is_admin WHERE id = ?', [req.params.id]);
  res.redirect('/admin');
});

module.exports = router;
