require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    if (req.headers.Authorization || req.cookies.Authorization) {
      return res.status(400).json({
        ok: false,
        errorMessage: '이미 로그인이 되어있습니다.',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      errorMessage: '잘못된 접근입니다.',
    });
  }
};
