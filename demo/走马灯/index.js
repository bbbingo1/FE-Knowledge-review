let b_wrap = new Vue({
    el: '#b_wrap',
    data() {
        return {
            names: ['Michelangelo', 'Davinci', 'Raffaello'],
            showIndex: 0,
            timer: '',
            arr : ['#3e72c2', '#50b87b', '#c2523e']
        }
    },
    computed: {
        activePic() {
            return "url(./pics/pic" + (this.showIndex + 1) + '.jpg)'
        },
        activeColor() {
            return this.arr[this.showIndex]
        }
    },
    mounted() {
        this.timer = setInterval(this.play, 3000)
    },
    methods: {
        play() {
            if (this.showIndex == this.names.length - 1) this.showIndex = 0;
            else {
                this.showIndex++
            }
        },
        stop() {
            clearInterval(this.timer);
        },
        move() {
            this.timer = setInterval(this.play, 3000);
        },
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
})
