const pool = require("./config");

exports.create = async (uid, pw, mname) => {
  try {
    const query = `INSERT INTO member(uid, pw, mname) 
                    VALUES(?, ?, ?)`;
    const params = [uid, pw, mname];

    const [result] = await pool.query(query, params);
    console.log(result);
    return result.insertId;
  } catch (error) {
    console.log("member create failed");
    return null;
  }
};

exports.readByMemno = async (memno) => {
  try {
    const query = `SELECT memno, uid, mname 
                    FROM member WHERE memno = ?`;
    const params = [memno];

    const [rows] = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    console.log("member read by memno failed");
    return null;
  }
};

exports.readByUid = async (uid) => {
  try {
    const query = `SELECT memno, uid, mname 
                      FROM member WHERE uid = ?`;
    const params = [uid];

    const [rows] = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    console.log("member read by uid failed");
    return null;
  }
};

exports.getPwByUid = async (uid) => {
  try {
    const query = `SELECT pw FROM member WHERE uid = ?`;
    const params = [uid];

    const [rows] = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    console.log("member get pw failed");
    return null;
  }
};
