var dataBase2;
const dbName2 = 'contact';
const dbVersion2 = '1.0';
const dbDesc2 = '联系我（提意见）表';
const dbTableName2 = 'suggestion';
//创建数据库
function createDB2(){
	dataBase2 = openDatabase(dbName2, dbVersion2, dbDesc2, 1024*1024, function () {});
	if (!dataBase2) {
		alert("不支持数据库操作!");
		return;
	}
}
//创建表
function createTable2(callback){
	dataBase2.transaction( function(tx) {
		var sqlStr = "create table if not exists "+dbTableName2+" (name TEXT unique, email TEXT, theme TEXT, content TEXT)";
		tx.executeSql(sqlStr, [], 
			function(tx, result){if(callback)callback(result);},
			function(tx, error){if(callback)callback(error.message);}
		);
	});
}

function insert2 (name, email, theme, content, callback) {
	dataBase2.transaction(function (tx) {
		tx.executeSql(
			"insert into "+dbTableName2+" (name, email, theme, content) values(?, ?, ?, ?)",
			[name, email, theme, content],
			function (tx, result) {if(callback)callback(result);},
			function (tx, error) {if(callback)callback(error.message);}
		);
	});
}

function query2 (name, callback) {
	dataBase2.transaction(function (tx) {
		if(!name){
			return;
		}
		var sqlStr = "select * from "+dbTableName2+" where name = '"+name+"'";
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

function update2 (name, email, theme, content, callback) {
	dataBase2.transaction(function (tx) {
		tx.executeSql(
		"update "+dbTableName2+" set email = ?, theme = ?, content = ? where name = ?",
		[email, theme, content, name],
		function (tx, result) {
			if(callback)callback(result);
		},
		function (tx, error) {
			if(callback)callback(error.message);
		});
	});
}
//删除数据
function del2 (name, callback) {
	dataBase2.transaction(function (tx) {
		tx.executeSql(
		"delete from "+dbTableName2+" where name = ?",
		[name],
		function (tx, result) {
			if(callback)callback(result);
		},
		function (tx, error) {
			if(callback)callback(error.message);
		});
	});
}

$(function(){
	createDB2();
	createTable2();
	query2('admin', function(res){
		if(res.rows.length <= 0){
			insert2('admin', 'zhouqunhui@qq.com', 'The ideal is good', 'good ideal, well , go on!');
		}
	});
});