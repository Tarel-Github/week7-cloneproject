const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.headers.authorization || req.cookies.Authorization;

    if (!cookie) {
      return res
        .status(400)
        .json({ ok: false, errorMessage: '로그인 후 이용 가능합니다.' });
    }

    const { userId } = jwt.verify(cookie, 'secret_dang'); // 궁금

    const user = await Users.findOne({
      attributes: { exclude: ['email', 'password'] },
      where: { userId },
    });

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ ok: false, errorMessage: '로그인 후 이용 가능합니다' });
  }
};
