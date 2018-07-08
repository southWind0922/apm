<template>
    <div class="singularity-button" @click="handleClick">
        <div class="icon">
            <span :class="typeIcon" :style="iconStyle">
        	
        	</span>
        </div>
        <div class="word">
            <span v-if="$slots.default"><slot></slot></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            icon: {
                type: [String],
                default: ""
            },
            type: {
                type: [String],
                default: ""
            },
            iconColor: {
                type: [String],
                default: ""
            }
        },
        mounted() {
            switch(this.type) {
                case "create":
                    this.typeIcon = "fa fa-plus create"
                    break;
                case "import":
                    this.typeIcon = "fa fa-cloud-upload import"
                    break;
                case "export":
                    this.typeIcon = "fa fa-cloud-download export"
                    break;
                case "download":
                    this.typeIcon = "fa fa-download download"
                    break;
                case "delete":
                    this.typeIcon = "fa fa-trash delete"
                    break;
                default:
                    this.typeIcon = ""
                    break;
            }
            if(!!this.icon) {
                this.typeIcon = this.icon
            }
            this.iconStyle = {
                color: this.iconColor
            }
        },
        data() {
            return {
                typeIcon: "",
                iconStyle: {}
            };
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        }
    };
</script>

<style lang="less" scoped>
    .singularity-button {
        display: inline-block;
        height: 55px;
        cursor: pointer;
        color: rgb(153, 153, 153);
        padding: 4px 10px;
        +.singularity-button {
            margin-left: 20px;
        }
        .icon {
            text-align: center;
            span{
            	font-size: 26px;
            	margin-bottom:2px
            }
            span.create {
                color: rgb(51, 218, 102)
            }
            span.import {
                color: rgb(110, 119, 250)
            }
            span.export {
                color: rgb(90, 139, 255)
            }
            span.download {
                color: rgb(55, 214, 209)
            }
            span.delete {
                color: rgb(255, 119, 117)
            }
        }
        .word {
            text-align: center;
        }
    }
    
    .singularity-button:hover {
        color: #000;
        background: rgba(245, 245, 245, 0.6);
        box-shadow: 0 0 2px #999;
    }
</style>