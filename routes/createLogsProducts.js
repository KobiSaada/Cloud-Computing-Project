const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const connection = require('../config/DB');
const { v4: uuidv4 } = require('uuid');



module.exports = async (req, res, log, query, msgToClient) => {
    // console.log(query);
    try {
        await connection.query(
            query,
            async (err, result, fields) => {
                if (err) {
                    // console.log('errors:', err);
                    return res.status(400).json({ errors: [{ msg: err }] });
                }
                else if (result.affectedRows > 0) {
                    // console.log({ msg: msgToClient.succeeded });
                    return res.send({ msg: msgToClient.succeeded });
                } else {
                    return res.status(400).json({ errors: [{ msg: msgToClient.failed }] });
                }
            });
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: msgToClient.failed }] });
    }
};




