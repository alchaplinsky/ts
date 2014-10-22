function FastClick(a,b){"use strict";function c(a,b){return function(){return a.apply(b,arguments)}}var d;if(b=b||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=b.touchBoundary||10,this.layer=a,this.tapDelay=b.tapDelay||200,!FastClick.notNeeded(a)){for(var e=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],f=this,g=0,h=e.length;h>g;g++)f[e[g]]=c(f[e[g]],f);deviceIsAndroid&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0)),a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchmove",this.onTouchMove,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,d){var e=Node.prototype.removeEventListener;"click"===b?e.call(a,b,c.hijacked||c,d):e.call(a,b,c,d)},a.addEventListener=function(b,c,d){var e=Node.prototype.addEventListener;"click"===b?e.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(a,b,c,d)}),"function"==typeof a.onclick&&(d=a.onclick,a.addEventListener("click",function(a){d(a)},!1),a.onclick=null)}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(a.className)},FastClick.prototype.needsFocus=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},FastClick.prototype.sendClick=function(a,b){"use strict";var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},FastClick.prototype.determineEventType=function(a){"use strict";return deviceIsAndroid&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(a){"use strict";var b;deviceIsIOS&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},FastClick.prototype.updateScrollParent=function(a){"use strict";var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(a){"use strict";return a.nodeType===Node.TEXT_NODE?a.parentNode:a},FastClick.prototype.onTouchStart=function(a){"use strict";var b,c,d;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],deviceIsIOS){if(d=window.getSelection(),d.rangeCount&&!d.isCollapsed)return!0;if(!deviceIsIOS4){if(c.identifier&&c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<this.tapDelay&&a.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(a){"use strict";var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},FastClick.prototype.onTouchMove=function(a){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(a){"use strict";return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(a){"use strict";var b,c,d,e,f,g=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(f=a.changedTouches[0],g=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||g,g.fastClickScrollParent=this.targetElement.fastClickScrollParent),d=g.tagName.toLowerCase(),"label"===d){if(b=this.findControl(g)){if(this.focus(g),deviceIsAndroid)return!1;g=b}}else if(this.needsFocus(g))return a.timeStamp-c>100||deviceIsIOS&&window.top!==window&&"input"===d?(this.targetElement=null,!1):(this.focus(g),this.sendClick(g,a),deviceIsIOS&&"select"===d||(this.targetElement=null,a.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(e=g.fastClickScrollParent,e&&e.fastClickLastScrollTop!==e.scrollTop)?!0:(this.needsClick(g)||(a.preventDefault(),this.sendClick(g,a)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(a){"use strict";return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(a){"use strict";var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},FastClick.prototype.destroy=function(){"use strict";var a=this.layer;deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(a){"use strict";var b,c,d;if("undefined"==typeof window.ontouchstart)return!0;if(c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(b=document.querySelector("meta[name=viewport]")){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(c>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(deviceIsBlackBerry10&&(d=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),d[1]>=10&&d[2]>=3&&(b=document.querySelector("meta[name=viewport]")))){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===a.style.msTouchAction?!0:!1},FastClick.attach=function(a,b){"use strict";return new FastClick(a,b)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick,function(){var a,b;window.SnakeGame=function(){function c(){var a;this.canvas=document.getElementById("game-canvas"),this.context=this.canvas.getContext("2d"),this.navigation(),a=new Image,a.src="images/snake_chunk.png",a.onload=function(b){return function(){return b.snakePattern=b.context.createPattern(a,"repeat")}}(this)}var d,e;return d={up:"down",left:"right",right:"left",down:"up"},e={up:[38,75,87],down:[40,74,83],left:[37,65,72],right:[39,68,76]},c.prototype.navigation=function(){return document.addEventListener("click",function(a){return function(b){return b.target.attributes["class"]&&b.target.attributes["class"].value.match(/control/)?a.snake.direction=b.target.attributes["data-direction"].value:void 0}}(this),!1),addEventListener("keydown",function(a){return function(b){var c;switch(b.keyCode){case 38:c="up";break;case 40:c="down";break;case 37:c="left";break;case 39:c="right"}return c!==d[a.snake.direction]?a.snake.direction=c:void 0}}(this),!1)},c.prototype.start=function(){return this.over=!1,this.score=0,this.fps=8,this.snake=new b(this),this.food=new a(this),this.food.set(),this.resume()},c.prototype.stop=function(){var a;return this.over=!0,a=new Event("gameOver"),document.dispatchEvent(a)},c.prototype.pause=function(){return clearInterval(this.interval)},c.prototype.resume=function(){return this.interval=setInterval(function(a){return function(){return a.over===!1?(a.resetCanvas(),a.snake.move(),a.food.draw(),a.snake.draw()):void 0}}(this),1e3/this.fps)},c.prototype.drawBox=function(a){return this.context.fillStyle=a.color?a.color:a.image,this.context.beginPath(),this.context.moveTo(a.x-a.size/2,a.y-a.size/2),this.context.lineTo(a.x+a.size/2,a.y-a.size/2),this.context.lineTo(a.x+a.size/2,a.y+a.size/2),this.context.lineTo(a.x-a.size/2,a.y+a.size/2),this.context.closePath(),this.context.fill()},c.prototype.resetCanvas=function(){return this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},c}(),b=function(){function a(a){var b;for(this.game=a,this.sections=[],this.direction="left",this.x=this.game.canvas.width/2+this.size/2,this.y=this.game.canvas.height/2+this.size/2,b=this.x+5*this.size;b>=this.x;)this.sections.push(b+","+this.y),b-=this.size}return a.prototype.size=16,a.prototype.move=function(){switch(this.direction){case"up":this.y-=this.size;break;case"down":this.y+=this.size;break;case"left":this.x-=this.size;break;case"right":this.x+=this.size}return this.checkCollision(),this.checkGrowth(),this.sections.push(this.x+","+this.y)},a.prototype.draw=function(){var a,b,c,d,e;for(d=this.sections,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.drawSection(a.split(",")));return e},a.prototype.drawSection=function(a){return this.game.drawBox({x:parseInt(a[0]),y:parseInt(a[1]),size:this.size,image:this.game.snakePattern})},a.prototype.checkCollision=function(){return this.isCollision(this.x,this.y)?this.game.stop():void 0},a.prototype.isCollision=function(a,b){return a<this.size/2||a>this.game.canvas.width||b<this.size/2||b>this.game.canvas.height||this.sections.indexOf(a+","+b)>=0?!0:void 0},a.prototype.checkGrowth=function(){return this.x===this.game.food.x&&this.y===this.game.food.y?(this.game.score=this.game.score+10,this.game.score%50===0&&this.game.fps<60&&this.game.fps++,this.game.food.set()):this.sections.shift()},a}(),a=function(){function a(a){this.game=a}return a.prototype.color="#0FF",a.prototype.set=function(){return this.size=this.game.snake.size,this.x=Math.ceil(10*Math.random())*this.game.snake.size*2-this.game.snake.size/2,this.y=Math.ceil(10*Math.random())*this.game.snake.size*2-this.game.snake.size/2},a.prototype.draw=function(){return this.game.drawBox({x:this.x,y:this.y,size:this.size,color:this.color})},a}()}.call(this),function(){var a;a=function(){function a(){document.getElementById("start").addEventListener("click",function(a){return function(){return a.startGame()}}(this)),document.getElementById("restart").addEventListener("click",function(a){return function(){return a.startGame()}}(this)),document.getElementById("quit").addEventListener("click",function(a){return function(){return a.confirmQuit()}}(this)),document.getElementById("back").addEventListener("click",function(a){return function(){return a.backToGame()}}(this)),document.getElementById("confirm").addEventListener("click",function(a){return function(){return a.goHome()}}(this)),document.getElementById("submit").addEventListener("click",function(a){return function(){return a.submitResult()}}(this)),document.addEventListener("click",function(a){return function(b){return b.target.attributes["class"]&&"home"===b.target.attributes["class"].value?a.goHome():void 0}}(this)),document.addEventListener("gameOver",function(a){return function(){return a.showScore()}}(this)),this.changeState(".intro")}return a.prototype.headerHeight=41,a.prototype.pages=".intro, .game, .confirmation, .gameover, .thankyou",a.prototype.goHome=function(){return this.changeState(".intro")},a.prototype.startGame=function(){return this.changeState(".game"),this.game=new SnakeGame,this.game.start()},a.prototype.confirmQuit=function(){return this.game.pause(),this.changeState(".confirmation")},a.prototype.backToGame=function(){return this.changeState(".game"),this.game.resume()},a.prototype.showScore=function(){return this.changeState(".gameover"),document.getElementById("score").innerText=this.game.score},a.prototype.submitResult=function(){return""!==document.querySelector(".username").value?this.changeState(".thankyou"):void 0},a.prototype.changeState=function(a){var b,c,d,e,f,g,h,i,j;for(j=document.querySelectorAll(this.pages),h=0,i=j.length;i>h;h++)e=j[h],e.classList.remove("active");return f=document.querySelector(a),f.classList.add("active"),b=document.querySelector(".active .by-center"),null!==b?(c=b.offsetHeight,g=screen.height,d=(g-c-this.headerHeight)/2,b.style.position="relative",b.style.top=""+d+"px"):void 0},a}(),window.onload=function(){return FastClick.attach(document.body),new a}}.call(this);