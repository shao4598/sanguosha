const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const { v1: uuidv1 } = require('uuid')
const dayjs = require('dayjs')

app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, '/views')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let databaseSource = './db/sanguosha.db'

app.get('/records/games/:id', (req, res) => {
	getRecordsGames(req.params.id, req.query)
		.then((data) => {
			res.send({
				status: '0',
				data,
			})
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})
app.get('/records/income/:id', (req, res) => {
	getIncome(req.params.id, req.query)
		.then((data) => {
			res.send({
				status: '0',
				data,
			})
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})
app.delete('/records/games/:id', (req, res) => {
	deleteRecordsGames(req.params.id, req.query.guid)
		.then(() => {
			return Promise.all([
				getNowGolds(req.params.id),
				getNowBeans(req.params.id),
			])
		})
		.then((dataList) => {
			const oldGolds = dataList[0]
			const oldBeans = dataList[1]
			const newGolds = parseInt(oldGolds) - parseInt(req.query.golds)
			const newBeans = parseInt(oldBeans) - parseInt(req.query.beans)
			// console.log(oldGolds, oldBeans, newGolds, newBeans)
			return updateAssets(req.params.id, {
				golds: newGolds.toString(),
				beans: newBeans.toString(),
			})
		})
		.then(() => {
			// console.log('success')
			res.send({ status: '0' })
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.post('/records/games/:id', (req, res) => {
	createRecordsGames(req.params.id, req.body)
		.then(() => {
			return Promise.all([
				getNowGolds(req.params.id),
				getNowBeans(req.params.id),
			])
		})
		.then((dataList) => {
			const oldGolds = dataList[0]
			const oldBeans = dataList[1]
			const newGolds = parseInt(oldGolds) + parseInt(req.body.golds)
			const newBeans = parseInt(oldBeans) + parseInt(req.body.beans)
			// console.log(oldGolds, oldBeans, newGolds, newBeans)
			return updateAssets(req.params.id, {
				golds: newGolds.toString(),
				beans: newBeans.toString(),
			})
		})
		.then(() => {
			// console.log('success')
			res.send({ status: '0' })
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.get('/assets/golds/:id', (req, res) => {
	getNowGolds(req.params.id)
		.then((data) => {
			res.send({
				status: '0',
				data,
			})
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.get('/assets/beans/:id', (req, res) => {
	getNowBeans(req.params.id)
		.then((data) => {
			res.send({
				status: '0',
				data,
			})
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.get('/records/golds/:id', (req, res) => {
	getRecordsGolds(req.params.id)
		.then((data) => {
			res.send({
				status: '0',
				data,
			})
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.post('/records/golds/:id', (req, res) => {
	const params = {
		$guid: uuidv1(),
		$player_id: req.params.id,
		$count: req.body.count,
		$mode: req.body.mode,
		$timestamp: dayjs().unix(),
	}
	createRecordsGolds(params)
		.then(() => {
			return getNowGolds(req.params.id)
		})
		.then((data) => {
			const newGolds = parseInt(data) - parseInt(req.body.count)
			return updateAssets(req.params.id, {
				golds: newGolds.toString(),
			})
		})
		.then(() => {
			// console.log('success')
			res.send({ status: '0' })
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.delete('/records/golds/:id', (req, res) => {
	deleteRecordsGolds(req.params.id, req.query.guid)
		.then(() => {
			return getNowGolds(req.params.id)
		})
		.then((oldGolds) => {
			const newGolds = parseInt(oldGolds) + parseInt(req.query.golds)
			return updateAssets(req.params.id, {
				golds: newGolds.toString(),
			})
		})
		.then(() => {
			// console.log('success')
			res.send({ status: '0' })
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.get('/records/beans/:id', (req, res) => {
	getRecordsBeans(req.params.id)
		.then((data) => {
			res.send({
				status: '0',
				data,
			})
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.post('/records/beans/:id', (req, res) => {
	const params = {
		$guid: uuidv1(),
		$player_id: req.params.id,
		$count: req.body.count,
		$mode: req.body.mode,
		$timestamp: dayjs().unix(),
	}
	createRecordsBeans(params)
		.then(() => {
			return getNowBeans(req.params.id)
		})
		.then((data) => {
			const newBeans = parseInt(data) + parseInt(req.body.count)
			return updateAssets(req.params.id, {
				beans: newBeans.toString(),
			})
		})
		.then(() => {
			// console.log('success')
			res.send({ status: '0' })
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.delete('/records/beans/:id', (req, res) => {
	deleteRecordsBeans(req.params.id, req.query.guid)
		.then(() => {
			return getNowBeans(req.params.id)
		})
		.then((oldBeans) => {
			const newBeans = parseInt(oldBeans) - parseInt(req.query.beans)
			return updateAssets(req.params.id, {
				beans: newBeans.toString(),
			})
		})
		.then(() => {
			// console.log('success')
			res.send({ status: '0' })
		})
		.catch((err) => {
			console.log('err', err)
			res.send({ status: '-1' })
		})
})

app.listen(app.get('port'), function () {
	console.log(
		'Express started on http://localhost:' +
			app.get('port') +
			'; press Ctrl-C to terminate.',
	)
})

function getNowGolds(playerId) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.get(
			'SELECT now_golds FROM assets WHERE player_id = ?',
			playerId,
			(err, row) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve(row.now_golds)
				}
			},
		)
	})
}

function getNowBeans(playerId) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.get(
			'SELECT now_beans FROM assets WHERE player_id = ?',
			playerId,
			(err, row) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve(row.now_beans)
				}
			},
		)
	})
}

function updateAssets(playerId, params) {
	let sql = 'UPDATE assets SET'
	if (params.golds) {
		sql += " now_golds = '" + params.golds + "',"
	}
	if (params.beans) {
		sql += " now_beans = '" + params.beans + "',"
	}
	sql = sql.slice(0, -1)
	sql += ' WHERE player_id = ?'
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(sql, playerId, (err) => {
			if (err) {
				reject(new Error(err))
			} else {
				resolve()
			}
		})
	})
}

function getRecordsGames(playerId, params) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		const start = params.start
		const end = params.end
		db.all(
			'SELECT * FROM records_games WHERE player_id = ? AND timestamp > ? AND timestamp < ? ORDER BY timestamp desc',
			playerId,
			start,
			end,
			(err, rows) => {
				if (err) {
					reject(new Error(err))
				} else {
					// console.log('rows', rows)
					resolve(rows)
				}
			},
		)
	})
}

function createRecordsGames(playerId, params) {
	const values = {
		$guid: uuidv1(),
		$player_id: playerId,
		$room: params.room,
		$landlord: params.landlord,
		$farmer1: params.farmer1,
		$farmer2: params.farmer2,
		$is_win: params.isWin,
		$role: params.role,
		$multiple: params.multiple,
		$golds: params.golds,
		$beans: params.beans,
		$is_flee: params.isFlee,
		$remarks: params.remarks,
		$timestamp: dayjs().unix(),
	}
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(
			'INSERT INTO records_games VALUES ($guid, $player_id, $room, $landlord, $farmer1, $farmer2, $is_win, $role, $multiple, $golds, $beans, $is_flee, $remarks, $timestamp)',
			values,
			(err) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve()
				}
			},
		)
	})
}

function deleteRecordsGames(playerId, guid) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(
			'DELETE FROM records_games WHERE guid = ? AND player_id = ?',
			guid,
			playerId,
			(err) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve({ status: '0' })
				}
			},
		)
	})
}

function getRecordsGolds(playerId) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		const start = dayjs()
			.subtract(6, 'day')
			.hour(0)
			.minute(0)
			.second(0)
			.unix()
		const end = dayjs().hour(23).minute(59).second(59).unix()
		db.all(
			'SELECT * FROM records_golds WHERE player_id = ? AND timestamp >= ? AND timestamp<= ? ORDER BY timestamp desc',
			playerId,
			start,
			end,
			(err, rows) => {
				if (err) {
					reject(new Error(err))
				} else {
					// console.log('rows', rows)
					resolve(rows)
				}
			},
		)
	})
}

function createRecordsGolds(params) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(
			'INSERT INTO records_golds VALUES ($guid, $player_id, $count, $mode, $timestamp)',
			params,
			(err) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve()
				}
			},
		)
	})
}

function deleteRecordsGolds(playerId, guid) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(
			'DELETE FROM records_golds WHERE guid = ? AND player_id = ?',
			guid,
			playerId,
			(err) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve({ status: '0' })
				}
			},
		)
	})
}

function getRecordsBeans(playerId) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		const start = dayjs()
			.subtract(6, 'day')
			.hour(0)
			.minute(0)
			.second(0)
			.unix()
		const end = dayjs().hour(23).minute(59).second(59).unix()
		db.all(
			'SELECT * FROM records_beans WHERE player_id = ? AND timestamp >= ? AND timestamp<= ? ORDER BY timestamp desc',
			playerId,
			start,
			end,
			(err, rows) => {
				if (err) {
					reject(new Error(err))
				} else {
					// console.log('rows', rows)
					resolve(rows)
				}
			},
		)
	})
}

function createRecordsBeans(params) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(
			'INSERT INTO records_beans VALUES ($guid, $player_id, $count, $mode, $timestamp)',
			params,
			(err) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve()
				}
			},
		)
	})
}

function deleteRecordsBeans(playerId, guid) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		db.run(
			'DELETE FROM records_beans WHERE guid = ? AND player_id = ?',
			guid,
			playerId,
			(err) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve({ status: '0' })
				}
			},
		)
	})
}

function getIncome(playerId, params) {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(databaseSource)
		const start = params.start
		const end = params.end
		db.get(
			'SELECT SUM(beans) AS beans, SUM(golds) AS golds FROM records_games WHERE player_id = ? AND timestamp >= ? AND timestamp<= ?',
			playerId,
			start,
			end,
			(err, row) => {
				if (err) {
					reject(new Error(err))
				} else {
					resolve(row)
				}
			},
		)
	})
}
