<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="chal名称">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
<!--		<el-form-item label="活动区域">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="活动时间">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>-->
<!--		<el-form-item label="即时配送">
			<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
		</el-form-item>-->
<!--		<el-form-item label="chal"> e"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		-->
		<el-form-item label="类型">
			<el-radio-group v-model="form.type">
				<el-radio label="web" name="type"></el-radio>
				<el-radio label="pwn" nbame="type"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="score">
			<el-input-number v-model="form.score"  :min="1" :max="1000"></el-input-number>
		</el-form-item>
		<el-form-item label="docker镜像名称">
			<el-input v-model="form.dockername"></el-input>
		</el-form-item>		

						<el-form-item label="启动指令">
			<el-input v-model="form.command"></el-input>
		</el-form-item>
						<el-form-item label="更新flag指令">
			<el-input v-model="form.flagcommand"></el-input>
		</el-form-item>

		<el-form-item label="chal描述">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: 'test1',
					dockername: '',
					command:'',
					flagcommand:'',
					//date1: '',
					//date2: '',
					score:100,
					delivery: false,
					type: 'pwn',
					//resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
				console.log(this.$data.form.type);
			}
		}
	}

</script>
<style lang='scss'>
.el-form-item__label{
	text-align:left;
}
</style>