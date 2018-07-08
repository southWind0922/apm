<template>
	<singularity-dialog id="scoreAlertMail" title="发送邮件" ref="dialog" fullscreen @submit="submit">
		<div class="mailContent">
			<el-form class="mailForm" :rules="rules" :model="form.mail" ref="form">
				<div class="mail template" v-popover:popover>
					<el-form-item class="subject" label="主题" prop="subject">
						<el-input v-model="form.mail.subject" placeholder="主题" clearable></el-input>
					</el-form-item>
					<el-form-item class="content" label="正文" prop="content">
						<singularity-ue id="ue" ref="ue" v-model="form.mail.content"></singularity-ue>
					</el-form-item>
				</div>
				<div class="mail text">
					<el-form-item class="preview" label="预览" prop="preview">
						<div class="formatStr" v-html="parseStr">

						</div>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-popover ref="popover" placement="right" title="可用模板字段" width="200" trigger="hover" :open-delay="1000">
			<ul>
				<li v-for="item in template.list">{{item.template}}</li>
			</ul>
		</el-popover>
	</singularity-dialog>
</template>

<script>
	import UE from "components/UE";

	import {
		sendEmail
	} from "./service";

	import {
		Template,
		MailData,
		MailRule
	} from "./entity";

	export default {
		components: {
			'singularity-ue': UE
		},
		computed: {
			parseStr() {
				return this.template.parse(this.form.mail.content, this.data)
			}
		},
		data() {
			return {
				data: null,
				interval: null,
				content: "",
				template: Template(),
				form: MailData(),
				rules: MailRule(),
			}
		},
		methods: {
			getPage(data) {
				this.show()
				this.data = data
				this.form.names = [data.id.toString()]
			},
			getMassPage(id) {
				this.show()
				this.form.names = id.split(",")
			},
			show() {
				this.data = null
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.form = MailData()
				this.$refs.dialog.show()
			},
			submit() {
				this.$refs.form.validate((valid) => {
					if(valid) {
						this.$confirm(`您即将发送${this.form.names.length}封邮件, 确认发送?`, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.sendEmail()
						}).catch(() => {});
					} else {
						return false;
					}
				});
			},
			async sendEmail() {
				_parse(this.form.export())
//				let res = await sendEmail(this.form.export())
//				this.$refs.dialog.hide()
			}
		}
	}
</script>

<style lang="less">
	#scoreAlertMail {
		.el-dialog {
			min-width: 1150px;
		}
		.mailContent {
			height: 100%;
			width: 100%;
			.mailForm {
				height: 100%;
				width: 100%;
				display: flex;
				.mail {
					height: 100%;
					width: 0;
					flex: auto;
				}
				.mail.template {
					display: flex;
					flex-direction: column;
					margin-right: 20px;
					.el-form-item__content {
						height: 100%;
						display: flex;
						.el-input {
							flex: auto;
							width: 0;
						}
					}
					.content {
						height: 0;
						width: 100%;
						flex: auto;
						#ue {
							height: 100%;
							width: 100%;
							.edui-editor-bottomContainer {
								display: none
							}
						}
					}
				}
				.mail.text {
					display: flex;
					flex-direction: column;
					.el-form-item__content {
						height: 100%;
						display: flex;
					}
					.preview {
						height: 0;
						width: 100%;
						flex: auto;
						.formatStr {
							height: 100%;
							width: 100%;
							padding: 8px;
							border-radius: 4px;
							border: 1px solid #d4d4d4;
							em {
								font-style: oblique;
							}
							strong {
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
</style>