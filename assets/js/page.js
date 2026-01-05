const params = new URLSearchParams(window.location.search);
const deeplink = "r34downloader://open?" + params.toString();
window.location.href = deeplink;

setTimeout(() => {
    document.getElementById("open").href = deeplink;
    document.getElementById("opening").classList.add("hidden");
    document.getElementById("fallback").classList.remove("hidden");
}, 2000);

const tagsField = document.getElementById('tagsField');
const copyBtn = document.getElementById('copyTags');
const toast = document.getElementById('toast');

const showToast = () => {
    toast.classList.add('toast-show');
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 1800);
}

const copyTags = async () => {
    const text = tagsField.value;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            tagsField.select();
            document.execCommand('copy');
        }
        showToast();
    } catch (e) {
        showToast();
    }
}

tagsField.addEventListener('click', copyTags);
copyBtn.addEventListener('click', copyTags);
