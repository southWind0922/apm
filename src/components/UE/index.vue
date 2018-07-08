<template>
	<div class="singularity-ue">
		<script :id="id" type="text/plain"></script>
	</div>
</template>
<script>
	import './src/ueditor.config.js'
	import './src/ueditor.all.js'
	import './src/lang/zh-cn/zh-cn.js'
	import './src/ueditor.parse.min.js'

	export default {
		props: {
			defaultMsg: {
				type: [String],
				default: ""
			},
			id: {
				type: [String],
				default: ""
			},
			value: {

			}
		},
		mounted() {
			this.editor = UE.getEditor(this.id, {
				initialFrameWidth: null
			});
			this.editor.addListener("ready", () => {
				this.editor.setContent(this.defaultMsg);
			});

			this.interval = setInterval((val) => {
				this.htmlStr = this.getUEContent()
			}, 1000)
		},
		computed: {
			htmlStr: {
				get: function() {
					return this.value;
				},
				set: function(val) {
					this.$emit('input', val);
				}
			}
		},
		data() {
			return {
				editor: null,
				interval: null
			}
		},
		methods: {
			getUEContent() {
				if(this.editor) {
					return this.editor.getContent()
				} else {
					return ""
				}
			},
			getUEContentTxt() {
				if(this.editor) {
					return this.editor.getContentTxt()
				} else {
					return ""
				}

			}
		},
		destroyed() {
			if(this.interval) {
				clearInterval(this.interval)
			}
			this.editor.destroy();
		}
	}
</script>

<style lang="less">
	.singularity-ue {
		height: 100%;
		width: 100%;
		* {
			box-sizing: content-box;
			line-height: 0;
		}
	}
</style>