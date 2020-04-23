const express = require('express');

const route = express.Router();

const userModel = require('../models/user.model');
const tokenModel = require('../models/token.model');


route.get('/', async function(req,res)
{  
    let list = await userModel.load();
    let tokens = await tokenModel.load();

    let users = list.map(function (item, index) {

        let year = item.f_DOB.getFullYear();
        let day =  item.f_DOB.getDate() < 10 ? '0' + item.f_DOB.getDate(): item.f_DOB.getDate();
        let month = item.f_DOB.getMonth() < 10 ? '0' + item.f_DOB.getMonth(): item.f_DOB.getMonth();

        let stringTime = `${day}/${month}/${year}`;

        let token;

        tokens.forEach((tokenItem) =>
        {
            if(tokenItem.ID === item.f_ID)
            {
                 token =  tokenItem.refreshToken;
            }
        })

        return {
            f_ID: item.f_ID,
            f_Username: item.f_Username,
            f_Password: item.f_Password,
            f_Name: item.f_Name,
            f_Email: item.f_Email,
            f_DOB: stringTime,
            f_Permission: item.f_Permission,
            token: token
        } ;
    });


    res.render('user/list',{
        users,
        length: list.length === 0,
    })
})

module.exports = route;