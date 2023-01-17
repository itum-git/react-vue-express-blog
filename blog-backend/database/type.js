
const { typeDB } = require('./dbconfig/poolextend');

const typeTable = {
    InsertNewType: function (param) {
        const sql = 'INSERT INTO type(type_id, type_name, type_desc, update_time, create_time) VALUES(?,?,?,?,?)'
        const values = [param.type_id, param.type_name, param.type_desc, Date.now(), Date.now()]
        return typeDB(sql, values)
    },
    deleteTypeById: function (type_id) {
        const sql = 'DELETE FROM type WHERE type_id=?'
        return typeDB(sql, type_id)
    },
    updateTypeById: function (param) {
        const sql = 'UPDATE type SET type_name=?, type_desc=?, update_time=? WHERE type_id=?'
        const values = [param.type_name, param.type_desc, Date.now(), param.type_id]
        return typeDB(sql, values)
    },
    queryAllType: function () {
        const sql = 'SELECT * FROM type'
        return typeDB(sql)
    }
};

module.exports = typeTable;