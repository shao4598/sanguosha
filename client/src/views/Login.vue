<template>
	<el-container>
		<el-main>
			<el-card class="box-card form-login">
				<el-button @click="onJump('s21294')">s21294</el-button>
				<el-button @click="onJump('w15579')">w15579</el-button>
			</el-card>
		</el-main>
	</el-container>
</template>

<script>
export default {
	methods: {
		onJump(token) {
			const path = '/Landlords/' + token
			this.$router.push({ path })
		},
	},
}
</script>

<style>
.form-login {
	width: 350px;
	margin: 180px auto;
	padding: 35px 35px 15px;
}
</style>
