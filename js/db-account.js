var dataBase;
const dbName = 'account';
const dbVersion = '1.0';
const dbDesc = '用户表';
const dbTableName = 'user';
//创建数据库
function createDB(){
	dataBase = openDatabase(dbName, dbVersion, dbDesc, 1024*1024, function () {});
	if (!dataBase) {
		alert("不支持登录操作!");
		return;
	}
}
//创建表
function createTable(callback){
	dataBase.transaction( function(tx) {
		var sqlStr = "create table if not exists "+dbTableName+" (name TEXT unique, password TEXT)";
		tx.executeSql(sqlStr, [], 
			function(tx, result){if(callback)callback(result);},
			function(tx, error){if(callback)callback(error.message);}
		);
	});
}

function insert (name, pwd, callback) {
	dataBase.transaction(function (tx) {
		tx.executeSql(
			"insert into "+dbTableName+" (name, password) values(?, ?)",
			[name, pwd],
			function (tx ,result) {if(callback)callback(result);},
			function (tx, error) {if(callback)callback(error.message);}
		);
	});
}

function query (name, password, callback) {
	dataBase.transaction(function (tx) {
		if(!name || !password){
			return;
		}
		var sqlStr = "select * from "+dbTableName+" where name = '"+name+"' and password = '"+password+"'";
		tx.executeSql(
		sqlStr, [],
		function (tx, result) {
			if(callback)callback(result);
		},
		function (tx, error) {
			if(callback)callback(error.message);
		});
	});
}
function queryByName (name, callback) {
	dataBase.transaction(function (tx) {
		if(!name){
			return;
		}
		var sqlStr = "select * from "+dbTableName+" where name = '"+name+"'";
		tx.executeSql(
		sqlStr, [],
		function (tx, result) {
			if(callback)callback(result);
		},
		function (tx, error) {
			if(callback)callback(error.message);
		});
	});
}

function update (name, password, callback) {
	dataBase.transaction(function (tx) {
		tx.executeSql(
		"update "+dbTableName+" set password = ? where name = ?",
		[password, name],
		function (tx, result) {
			if(callback)callback(result);
		},
		function (tx, error) {
			if(callback)callback(error.message);
		});
	});
}
//删除数据
function del (name, callback) {
	dataBase.transaction(function (tx) {
		tx.executeSql(
		"delete from "+dbTableName+" where name = ?",
		[name],
		function (tx, result) {
			if(callback)callback(result);
		},
		function (tx, error) {
			if(callback)callback(error.message);
		});
	});
}
function initDB() {
	createDB();
	createTable();
	queryByName('admin', function(res){
		if(res.rows.length <= 0){
			insert('admin', '14e1b600b1fd579f47433b88e8d85291e');
		}
	});
}
initDB();


