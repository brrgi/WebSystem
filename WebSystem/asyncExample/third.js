const EventEmitter = require('events').EventEmitter;
class Countdown extends EventEmitter { // 객체와 사용하는 것이 유리
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious; // convert (falsey: 0, null, undefined) to boolean
    }
    go() {
        const countdown = this;
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                setTimeout(function() {
                    if(countdown.superstitious && i===13)
                        return reject(new Error('DEFINITELY NOT COUNTING THAT'));
                    countdown.emit('tick', i); // 이 이벤트에 대해 on(‘이벤트 이름’, callback)으로 받음
                    if(i===0) resolve();
                }, (countdown.seconds-i)*1000);
            }
        });
    }
}