export default {
	data() {
		return {
			goldsModeMap: {
				0: { label: '沙摩柯', count: '99999' },
				1: { label: '沙摩柯试用', count: '500' },
				2: { label: '沙摩柯皮肤', count: '46666' },
				3: { label: '鼠年大吉', count: '300' },
				4: { label: '鼠年壹号', count: '300' },
				5: { label: '银币*100', count: '100' },
				6: { label: '雁翎甲', count: '500' },
				7: { label: '雁翎甲*2', count: '800' },
				8: { label: '换将卡*50', count: '1600' },
				9: { label: '手气卡*50', count: '1600' },
				10: { label: '招募令', count: '1000' },
				11: { label: '招募令*3', count: '2350' },
				12: { label: '进阶丹', count: '400' },
				13: { label: '欢乐豆', count: '2000' },
				14: { label: '其它', count: '0' },
			},
			beansModeMap: {
				0: { label: '每日任务', count: '165' },
				1: { label: '周薪', count: '1000' },
				2: { label: '红包', count: '10' },
				3: { label: '盒子/福袋/礼包赠送', count: '50' },
				4: { label: '签到', count: '2' },
				5: { label: '元宝/金币购买', count: '10000' },
				6: { label: '金票内循环', count: '2000' },
				7: { label: '其它', count: '0' },
			},
			isWinMap: {
				0: { color: 'primary', label: '负' },
				1: { color: 'danger', label: '胜' },
			},
			roomMap: {
				0: '普通场',
				1: '至尊场',
			},
			roleMap: {
				0: '地主',
				1: '农民1',
				2: '农民2',
			},
		}
	},
}
