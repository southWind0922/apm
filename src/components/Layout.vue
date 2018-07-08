<template>
	<div class="singularity-layout" :class="{active:collapse}">
		<div class="navBar">
			<div class="head">
				<span class="fa fa-list" @click="collapsePage"></span>
			</div>
			<div class="menuBox">
				<el-menu :collapse="collapse" menu-trigger="click" class="el-menu-vertical-demo" :default-active="path" router unique-opened>
					<template v-for="item in data">
						<el-submenu v-if="item.children&&item.children.length>0" :index="item.url||item.id">
							<template slot="title">
								<i class="navIcon" :class="item.icon"></i>
								<span>{{item.name}}</span>
							</template>
							<el-menu-item v-for="x in item.children" :key="x.url" :index="x.url||item.id">
								<i class="navIcon"></i>
								<span class="split"></span> {{x.name}}
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="!(item.children&&item.children.length>0)" :index="item.url||item.id">
							<i class="navIcon" :class="item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</div>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.path = this.$route.path
			this.$store.getters.menu.forEach((val) => {
				if(val.children) {
					this.$.tree.forEach(val.children, (value) => {
						if(value.url == this.path) {
							this.data = val.children
						}
					})
				}
			})
			let collapse = this.$.getPreference("navCollapse")
			if(collapse){
				this.collapse = collapse
			}
		},
		data() {
			return {
				collapse: false,
				path: "",
				data: []
			};
		},
		methods: {
			collapsePage(){
				this.collapse=!this.collapse
				this.$.setPreference("navCollapse",this.collapse)
			}
		}
	}
</script>

<style lang="less" scoped>
	.singularity-layout {
		height: 100%;
		width: 100%;
		display: flex;
		>.navBar {
			width: 200px;
			height: 100%;
			transition: linear all .2s;
			border-right: solid 1px #e6e6e6;
			background: rgb(247, 250, 251);
			z-index: 2;
			>div.head {
				height: 50px;
				width: 100%;
				text-align: right;
				padding: 15px 25px 15px 0px;
				float: left;
				.fa-list {
					color: #bfcbd9;
					cursor: pointer;
				}
			}
			>div.menuBox {
				height: 100%;
				width: 100%;
				padding-top: 50px;
				>.el-menu {
					height: 100%;
					border-right: none;
					background: transparent;
					.el-submenu.is-opened>.el-submenu__title,
					.el-submenu.is-opened>.el-submenu__title i {
						color: #409EFF;
					}
					.el-menu-item {
						width: 100%;
						min-width: auto;
						padding: 0 20px!important
					}
					.el-menu-item.is-active {
						background: #409EFF;
						color: #FFF
					}
					.navIcon {
						display: inline-block;
						height: 18px;
						width: 18px;
						margin: 0 10px 0 3px;
						position: relative;
						top: 1px
					}
				}
				>.el-menu.horizontal-collapse-transition {
					transition: linear all .2s;
				}
			}
		}
		>.content {
			height: 100%;
			width: 0;
			flex: auto;
			overflow: hidden;
			transition: linear all .2s;
			z-index: 1;
			>div {
				height: 100%;
				width: 100%;
			}
		}
	}
	
	.singularity-layout.active {
		>.navBar {
			width: 65px;
		}
	}
</style>