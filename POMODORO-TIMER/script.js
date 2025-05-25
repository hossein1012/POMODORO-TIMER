// تعریف متغیرهای اصلی و گرفتن ارجاع به المنت‌های صفحه
let timer; // شناسه تایمر برای کنترل setInterval
let isWorking = true; // وضعیت فعلی: true یعنی در حالت کار، false یعنی در حالت استراحت
let timeLeft; // زمان باقی‌مانده به ثانیه

const timeDisplay = document.getElementById('time'); // نمایش زمان تایمر
const stageDisplay = document.getElementById('stage'); // نمایش وضعیت فعلی (کار یا استراحت)
const workDurationInput = document.getElementById('workDuration'); // ورودی مدت زمان کار
const breakDurationInput = document.getElementById('breakDuration'); // ورودی مدت زمان استراحت
const startButton = document.getElementById('startButton'); // دکمه شروع تایمر
const resetButton = document.getElementById('resetButton'); // دکمه ریست تایمر

// تابع شروع تایمر با دریافت مدت زمان به دقیقه
function startTimer(duration) {
    timeLeft = duration * 60; // تبدیل دقیقه به ثانیه
    updateDisplay(); // به‌روزرسانی نمایش زمان
    updateStage(); // به‌روزرسانی نمایش وضعیت فعلی (کار/استراحت)

    // اجرای تابع هر ثانیه یکبار
    timer = setInterval(() => {
        if (timeLeft <= 0) { // اگر زمان به پایان رسید
            clearInterval(timer); // توقف تایمر
            notifyUser(); // اطلاع‌رسانی به کاربر
            isWorking = !isWorking; // تغییر وضعیت به حالت مقابل (کار به استراحت یا بالعکس)
            // شروع مجدد تایمر با مدت زمان جدید بر اساس وضعیت فعلی
            startTimer(isWorking ? workDurationInput.value : breakDurationInput.value);
        } else {
            timeLeft--; // کاهش زمان باقی‌مانده
            updateDisplay(); // به‌روزرسانی نمایش زمان
        }
    }, 1000);
}

// تابع به‌روزرسانی نمایش زمان به صورت mm:ss
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60); // محاسبه دقیقه
    const seconds = timeLeft % 60; // محاسبه ثانیه
    // قالب‌بندی زمان با صفر پرکننده برای دو رقم
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// تابع به‌روزرسانی نمایش وضعیت فعلی (کار یا استراحت)
function updateStage() {
    stageDisplay.textContent = `${isWorking ? 'Work' : 'Break'}`; 
}

// تابع اطلاع‌رسانی به کاربر هنگام تغییر وضعیت
function notifyUser() {
    const message = isWorking ? "Time for a break!" : "Back to work!";
    alert(message); // نمایش پیام هشدار
}

// رویداد کلیک دکمه شروع تایمر
startButton.addEventListener('click', () => {
    const workDuration = parseInt(workDurationInput.value); // خواندن مدت زمان کار از ورودی
    const breakDuration = parseInt(breakDurationInput.value); // خواندن مدت زمان استراحت از ورودی
    if (isNaN(workDuration) || isNaN(breakDuration)) return; // اگر ورودی‌ها عدد نبودند، خروج

    clearInterval(timer); // توقف تایمر قبلی در صورت وجود
    startTimer(workDuration); // شروع تایمر با مدت زمان کار
});

// رویداد کلیک دکمه ریست تایمر
resetButton.addEventListener('click', () => {
    clearInterval(timer); // توقف تایمر
    timeDisplay.textContent = "25:00"; // بازنشانی نمایش زمان به مقدار پیش‌فرض
    stageDisplay.textContent = "Work"; // بازنشانی وضعیت به حالت کار
});
