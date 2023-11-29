let selectedKeywords = [];

document.querySelectorAll('#image-container img').forEach(img => {
    img.addEventListener('click', function() {
        this.classList.toggle('selected');
        updateKeywords(this.dataset.keywords.split(','));
    });
});

document.getElementById('result-btn').addEventListener('click', function() {
    document.getElementById('result').textContent = '선택된 키워드: ' + findCommonKeywords();
});

function updateKeywords(keywords) {
    selectedKeywords = selectedKeywords.length === 0 ? keywords : selectedKeywords.filter(value => keywords.includes(value));
}

function findCommonKeywords() {
    return selectedKeywords.join(', ');
}


document.querySelectorAll('#image-container img').forEach(img => {
    img.addEventListener('click', function() {
        this.classList.toggle('selected'); // 이 부분이 이미지에 'selected' 클래스를 토글합니다.
        updateKeywords(this.dataset.keywords.split(','));
    });
});
