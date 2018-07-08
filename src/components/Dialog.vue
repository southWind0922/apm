<template>
    <div>
        <el-dialog :id="id" ref="dialog" class="singularity-dialog" :custom-class="customclass" :fullscreen="fullscreen" :title="title" :visible.sync="visible" :close-on-click-modal="false" append-to-body>
            <slot></slot>
            <span slot="footer" class="dialog-footer" v-if="!hidesubmit">
			    <el-button @click="visible = false">取 消</el-button>
			    <el-button type="primary" @click="submit()">确 定</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: [String],
                default: "对话框"
            },
            id: {
                type: [String],
                default: ""
            },
            customclass: {
                type: [String],
                default: ""
            },
            size: {
                type: [String, Number],
                default: "small"
            },
            fullscreen: {
                type: [Boolean],
                default: false
            },
            margin: {
                type: [String],
                default: "5%"
            },
            hidesubmit: {
                type: [Boolean],
                default: false
            }
        },
        mounted() {
            this.bindDrag()
            this.initPosition()
        },
        computed: {
            width: function() {
                if(typeof this.size == 'number') {
                    return this.size + "px"
                }
                switch(this.size) {
                    case "small":
                        return "400px"
                        break;
                    case "normal":
                        return "600px"
                        break;
                    case "large":
                        return "800px"
                        break;
                    default:
                        return "400px"
                        break;
                }
            }
        },
        watch: {
            margin: function(val) {
                this.initPosition()
            }
        },
        data() {
            return {
                visible: false
            };
        },
        methods: {
            initPosition() {
                let dom = this.$refs.dialog.$el.querySelector(".el-dialog")
                let cssText = ""
                if(this.fullscreen) {
                    if(this.margin.includes("%")) {
                        let margin = parseInt(this.margin)
                        cssText += `top:${margin}%;left:${margin}%;height:${100-margin*2}%;width:${100-margin*2}%;`
                    } else if(this.margin.includes("px")) {
                        cssText += `top:${margin}px;left:${margin}px;bottom:calc(100% - ${margin*2}px);right:calc(100% - ${margin*2});`
                    } else {
                        cssText += `top:0;left:0;height:100%;width:100%;`
                    }
                } else {
                    cssText += `width:${this.width};left:calc(50% - ${parseInt(this.width)/2}px);`
                }
                if(dom) {
                    dom.style.cssText = cssText
                }
            },
            bindDrag() {
                let dom = this.$refs.dialog.$el
                let header = dom.querySelector(".el-dialog__header")
                let body = dom.querySelector(".el-dialog")
                header.onmousedown = (e) => {
                    if(e.button != 0) {
                        return false
                    }
                    window.onselectstart = window.ondragstart = () => {
                        return false
                    };
                    let mouse_pos = this.$.mousePosition(e)
                    let dom_pos = this.$.getElCoordinate(body)
                    let offsetX = mouse_pos.x - dom_pos.left
                    let offsetY = mouse_pos.y - dom_pos.top
                    let X, Y
                    window.onmousemove = this.$.throttle((e) => {
                        let mouse_position = this.$.mousePosition(e)
                        X = mouse_position.x - offsetX
                        Y = mouse_position.y - offsetY
                        X = X >= 0 ? X : 0
                        Y = Y >= 0 ? Y : 0
                        body.style.left = X + "px"
                        body.style.top = Y + "px"
                    }, 20)
                    window.onmouseup = () => {
                        window.onmouseup = window.onmousemove = window.onselectstart = window.ondragstart = null
                    }
                }
            },
            show() {
                this.visible = true
            },
            hide() {
                this.visible = false
            },
            submit() {
                this.$emit("submit")
            }
        }
    };
</script>

<style lang="less">
    .singularity-dialog {
        .el-dialog {
            position: absolute;
            margin: 0;
            top: 15%;
        }
        .el-dialog .el-dialog__body {
            padding: 30px 40px
        }
        .el-dialog.is-fullscreen {
            display: flex;
            flex-direction: column;
        }
        .el-dialog.is-fullscreen .el-dialog__body {
            height: 0;
            flex: auto;
        }
        .el-dialog__footer {
            padding: 10px 40px 20px
        }
    }
</style>