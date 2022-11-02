const { Users } = require('../models');
const { Op } = require('sequelize');

class UserRepository {

    userFind = async(userId)=>{
        return await Users.findByPk(userId)
    }

    signup = async ( user )=>{
        return await Users.create(user)
    }

    userFindEmail = async (email)=>{
        return await Users.findOne({where: {email}});
    }

    userFindNickname = async (nickname)=>{
        return await Users.findOne({where: {nickname}});
    }
}

module.exports = UserRepository ;