const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../../config/DB');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const config = require('../../config/default.json');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const router = express.Router();


//@router           POST api/users
//@description      Register user
//@access           Public
router.post(
  '/',
  [
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('gender', 'gender is required').not().isEmpty(),
    check('id', 'id is required').not().isEmpty(),
    check('birthday', 'birthday is required').not().isEmpty(),
    check('age', 'age is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, address, gender, id, birthday, age } = req.body;
    try {
      const user = {
        userId: uuidv4(),
        firstName,
        lastName,
        address,
        gender,
        id,
        birthday,
        age,
      };


      const query = `INSERT INTO callcenter.users (id, userId, firstName, lastName, address, gender, birthday, age) VALUES ( '${user.id}','${user.userId}', '${user.firstName}', '${user.lastName} ', '${user.address} ', '${user.gender}' , '${user.birthday}' , ${user.age});`;
      await connection.query(
        query,
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: err });
          else {
            return res.send({ msg: 'User created', user });
          }
        }
      );
    } catch (err) {
      // console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@router           DELETE api/users
//@description      Delete user
//@access           Private
router.delete(
  '/',
  [check('userId', 'Please include a valid userId').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.body;
    try {
      //delete all products by userId
      let query = `DELETE FROM callcenter.products WHERE userId = '${userId}';`;
      await connection.query(query,
        async (err, resultProducts, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else {
            query = `DELETE FROM callcenter.users WHERE (userId = '${userId}');`;
            await connection.query(query,
              async (err, resultUsers, fields) => {
                if (err) return res.status(400).json({ errors: [{ msg: err }] });
                else if (resultUsers.affectedRows > 0) {
                  if (resultProducts.affectedRows > 0) {
                    return res.json({ msg: `User(${userId}) and all Products by user deleted` });
                  } else {
                    return res.json({ msg: `User(${userId}) deleted` });
                  }
                } else {
                  if (resultProducts.affectedRows > 0) {
                    return res.status(400).json({ errors: [{ msg: 'User and products not found' }] });
                  } else {
                    return res.status(400).json({ errors: [{ msg: 'User not found' }] });
                  }
                }
              });
          }
        });
    } catch (err) {
      //console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@router           UPDATE api/users
//@description      Confirm user by admin with some permission
//@access           Private
router.put(
  '/',
  [
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('gender', 'gender is required').not().isEmpty(),
    check('id', 'id is required').not().isEmpty(),
    check('userId', 'userId is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { id,userId, firstName, lastName, address, gender } = req.body;
    try {
      const query = `UPDATE callcenter.users 
                    SET 
                      firstName = '${firstName}', 
                      lastName = '${lastName}', 
                      address = '${address}', 
                      gender = '${gender}'
                    WHERE userId = '${userId}';`;
      await connection.query(
        query,
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            return res.send({ msg: `User updated` });
          } else {
            return res.status(400).json({ errors: [{ msg: `User not found` }] });
          }
        });
    } catch (err) {
      //console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@router           GET api/users
//@description      get all users
//@access           Private
router.get('/:userId',
  async (req, res) => {
    try {
      const { userId } = req.params
      const query = `SELECT * FROM users WHERE userId = '${userId}';`;
      await connection.query(
        query,
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.length > 0) {
            return res.send(result);
          } else {
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
          }
        }
      );
    } catch (err) {
      //console.error(err.message);
      res.status(500).send('Server error');
    }
  });


//@router           GET api/users
//@description      get all users
//@access           Private
router.get('/',
  async (req, res) => {
    try {
      const { userId } = req.params
      const query = `SELECT * FROM users;`;
      await connection.query(
        query,
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.length > 0) {
            return res.send(result);
          }
        }
      );
    } catch (err) {
      //console.error(err.message);
      res.status(500).send('Server error');
    }
  });


module.exports = router;
