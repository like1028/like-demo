/**
 *@fileName timer.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/6/14
 *@disc
 */

    function timer(options){
        var options = options,
            initTime = options.initTime ? options.initTime : 0,
            inFn = options.inFn,
            endFn = options.endFn;

        var timerId = window.setInterval(function(){
            var minute = 0,
                second = 0;//时间默认值
            if(initTime > 0){
                minute = Math.floor(initTime / 60);
                second = Math.floor(initTime) - (minute * 60);
                minute <= 9 ? minute = '0' + minute : minute;
                second <= 9 ? second = '0' + second : second;
                var timerText = minute + ":" + second,
                    val = {
                        minute :minute,
                        second :second,
                        timerText :timerText
                    };
                inFn && typeof inFn == "function" ? inFn(val) : "";
            }
            else if (initTime == 0) {
                clearInterval(timerId);
                endFn && typeof endFn == "function" ? endFn() : "";
            }
            initTime --;
        }, 1000);
    }