/**
 * Created by zhj on 17/8/16.
 */

const tarMongo = require('../config/index');
const Promise = require('es6-promise');
// Schema 结构
let tarSchema = new tarMongo.mongoose.Schema({
        username: {type: String},
        age: {type: String},
        sex: {type: String},
        userid: {type: String},
});

// 设置mongoose 静态方法，静态方法在Model层就能使用
tarSchema.statics.findById = function (userid, callback) {
    return this.find({ userid }, callback);
};

// model
const tarModel = tarMongo.db.model('tarModel', tarSchema);

function createPromise (modelMethod, option, target) {
    return new Promise((resolve, reject) => {
        tarModel[modelMethod](...target, (error, result) => {
            if(error) {
                reject({
                    type: false,
                    data: error
                });
            } else {
                resolve({
                    type: true,
                    data: option.msg ? option.msg: result
                });
            }
        });
    });
}

//增加
function addData(obj) {
    return createPromise('create', {
        msg: '添加成功'
    }, [obj])
}
//删除
function deleteData(condition) {
    return createPromise('remove', {
        msg: '删除成功'
    }, [condition])
}

//更新
function updateData(condition,obj) {
    let update = {$set : obj};
    let options    = {upsert : true};
    return createPromise('update', {
        msg: '更新成功'
    }, [condition, update, options])
}

//全部查询
function find () {
    return createPromise('find', {
        msg: ''
    }, [])
}

//基于userId的查询
function findByUserId (id) {
    return createPromise('findById', {
        msg: ''
    }, [id])
}

module.exports = {
    add: addData,
    delete: deleteData,
    update: updateData,
    query: find,
    queryByUserId: findByUserId,
    model: tarModel
};