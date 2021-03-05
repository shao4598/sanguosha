<template>
	<el-container>
		<el-header>
			<el-col :span="5">
				<el-button type="danger" plain>
					{{ token }}
				</el-button>
			</el-col>
			<el-col :span="5">
				<el-button
					type="primary"
					icon="el-icon-document-add"
					@click="dialogFormGamesVisible = true"
				>
					添加战绩
				</el-button>
				<el-dialog
					center
					title="添加战绩"
					:visible.sync="dialogFormGamesVisible"
					@close="onCloseDialogRecordsGames"
				>
					<el-form label-width="120px" :model="formRecordsGames">
						<el-form-item label="结果">
							<el-radio-group
								v-model="formRecordsGames.isWin"
								@change="onChangeIsWin"
							>
								<el-radio-button label="1" border>
									胜
								</el-radio-button>
								<el-radio-button label="0" border>
									负
								</el-radio-button>
							</el-radio-group>
							<el-checkbox
								border
								true-label="1"
								false-label="0"
								v-model="formRecordsGames.isFlee"
								v-show="ckbIsFleeVisible"
							>
								逃跑
							</el-checkbox>
						</el-form-item>
						<el-form-item label="房间">
							<el-radio-group v-model="formRecordsGames.room">
								<el-radio-button border label="0">
									普通场
								</el-radio-button>
								<el-radio-button border label="1">
									至尊场
								</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="倍数">
							<el-radio-group v-model="formRecordsGames.multiple">
								<el-radio-button border label="3">
									3倍
								</el-radio-button>

								<el-radio-button border label="2">
									2倍
								</el-radio-button>
								<el-radio-button border label="1">
									1倍
								</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="地主">
							<el-col :span="12">
								<el-autocomplete
									class="inline-input"
									style="display: block"
									placeholder="请输入武将名"
									v-model="formRecordsGames.landlord"
									:fetch-suggestions="querySearch"
									:trigger-on-focus="false"
								></el-autocomplete>
							</el-col>
							<el-col :span="12">
								<el-radio
									border
									label="0"
									v-model="formRecordsGames.role"
								>
									本人
								</el-radio>
							</el-col>
						</el-form-item>
						<el-form-item label="农民1">
							<el-col :span="12">
								<el-autocomplete
									class="inline-input"
									style="display: block"
									placeholder="请输入武将名"
									v-model="formRecordsGames.farmer1"
									:fetch-suggestions="querySearch"
									:trigger-on-focus="false"
								></el-autocomplete>
							</el-col>
							<el-col :span="12">
								<el-radio
									border
									label="1"
									v-model="formRecordsGames.role"
								>
									本人
								</el-radio>
							</el-col>
						</el-form-item>
						<el-form-item label="农民2">
							<el-col :span="12">
								<el-autocomplete
									class="inline-input"
									style="display: block"
									placeholder="请输入武将名"
									v-model="formRecordsGames.farmer2"
									:fetch-suggestions="querySearch"
									:trigger-on-focus="false"
								></el-autocomplete>
							</el-col>
							<el-col :span="12">
								<el-radio
									border
									label="2"
									v-model="formRecordsGames.role"
								>
									本人
								</el-radio>
							</el-col>
						</el-form-item>
						<el-form-item label="备注">
							<el-input
								type="textarea"
								placeholder="请输入心得"
								:rows="2"
								v-model="formRecordsGames.remarks"
							></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button
							type="primary"
							@click="onSubmitRecordsGames()"
						>
							确 定
						</el-button>
						<el-button @click="dialogFormGamesVisible = false">
							取 消
						</el-button>
					</div>
				</el-dialog>
			</el-col>
		</el-header>
		<el-main>
			<el-col :span="5">
				<el-form
					label-width="50px"
					:model="formSearch"
					style="width: 90%"
				>
					<el-form-item label-width="0px">
						<date-picker
							v-model="datePicker.range"
							:model-config="datePicker.config"
							is-range
							is-expanded
						></date-picker>
					</el-form-item>
					<el-form-item label="武将">
						<el-autocomplete
							class="inline-input"
							style="display: block"
							placeholder="请输入武将名"
							v-model="formSearch.hero"
							:fetch-suggestions="querySearch"
							:trigger-on-focus="false"
						></el-autocomplete>
					</el-form-item>
					<el-form-item label="身份">
						<el-radio-group v-model="formSearch.role" size="small">
							<el-radio-button
								label="all"
								:disabled="formSearch.player === '1'"
							>
								全部
							</el-radio-button>
							<el-radio-button label="0">地主</el-radio-button>
							<el-radio-button label="1">农民1</el-radio-button>
							<el-radio-button label="2">农民2</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="玩家">
						<el-radio-group
							v-model="formSearch.player"
							size="small"
						>
							<el-radio-button label="0">本人</el-radio-button>
							<el-radio-button label="1">对手</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="结果">
						<el-radio-group v-model="formSearch.isWin" size="small">
							<el-radio-button label="all">全部</el-radio-button>
							<el-radio-button label="1">胜</el-radio-button>
							<el-radio-button label="0">负</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label-width="0px">
						<el-button
							type="primary"
							icon="el-icon-search"
							style="width: 100%"
							@click="search"
						>
							搜索
						</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="14">
				<el-table :data="recordsGames" stripe tooltip-effect="dark">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form
								label-position="left"
								inline
								class="table-expand"
							>
								<el-form-item label="倍数">
									<span>{{ props.row.multiple }} 倍</span>
								</el-form-item>
								<el-form-item label="金票">
									<span>{{ props.row.golds }}</span>
								</el-form-item>
								<el-form-item label="欢乐豆">
									<span>{{ props.row.beans }}</span>
								</el-form-item>
								<el-form-item label="房间">
									<span>{{ props.row.roomLabel }}</span>
								</el-form-item>
								<el-form-item label="备注">
									<span>{{ props.row.remarks }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column
						prop="date"
						label="日期"
						width="120"
						sortable
					></el-table-column>
					<el-table-column
						prop="isWin"
						label="结果"
						width="120"
						sortable
					>
						<template slot-scope="scope">
							<el-tag
								:type="scope.row.color"
								size="mini"
								effect="dark"
							>
								{{ scope.row.isWinLabel }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column
						label="身份"
						width="120"
						:filters="[
							{ text: '地主', value: '0' },
							{ text: '农民1', value: '1' },
							{ text: '农民2', value: '2' },
						]"
						:filter-method="(value, row) => row.role === value"
						filter-placement="bottom-end"
					>
						<template slot-scope="scope">
							{{ scope.row.roleLabel }}
						</template>
					</el-table-column>
					<el-table-column label="地主" width="120">
						<template slot-scope="scope">
							<span :style="isBoldName(scope.row.role, '0')">
								{{ scope.row.landlord }}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="农民1" width="120">
						<template slot-scope="scope">
							<span :style="isBoldName(scope.row.role, '1')">
								{{ scope.row.farmer1 }}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="农民2" width="120">
						<template slot-scope="scope">
							<span :style="isBoldName(scope.row.role, '2')">
								{{ scope.row.farmer2 }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="remarks"
						label="备注"
						show-overflow-tooltip
					></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="
									onDeleteRecordsGames(
										scope.$index,
										scope.row,
									)
								"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="5">
				<el-row style="margin-bottom: 20px">
					<span>获得金票：{{ todayGolds }}</span>
				</el-row>
				<el-row style="margin-bottom: 20px">
					<span>消耗欢乐豆：{{ todayBeans }}</span>
				</el-row>
				<el-row style="margin-bottom: 20px">
					<el-col :span="10">
						<span>当前金票：{{ nowGolds }}</span>
					</el-col>
					<el-col :span="14">
						<el-button-group>
							<el-button
								type="success"
								icon="el-icon-coin"
								@click="dialogFormGoldsVisible = true"
							>
								消费金票
							</el-button>
							<el-button
								type="success"
								class="el-icon-tickets"
								@click="dialogRecordsGoldsVisible = true"
							></el-button>
						</el-button-group>
						<el-dialog
							center
							title="消费金票"
							:visible.sync="dialogFormGoldsVisible"
							:close-on-click-modal="false"
						>
							<el-form
								label-width="120px"
								:model="formRecordsGolds"
							>
								<el-form-item label="金票数量">
									<el-input
										autocomplete="off"
										v-model="formRecordsGolds.count"
									></el-input>
								</el-form-item>
								<el-form-item label="来源">
									<el-radio-group
										fill="#67C23A"
										v-model="formRecordsGolds.mode"
										@change="onChangeGoldsMode"
									>
										<el-radio-button
											v-for="item in goldsModeCollection"
											:key="item.no"
											:label="item.no"
										>
											{{ item.label }}
										</el-radio-button>
									</el-radio-group>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button
									type="success"
									@click="onSubmitRecordsGolds()"
								>
									确 定
								</el-button>
								<el-button
									@click="dialogFormGoldsVisible = false"
								>
									取 消
								</el-button>
							</div>
						</el-dialog>
						<el-dialog
							center
							title="消费金票记录"
							:visible.sync="dialogRecordsGoldsVisible"
							:close-on-click-modal="false"
							@open="getRecordsGolds"
						>
							<el-table :data="recordsGolds" height="500">
								<el-table-column
									property="date"
									label="日期"
									width="200"
								></el-table-column>
								<el-table-column
									property="count"
									label="数量"
									width="200"
								></el-table-column>
								<el-table-column
									property="mode"
									label="方式"
									width="200"
								></el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<el-button
											size="mini"
											@click="
												onDeleteRecordsGolds(
													scope.$index,
													scope.row,
												)
											"
										>
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-dialog>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 20px">
					<el-col :span="10">
						<span>当前欢乐豆：{{ nowBeans }}</span>
					</el-col>
					<el-col :span="14">
						<el-button-group>
							<el-button
								type="warning"
								icon="el-icon-circle-plus-outline"
								@click="dialogFormBeansVisible = true"
							>
								获取欢乐豆
							</el-button>
							<el-button
								type="warning"
								class="el-icon-tickets"
								@click="dialogRecordsBeansVisible = true"
							></el-button>
						</el-button-group>
						<el-dialog
							title="获取欢乐豆"
							:visible.sync="dialogFormBeansVisible"
							:close-on-click-modal="false"
							center
						>
							<el-form
								label-width="120px"
								:model="formRecordsBeans"
							>
								<el-form-item label="欢乐豆数量">
									<el-input
										v-model="formRecordsBeans.count"
										autocomplete="off"
									></el-input>
								</el-form-item>
								<el-form-item label="来源">
									<el-radio-group
										fill="#E6A23C"
										v-model="formRecordsBeans.mode"
										@change="onChangeBeansMode"
									>
										<el-radio-button
											v-for="item in beansModeCollection"
											:key="item.no"
											:label="item.no"
										>
											{{ item.label }}
										</el-radio-button>
									</el-radio-group>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button
									type="warning"
									@click="onSubmitRecordsBeans()"
								>
									确 定
								</el-button>
								<el-button
									@click="dialogFormBeansVisible = false"
								>
									取 消
								</el-button>
							</div>
						</el-dialog>
						<el-dialog
							title="获取欢乐豆记录"
							:visible.sync="dialogRecordsBeansVisible"
							:close-on-click-modal="false"
							center
							@open="getRecordsBeans"
						>
							<el-table :data="recordsBeans" height="500">
								<el-table-column
									property="date"
									label="日期"
									width="200"
								></el-table-column>
								<el-table-column
									property="count"
									label="数量"
									width="200"
								></el-table-column>
								<el-table-column
									property="mode"
									label="方式"
									width="200"
								></el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<el-button
											size="mini"
											@click="
												onDeleteRecordsBeans(
													scope.$index,
													scope.row,
												)
											"
										>
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-dialog>
					</el-col>
				</el-row>
			</el-col>
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import RecordsMaps from '@/mixins/RecordsMaps.js'
import HeroList from '@/mixins/HeroList.js'
export default {
	mixins: [RecordsMaps, HeroList],
	created() {
		this.token = this.$route.params.id
		if (this.token !== 's21294' && this.token !== 'w15579') {
			return
		}
		this.getRecordsGames()
		this.getNowGolds()
		this.getNowBeans()
		this.getIncome()
	},
	data() {
		return {
			token: '',
			ckbIsFleeVisible: false,
			dialogRecordsGoldsVisible: false,
			dialogRecordsBeansVisible: false,
			dialogFormGamesVisible: false,
			dialogFormGoldsVisible: false,
			dialogFormBeansVisible: false,
			nowGolds: '',
			nowBeans: '',
			todayBeans: '',
			todayGolds: '',
			formRecordsGames: {
				room: '0',
				landlord: '',
				farmer1: '',
				farmer2: '',
				isWin: '1',
				role: '0',
				multiple: '3',
				golds: '0',
				beans: '0',
				remarks: '',
				isFlee: '0',
			},
			formRecordsGolds: {
				count: '99999',
				mode: '0',
			},
			formRecordsBeans: {
				count: '165',
				mode: '0',
			},
			formSearch: {
				hero: '',
				role: 'all',
				player: '0',
				isWin: 'all',
			},
			datePicker: {
				config: {
					start: {
						timeAdjust: '00:00:00',
					},
					end: {
						timeAdjust: '23:59:59',
					},
				},
				range: {
					start: dayjs().hour(0).minute(0).second(0).toDate(),
					end: dayjs().hour(23).minute(59).second(59).toDate(),
				},
			},
			recordsGames: [],
			recordsGolds: [],
			recordsBeans: [],
		}
	},
	computed: {
		datePickerRangeUnix() {
			return {
				start: dayjs(this.datePicker.range.start).unix(),
				end: dayjs(this.datePicker.range.end).unix(),
			}
		},
	},
	methods: {
		search() {
			this.getRecordsGames()
			this.getIncome()
		},
		querySearch(queryString, callback) {
			const results = queryString
				? this.heroList.filter(this.createFilter(queryString))
				: this.heroList
			// 调用 callback 返回建议列表的数据
			callback(results)
		},
		createFilter(queryString) {
			return (item) => {
				return (
					item.words.includes(queryString) ||
					item.value.includes(queryString) ||
					item.nickName.includes(queryString)
				)
			}
		},
		isBoldName(rowRole, thisRole) {
			return { fontWeight: rowRole === thisRole ? 'bold' : 'normal' }
		},
		onDeleteRecordsGames(index, row) {
			this.$confirm('是否确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					axios
						.delete('/records/games/' + this.token, {
							params: {
								guid: row.guid,
								golds: row.golds,
								beans: row.beans,
							},
						})
						.then(({ data: { status } }) => {
							if (status !== '0') {
								return
							}
							this.getRecordsGames()
							this.getNowGolds()
							this.getNowBeans()
							this.getIncome()
						})
				})
				.catch(() => {})
		},
		onDeleteRecordsGolds(index, row) {
			this.$confirm('是否确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					axios
						.delete('/records/golds/' + this.token, {
							params: {
								guid: row.guid,
								golds: row.count,
							},
						})
						.then(({ data: { status } }) => {
							if (status !== '0') {
								return
							}
							this.getNowGolds()
							this.getRecordsGolds()
						})
				})
				.catch(() => {})
		},
		onDeleteRecordsBeans(index, row) {
			this.$confirm('是否确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					axios
						.delete('/records/beans/' + this.token, {
							params: {
								guid: row.guid,
								beans: row.count,
							},
						})
						.then(({ data: { status } }) => {
							if (status !== '0') {
								return
							}
							this.$message({
								type: 'success',
								message: '删除成功!',
							})
							this.getNowBeans()
							this.getRecordsBeans()
						})
				})
				.catch(() => {})
		},
		onCloseDialogRecordsGames() {
			this.ckbIsFleeVisible = false
			const form = this.formRecordsGames
			form.room = '0'
			form.landlord = ''
			form.farmer1 = ''
			form.farmer2 = ''
			form.isWin = '1'
			form.role = '0'
			form.multiple = '3'
			form.golds = ''
			form.beans = ''
			form.remarks = ''
			form.isFlee = '0'
		},
		onChangeIsWin(val) {
			const res = val === '0'
			this.ckbIsFleeVisible = res
			if (!res) {
				this.formRecordsGames.isFlee = '0'
			}
		},
		onChangeBeansMode(val) {
			this.formRecordsBeans.count = this.beansModeMap[parseInt(val)].count
		},
		onChangeGoldsMode(val) {
			this.formRecordsGolds.count = this.goldsModeMap[parseInt(val)].count
		},
		onSubmitRecordsGames() {
			let golds = 0
			let beans = 0
			const form = this.formRecordsGames
			const base = form.room === '0' ? 100 : 300
			const tickets = form.room === '0' ? 10 : 40
			if (form.isWin === '1') {
				golds += base * parseInt(form.multiple)
				beans -= tickets
				// 地主翻倍
				if (form.role === '0') {
					golds *= 2
					beans *= 2
				}
			} else {
				beans -= base * parseInt(form.multiple)
				// 地主翻倍
				if (form.role === '0') {
					beans *= 2
				}
				// 逃跑多扣5个豆
				if (form.isFlee === '1') {
					beans -= 5
				}
			}
			form.golds = golds.toString()
			form.beans = beans.toString()
			axios
				.post('/records/games/' + this.token, form)
				.then(({ data: { status } }) => {
					if (status !== '0') {
						return
					}
					this.getRecordsGames()
					this.getNowGolds()
					this.getNowBeans()
					this.getIncome()
					this.dialogFormGamesVisible = false
				})
		},
		onSubmitRecordsGolds() {
			axios
				.post('/records/golds/' + this.token, this.formRecordsGolds)
				.then(({ data: { status } }) => {
					if (status !== '0') {
						return
					}
					this.getNowGolds()
					this.dialogFormGoldsVisible = false
				})
		},
		onSubmitRecordsBeans() {
			axios
				.post('/records/beans/' + this.token, this.formRecordsBeans)
				.then(({ data: { status } }) => {
					if (status !== '0') {
						return
					}
					this.getNowBeans()
					this.dialogFormBeansVisible = false
				})
		},
		getRecordsGames() {
			const form = this.formSearch
			if (form.player === '1' && form.role === 'all') {
				this.$message({
					message: '请选择身份',
					type: 'warning',
				})
				return
			}
			this.recordsGames = []
			axios
				.get('/records/games/' + this.token, {
					params: this.datePickerRangeUnix,
				})
				.then(({ data: { status, data } }) => {
					if (status !== '0') {
						return
					}
					data.forEach((item) => {
						if (
							form.isWin !== 'all' &&
							form.isWin !== item.is_win
						) {
							return
						}

						if (form.player === '0') {
							if (form.role !== 'all') {
								if (form.role !== item.role) {
									return
								}
							}
							if (form.hero !== '') {
								if (item.role === '0') {
									if (item.landlord !== form.hero) {
										return
									}
								}
								if (item.role === '1') {
									if (item.farmer1 !== form.hero) {
										return
									}
								}
								if (item.role === '2') {
									if (item.farmer2 !== form.hero) {
										return
									}
								}
							}
						}

						if (form.player === '1') {
							if (form.role === item.role) {
								return
							}

							if (form.hero !== '') {
								if (form.role === '0') {
									if (item.landlord !== form.hero) {
										return
									}
								}
								if (form.role === '1') {
									if (item.farmer1 !== form.hero) {
										return
									}
								}
								if (form.role === '2') {
									if (item.farmer2 !== form.hero) {
										return
									}
								}
							}
						}

						const date = dayjs
							.unix(parseInt(item.timestamp))
							.format('MM-DD HH:mm')
						const color = this.isWinMap[parseInt(item.is_win)].color
						const roomLabel = this.roomMap[parseInt(item.room)]
						const isWinLabel = this.isWinMap[parseInt(item.is_win)]
							.label
						const roleLabel = this.roleMap[parseInt(item.role)]

						this.recordsGames.push({
							date,
							color,
							roomLabel,
							isWinLabel,
							roleLabel,
							guid: item.guid,
							landlord: item.landlord,
							farmer1: item.farmer1,
							farmer2: item.farmer2,
							isWin: item.is_win,
							role: item.role,
							multiple: item.multiple,
							golds: item.golds,
							beans: item.beans,
							room: item.room,
							remarks: item.remarks,
							isFlee: item.is_flee,
						})
					})
				})
		},
		getRecordsGolds() {
			this.recordsGolds = []
			axios
				.get('/records/golds/' + this.token)
				.then(({ data: { status, data } }) => {
					if (status !== '0') {
						return
					}
					data.forEach((item) => {
						const date = dayjs
							.unix(parseInt(item.timestamp))
							.format('MM-DD HH:mm')
						const mode = this.goldsModeMap[parseInt(item.mode)]
							.label
						this.recordsGolds.push({
							date,
							guid: item.guid,
							count: item.count,
							mode,
						})
					})
				})
		},
		getRecordsBeans() {
			this.recordsBeans = []
			axios
				.get('/records/beans/' + this.token)
				.then(({ data: { status, data } }) => {
					if (status !== '0') {
						return
					}
					data.forEach((item) => {
						const date = dayjs
							.unix(parseInt(item.timestamp))
							.format('MM-DD HH:mm')
						const mode = this.beansModeMap[parseInt(item.mode)]
							.label
						this.recordsBeans.push({
							date,
							guid: item.guid,
							count: item.count,
							mode,
						})
					})
				})
		},
		getNowGolds() {
			axios
				.get('/assets/golds/' + this.token)
				.then(({ data: { status, data } }) => {
					if (status !== '0') {
						return
					}
					this.nowGolds = data
				})
		},
		getNowBeans() {
			axios
				.get('/assets/beans/' + this.token)
				.then(({ data: { status, data } }) => {
					if (status !== '0') {
						return
					}
					this.nowBeans = data
				})
		},
		getIncome() {
			axios
				.get('/records/income/' + this.token, {
					params: this.datePickerRangeUnix,
				})
				.then(({ data: { status, data } }) => {
					if (status !== '0') {
						return
					}
					this.todayBeans = data.beans
					this.todayGolds = data.golds
				})
		},
	},
}
</script>

<style>
.table-expand {
	font-size: 0;
}
.table-expand label {
	width: 90px;
	color: #99a9bf;
}
.table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
</style>
