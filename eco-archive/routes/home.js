const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  const [[{ totalResources }]] = await db.query('SELECT COUNT(*) AS totalResources FROM resources');
  const [[{ totalUsers }]] = await db.query('SELECT COUNT(*) AS totalUsers FROM users');
  const [subjects] = await db.query('SELECT DISTINCT subject FROM resources');
  const [recent] = await db.query('SELECT * FROM resources ORDER BY created_at DESC LIMIT 6');

  res.render('home', {
    user: req.session.user,
    stats: { totalResources, totalUsers, totalSubjects: subjects.length },
    recent,
    subjects,
  });
});

module.exports = router;
