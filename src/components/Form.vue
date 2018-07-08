<template>
	<div class="singularity-form">
		<el-form :model="model" :rules="rules" ref="form" :inline="inline" :class="{'collapse':collapse}">
			<el-row :gutter="40">
				<el-col :span="24/formItem.length" v-for="col in formItem" :key="col.id">
					<el-form-item v-for="x in col" :key="x.id" :label="x.label" :prop="x.prop">
						<template v-if="x.type == 'input'">
							<el-input :style="getStyle(x)" v-model="model[x.prop]" :placeholder="x.label" clearable></el-input>
						</template>
						<template v-if="x.type == 'select'">
							<el-select :style="getStyle(x)" v-model="model[x.prop]" :placeholder="x.label" filterable allow-create clearable :multiple="x.options.multiple" :collapse-tags="x.options.multiple">
								<el-option v-for="opt in x.options.list" :key="opt.id" :label="x.options.label?opt[x.options.label]:opt" :value="x.options.value?opt[x.options.value]:opt">
								</el-option>
							</el-select>
						</template>
						<template v-if="x.type == 'date'">
							<el-date-picker :style="getStyle(x)" v-model="model[x.prop]" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</template>
						<template v-if="x.type == 'dateYear'">
							<el-date-picker :style="getStyle(x)" v-model="model[x.prop]" type="year" placeholder="选择年" value-format="yyyy">
							</el-date-picker>
						</template>
					</el-form-item>
					<slot name="extra"></slot>
				</el-col>
			</el-row>
		</el-form>
		<div class="tap" @click="collapsePage">
			<span class="fa" :class="{'fa-angle-up':!collapse,'fa-angle-down':collapse}">
				
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			model: {
				type: [Object],
				default: function() {
					return {
						formItemList: []
					}
				}
			},
			rules: {
				type: [Object],
				default: function() {
					return {}
				}
			},
			inline: {
				type: [Boolean],
				default: false
			},
			item: {
				type: [Array],
				default: function() {
					return []
				}
			}
		},
		mounted(){
			let collapse = this.$.getPreference("formCollapse")
			if(collapse){
				this.collapse = collapse
			}
		},
		computed: {
			formItem: function() {
				if(this.inline) {
					return [this.item]
				} else {
					return this.spliceItem(this.item)
				}
			}
		},
		data() {
			return {
				collapse: false
			};
		},
		methods: {
			getStyle(item) {
				let style = {

				}
				if(this.inline) {
					style = {
						width: `${item.width || 150}px`
					}
				} else {
					style = {

					}
				}
				return style
			},
			spliceItem(item) {
				let res = []
				let len = item.length
				let row = Math.ceil(len / 5)
				let num = Math.ceil(len / row)
				for(let i = 0; i < len; i = i + num) {
					res.push(item.slice(i, i + num))
				}
				return res
			},
			resetFields() {
				this.$refs.form.resetFields();
			},
			validate(fn) {
				this.$refs.form.validate((valid) => {
					fn(valid)
				});
			},
			collapsePage(){
				this.collapse=!this.collapse
				this.$.setPreference("formCollapse",this.collapse)
			}
		}
	};
</script>

<style lang="less">
	.singularity-form {
		position: relative;
		.tap {
			position: absolute;
			left: 50%;
			top: -26px;
			height: 12px;
			margin-left: -19px;
			padding: 0px 11px;
			border: 1px solid #ccc;
			border-top: none;
			cursor:pointer;
			background:#ccc;
			span{
				position: relative;
				top: -5px;
				color:#fff
			}
		}
		.el-form {
			overflow: hidden;
			transition: all linear 0.2s;
		}
		.el-form.collapse {
			height: 0;
		}
	}
</style>