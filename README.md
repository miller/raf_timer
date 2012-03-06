###requestAnimationFrame(RAF)的优点
* 与浏览器重绘时间间隔完全一致，避免了无用的计算；
* 能够利用浏览器自身的优化策略，例如页面不可见会停止计算等

###重写Timer的目的
* 正常情况下RAF的最短执行周期与浏览器重绘周期一致，约为16ms。
* 很多使用timer的操作并不需要这么高的执行频率，例如倒计时，因此需要timer本身的特性。

###Demo
[http://jsfiddle.net/millerchen/CngGh/5/](http://jsfiddle.net/millerchen/CngGh/5/)

###参考
* [Animating with javascript: from setInterval to requestAnimationFrame](http://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/)
* [性能](http://msdn.microsoft.com/library/hh673556.aspx)