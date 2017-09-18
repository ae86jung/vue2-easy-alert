<template>
    <div class="alert-container" v-show="containerShowing">
        <transition name="modal">
            <div class="alert-wrapper" v-show="showing">
                <h2 class="alter-title" :style="mergedOption.titleStyle" v-if="mergedOption.title">{{mergedOption.title}}</h2>
                <div class="alert-body">
                    <span :style="mergedOption.messageStyle">{{mergedOption.message || '暂无消息'}}</span>
                </div>
                <div class="alert-footer">
                    <div v-if="mergedOption.isConfirm" class="alert-bottom">
                        <div class="alert-bottom-item" @click="cancel">取消</div>
                        <div class="alert-bottom-item sure" @click="sure">确定</div>
                    </div>
                    <div v-else class="alert-bottom">
                        <div class="alert-bottom-item sure" @click="cancel">确定</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .alert-container{
        position: fixed;
        top: 0;
        bottom:0;
        width: 100%;
        background: hsla(0, 0%, 65%, 0.9);
    }
    .alert-wrapper{
        position:fixed;
        width: 250px;
        height: auto;
        border: 1px solid transparent;
        border-radius: 5px;
        left:50%;
        margin-left:-125px;
        top:50%;
        margin-top:-82px;
        z-index:9999;
        overflow: hidden;
    }
    .alter-title{
        text-align: center;
        color: #666;
        font-size: 15px;
        padding: 10px 0;
        background: #fff;
        border-bottom: 1px solid #eee;
    }
    .alert-body{
        width: inherit;
        min-height: 100px;
        background: #fff;
        text-align: center;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center; /*定义body的元素水平居中*/
    }
    .alert-footer{
        border-top: 1px solid #eee;
        height: 50px;
        width: inherit;
        background: #f6f6f6;
    }
    .alert-bottom{
        display: flex;
        height: inherit;
    }
    .alert-bottom-item{
        display: flex;
        flex: 1;
        height: inherit;
        justify-content: space-around;
        align-content: center;
        align-items:center;
    }
    .alert-bottom-item.sure{
        color: #5d93db;
    }
    .alert-bottom-item:first-child{
        border-right: 1px solid #eee;
    }

    .modal-enter-active {
        animation-delay: 0.2s;
        animation: modal-in .5s;
    }
    .modal-leave-active {
        animation: modal-in .5s reverse;
    }
    @keyframes modal-in {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
<script>
	import Vue from 'vue'

	const DEFAULT_OPT = {
		id: 'easy-alert-default',
		message: '',
        messageStyle:'',
        title: '',
        titleStyle: '',
		isConfirm: false,
        isAsync: false,
        onOk(){}
	}
	export default {
		DEFAULT_OPT: DEFAULT_OPT,
		data() {
			return {
				queue: [],

				option: {},
				showing: false,
				containerShowing: false
			}
		},
		methods:{
			sure(){
				if(this.isAsync){
					this.mergedOption.onOk(() => {
						this.queue.shift()
                    })
                }else{
					this.mergedOption.onOk()
					this.queue.shift()
                }
            },
			cancel(){
				this.queue.shift()
            }
        },
		computed: {
			mergedOption: function() {
				return Object.assign({}, DEFAULT_OPT, this.option)
			}
		},
		watch: {
			showing(){
			    if(!this.showing){
			    	setTimeout(() => {
						this.containerShowing = false
                    }, 300)
                }else{
					this.containerShowing = true
                }
            },
			queue: function() {
				let pending = this.queue.length
				if (pending === 0) {
					this.showing = false
					return
				}
				this.showing = true
				this.option = this.queue[0]
			}
		}
	}
</script>
