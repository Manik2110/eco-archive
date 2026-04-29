const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

router.get('/login', (req, res) => res.render('auth/login', { user: null, error: null }));
router.get('/register', (req, res) => res.render('auth/register', { user: null, error: null }));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
    res.redirect('/auth/login');
  } catch {
    res.render('auth/register', { user: null, error: 'Email already in use.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.render('auth/login', { user: null, error: 'Invalid credentials.' });
  req.session.user = user;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
