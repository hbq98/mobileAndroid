/*
 * @Description: 
 * @version: 1.0.0
 * @Author: hbq
 * @Date: 2020-08-10 18:41:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-08-11 16:58:23
 */
window.onload = function() {
    // 为某个元素添加样式

    /**
     * @description: 为元素添加类名
     * @author: hbq
     * @version: 1.0.0
     * @param {Object} element 目标元素
     * @param {String} clsName 类名
     * @return {Boolean} true为添加成功 false为添加失败
     */
    function addClass(element, clsName) {
        var baseClass = element.className;
        // 如果当前元素不包含当前传入的类名，将类名添加到当前元素中
        if (baseClass.indexOf(clsName) === -1) {
            element.className = baseClass + ' ' + clsName;
            return true
        }
        return false;
    }

    /**
     * @description: 为元素删除类名
     * @author: hbq
     * @version: 1.0.0
     * @param {Object} element 目标元素
     * @param {String} clsName 类名
     * @return {Boolean} true为删除成功 false为删除失败
     */
    function removeClass(element, clsName) {
        var baseClass = element.className;
        // 如果当前元素包含传入的类名，将类名从当前元素中删除
        if (baseClass.indexOf(clsName) !== -1) {
            element.className = baseClass.replace(clsName, '').replace(/\s+/g, ' ').trim();
            return true;
        }
        return false;
    }

    /**
     * @description: 设置某组元素为init状态
     * @author: hbq
     * @version: 1.0.0
     * @param {String} 目标类名
     * @return {void} 没有返回值
     */
    function setElementsInit(screenCls) {
        var elements = animateElement[screenCls];
        for (var i = 0; i < elements.length; i++) {
            var element = document.querySelector(elements[i]);
            var baseCls = element.className;
            element.className = baseCls + ' ' + elements[i].substr(1) + '-animation-init';
        }
    }

    /**
     * @description: 设置某组元素为done状态
     * @author: hbq
     * @version: 1.0.0
     * @param {String} 目标类名
     * @return {void} 没有返回值
     */
    function setElementsDone(screenCls) {
        if (!flag) {
            console.log('setElementsDone');
            var elements = animateElement[screenCls];
            for (var i = 0; i < elements.length; i++) {
                var element = document.querySelector(elements[i]);
                var baseCls = element.className;
                element.className = baseCls.replace('-animation-init', '-animation-done');
            }
        }
    }

    // 定义需要做动画的元素对象
    var animateElement = {
        '.screen1': [
            '.screen1-title',
            '.screen1-phone',
            '.screen1-shadow',
        ],
        '.screen2': [
            '.screen2-title',
            '.screen2-subtitle',
            '.screen2-phone',
            '.screen2-line1',
            '.screen2-line2',
            '.screen2-line3',
        ],
        '.screen3': [
            '.screen3-title',
            '.screen3-phone',
            '.screen3-subtitle',
            '.screen3-features',
        ],
        '.screen4': [
            '.screen4-title',
            '.screen4-subtitle',
            '.screen4-type-item1',
            '.screen4-type-item2',
            '.screen4-type-item3',
            '.screen4-type-item4',
        ],
        '.screen5': [
            '.screen5-title',
            '.screen5-subtitle',
            '.screen5-bg',
        ]
    }

    // 初始化页面为init状态
    for (element in animateElement) {
        if (element == '.screen1') {
            continue;
        }
        setElementsInit(element);
    }

    // 设置第一屏done状态
    this.setTimeout(function() {
        setElementsDone('.screen1');
    }, 200);

    var header = document.querySelector('.header');
    var headerHeight = header.offsetHeight;
    var sideBar = document.querySelector('.sidebar');
    var screenHeight = document.querySelector('.screen1').offsetHeight;
    var flag = false;

    // 页面滚动时处理函数
    window.onscroll = function() {

        // 1.当页面滚动距离大于或等于头部元素的高度时切换头部样式，显示侧边栏。
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= headerHeight) {
            addClass(header, 'header-fixed');
            addClass(sideBar, 'sidebar-show');
        } else {
            removeClass(header, 'header-fixed');
            removeClass(sideBar, 'sidebar-show');
            navItemsActive(0);
        }

        // 2.滚动到某一屏内容时，当前屏内容做动画效果，并且导航栏与侧边栏成激活状态
        if (scrollTop > (screenHeight - 100)) {
            setElementsDone('.screen2');
            navItemsActive(1);
        }
        if (scrollTop > (screenHeight * 2 - 100)) {
            setElementsDone('.screen3');
            navItemsActive(2);
        }
        if (scrollTop > (screenHeight * 3 - 100)) {
            setElementsDone('.screen4');
            navItemsActive(3);
        }
        if (scrollTop > (screenHeight * 4 - 100)) {
            setElementsDone('.screen5');
            navItemsActive(4);
            flag = true;
        }
    }

    var navItems = document.querySelectorAll('.nav a');
    var sideBarItems = document.querySelectorAll('.sidebar a');
    var navLine = document.querySelector('.nav-line');

    // 设置头部导航栏与侧边栏激活状态
    function navItemsActive(index) {
        // 清空头部导航栏样式
        for (var i = 0; i < navItems.length; i++) {
            removeClass(navItems[i], 'nav-active');
            navLine.style.left = 0 + 'px';
        }
        // 为当前需要激活的导航链接添加样式
        addClass(navItems[index], 'nav-active');
        navLine.style.left = (index * 74) + 'px';

        // 清空侧边栏导航样式
        for (var i = 0; i < sideBarItems.length; i++) {
            sideBarItems[i].className = '';
        }
        // 为当前需要激活的侧边栏导航添加样式
        sideBarItems[index].className = 'sidebar-active';
    }

    // 3.点击导航栏或者侧边栏时，跳转到页面对应的内容区域。
    // 设置导航跳转
    function setNavJump(index, elements) {
        elements[index].onclick = function() {
            document.documentElement.scrollTop = index * screenHeight;
        }
    }

    for (var i = 0; i < navItems.length; i++) {
        setNavJump(i, navItems);
        /* navItems[i].onclick = function() {
            document.documentElement.scrollTop = i * screenHeight;
        } */
    }

    for (var i = 0; i < sideBarItems.length; i++) {
        setNavJump(i, sideBarItems);
        /* sideBarItems[i].onclick = function() {
            document.documentElement.scrollTop = i * screenHeight;
        } */
    }

    // 4.滑动门效果 鼠标移动到导航栏与小红条相对应
    function setNavLine(index, elements) {
        // 头部导航栏链接绑定鼠标移入事件，小红条跟随鼠标移动
        elements[index].onmouseover = function() {
            navLine.style.left = (74 * index) + 'px';
        }

        var currentIndex = 0;
        // 头部导航栏绑定鼠标移出事件，获取当前激活状态的导航栏链接下标，小红条回到当前激活状态下的位置
        elements[index].onmouseout = function() {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].classList.contains('nav-active')) {
                    currentIndex = i;
                    break;
                }
            }
            navLine.style.left = (74 * currentIndex) + 'px';
        }
    }

    for (var i = 0; i < navItems.length - 1; i++) {
        setNavLine(i, navItems);
    }
}