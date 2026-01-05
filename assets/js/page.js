document.addEventListener('DOMContentLoaded', () => {
    const fallback = document.getElementById('fallback');
    const opening = document.getElementById('opening');
    const countdownEl = document.getElementById('countdown');
    const tagsField = document.getElementById('tagsField');
    const copyBtn = document.getElementById('copyTags');
    const toast = document.getElementById('toast');
    const openLink = document.getElementById('open');

    const params = new URLSearchParams(window.location.search);
    const tags = params.get('tags') || '';
    if (tagsField) {
        tagsField.value = tags.replace(/\+/g, ' ');
    }
    if (openLink && tags) {
        openLink.href = `r34downloader://open?tags=${encodeURIComponent(tags)}`;
    }

    copyBtn?.addEventListener('click', () => {
        if (!tagsField.value) return;
        navigator.clipboard.writeText(tagsField.value).then(() => {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }).catch(() => {
            tagsField.select();
            document.execCommand('copy');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        });
    });

    // 3) Пытаемся открыть приложение сразу
    if (openLink) {
        window.location.href = openLink.href;
    }

    setTimeout(() => {
        opening.classList.add('hidden');
        fallback.classList.remove('hidden');

        let remaining = 5;
        countdownEl.textContent = remaining.toString();

        const intervalId = setInterval(() => {
            remaining -= 1;
            countdownEl.textContent = remaining.toString();

            if (remaining <= 0) {
                clearInterval(intervalId);
                window.close();
            }
        }, 1000);
    }, 1200);
});
