document.addEventListener('DOMContentLoaded', () => {
    const fallback = document.getElementById('fallback');
    const opening = document.getElementById('opening');
    const countdownEl = document.getElementById('countdown');
    const tagsField = document.getElementById('tagsField');
    const copyBtn = document.getElementById('copyTags');
    const toast = document.getElementById('toast');
    const openLink = document.getElementById('open');

    // 1) Парсим теги из query (?tags=...)
    const params = new URLSearchParams(window.location.search);
    const tags = params.get('tags') || '';
    if (tagsField) {
        tagsField.value = tags.replace(/\+/g, ' ');
    }
    if (openLink && tags) {
        openLink.href = `r34downloader://open?tags=${encodeURIComponent(tags)}`;
    }

    // 2) Копирование тегов
    copyBtn?.addEventListener('click', () => {
        if (!tagsField.value) return;

        const showToast = () => {
            toast.classList.add('toast-show');
            setTimeout(() => toast.classList.remove('toast-show'), 2000);
        };

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(tagsField.value).then(showToast).catch(() => {
                tagsField.select();
                document.execCommand('copy');
                showToast();
            });
        } else {
            tagsField.select();
            document.execCommand('copy');
            showToast();
        }
    });

    // 3) Пытаемся открыть приложение сразу
    if (openLink) {
        window.location.href = openLink.href;
    }

    // 4) Ждём 1.2 секунды, показываем fallback и запускаем слайд-таймер
    setTimeout(() => {
        opening.classList.add('hidden');
        fallback.classList.remove('hidden');

        let remaining = 5;
        countdownEl.textContent = remaining.toString();

        const intervalId = setInterval(() => {
            remaining -= 1;
            countdownEl.textContent = remaining.toString();

            // перезапуск анимации "слайдом вверх"
            countdownEl.classList.remove('countdown-slide');
            // форсим reflow, чтобы анимация сработала снова
            void countdownEl.offsetWidth;
            countdownEl.classList.add('countdown-slide');

            if (remaining <= 0) {
                clearInterval(intervalId);
                window.close();
            }
        }, 1000);
    }, 1200);
});
