const WishService = require('./wish.service');

class WishController {
    wishService = new WishService();


}

module.exports = WishController;