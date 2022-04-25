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


//@router           POST api/products
//@description      Register user
//@access           Public
router.post(
    '/',
    [
        check('userId', 'userId is required').not().isEmpty(),
        check('productText', 'productText is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, productText } = req.body;
        try {
            const product = {
                productId: uuidv4(),
                productText,
                userId,
            };
            const query = `INSERT INTO callcenter.products (productId, userId, productText) VALUES ('${product.productId}', '${product.userId}', '${product.productText}');`;
            await connection.query(
                query,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: err });
                    else {
                        return res.send({ msg: 'Product created', product });
                    }
                }
            );
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//@router           DELETE api/products
//@description      Delete user
//@access           Private
router.delete(
    '/',
    [check('productId', 'Please include a valid productId').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { productId } = req.body;
        try {
            const query = `DELETE FROM callcenter.products WHERE (productId = '${productId}');`;
            await connection.query(query,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: [{ msg: err }] });
                    else if (result.affectedRows > 0) {
                        return res.json({ msg: `Product(${productId}) deleted` });
                    } else {
                        return res.status(400).json({ errors: [{ msg: 'Product not found' }] });
                    }
                }
            );
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//@router           UPDATE api/products
//@description      Confirm user by admin with some permission
//@access           Private
router.put(
    '/',
    [
        check('productId', 'productId is required').not().isEmpty(),
        check('userId', 'userId is required').not().isEmpty(),
        check('productText', 'productText is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { productId, userId, productText } = req.body;
        try {
            const query = `UPDATE callcenter.products 
                    SET 
                      userId = '${userId}', 
                      productText = '${productText}' 
                    WHERE productId = '${productId}';`;
            await connection.query(
                query,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: [{ msg: err }] });
                    else if (result.affectedRows > 0) {
                        return res.send({ msg: `Product updated` });
                    } else {
                        return res.status(400).json({ errors: [{ msg: `Product not found` }] });
                    }
                });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//@router           GET api/products
//@description      get all products
//@access           Private
router.get('/:userId',
    async (req, res) => {
        try {
            const { userId } = req.params
            const query = `SELECT 
                                users.userId,users.firstName,users.lastName ,users.address, users.gender,
                                products.productText,products.productId
                            FROM products 
                            INNER JOIN users
                                ON users.userId = products.userId
                            WHERE products.userId = '${userId}';`;
            await connection.query(
                query,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: [{ msg: err }] });
                    else if (result.length > 0) {
                        return res.send(result);
                    } else {
                        return res.status(400).json({ errors: [{ msg: `Products by userId(${userId}) not found` }] });
                    }
                }
            );
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    });


//@router           GET api/products
//@description      get all products
//@access           Private
router.get('/getProductsByUser/:userId',
    async (req, res) => {
        try {
            const { userId } = req.params
            const query = `SELECT 
                            users.userId,users.firstName,users.lastName ,users.address, users.gender,
                            products.productText,products.productId
                        FROM products 
                        INNER JOIN users
                            ON users.userId = products.userId
                        WHERE products.userId = '${userId}';`;
            await connection.query(
                query,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: [{ msg: err }] });
                    else if (result.length > 0) {
                        return res.send(result);
                    } else {
                        return res.send([]);
                        // return res.status(400).json({ errors: [{ msg: `Products by userId(${userId}) not found` }] });
                    }
                }
            );
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    });


//@router           GET api/products
//@description      get all products
//@access           Private
router.get('/',
    async (req, res) => {
        try {
            const query = `SELECT 
                                users.userId,users.firstName,users.lastName ,users.address, users.gender,
                                products.productText,products.productId
                            FROM products 
                            INNER JOIN users
                                ON users.userId = products.userId`;

            await connection.query(
                query,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: [{ msg: err }] });
                    else res.send(result);
                }
            );
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;
