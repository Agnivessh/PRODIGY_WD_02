class Stopwatch {
    constructor() {
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapList = document.getElementById('lapList');

        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.interval = null;
        this.isRunning = false;
        this.lapCount = 1;

        this.initializeButtons();
    }

    initializeButtons() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.lap());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => this.updateTime(), 10);
            this.startBtn.disabled = true;
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
        this.startBtn.disabled = false;
    }

    reset() {
        this.pause();
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.lapCount = 1;
        this.updateDisplay();
        this.lapList.innerHTML = '';
    }

    lap() {
        if (this.isRunning) {
            const lapTime = `${this.padNumber(this.minutes)}:${this.padNumber(this.seconds)}:${this.padNumber(this.milliseconds)}`;
            const lapItem = document.createElement('li');
            const existingLaps = this.lapList.querySelectorAll('li');
            existingLaps.forEach(existing => {
                if (existing.textContent.startsWith(`#${this.lapCount}`)) {
                    existing.remove();
                }
            });
            lapItem.textContent = `#${this.lapCount} - ${lapTime}`;
            this.lapList.insertBefore(lapItem, this.lapList.firstChild);
            this.lapCount++;
        }
    }

    updateTime() {
        this.milliseconds++;
        if (this.milliseconds === 100) {
            this.milliseconds = 0;
            this.seconds++;
            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.minutesElement.textContent = this.padNumber(this.minutes);
        this.secondsElement.textContent = this.padNumber(this.seconds);
        this.millisecondsElement.textContent = this.padNumber(this.milliseconds);
    }

    padNumber(number) {
        return number.toString().padStart(2, '0');
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
});
