import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile("users.txt", { root: "public" });
});

export default router;
