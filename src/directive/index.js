import Vue from 'vue'
import util from '@/config/Util/CommonUtil'

Vue.directive('drag', {
    bind: function(el, binding, vnode, oldVnode) {
        let trigger = el.querySelector("[drag-trigger]") || el
        trigger.onmousedown = (e) => {
            if(e.button != 0) {
                return false
            }
            window.onselectstart = window.ondragstart = () => {
                return false
            };
            let mouse_pos = util.mousePosition(e)
            let dom_pos = util.getElCoordinate(el)
            let offsetX = mouse_pos.x - dom_pos.left
            let offsetY = mouse_pos.y - dom_pos.top
            let X, Y
            window.onmousemove = util.throttle((e) => {
                let mouse_position = util.mousePosition(e)
                X = mouse_position.x - offsetX
                Y = mouse_position.y - offsetY
                X = X >= 0 ? X : 0
                Y = Y >= 0 ? Y : 0
                el.style.left = X + "px"
                el.style.top = Y + "px"
            }, 20)
            window.onmouseup = () => {
                window.onmouseup = window.onmousemove = window.onselectstart = window.ondragstart = null
            }
        }
    }
})