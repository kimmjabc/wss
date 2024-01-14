let selectedKeywords = [];

// 이미지 클릭 이벤트 리스너
document.querySelectorAll('#image-container img').forEach(img => {
    img.addEventListener('click', function() {
        this.classList.toggle('selected');
        updateCommonKeywords();
    });
});

// 공통 키워드 업데이트 함수
function updateCommonKeywords() {
    const allSelectedImages = document.querySelectorAll('#image-container img.selected');
    const allKeywords = Array.from(allSelectedImages).map(img => img.dataset.keywords.split(','));

    if (allKeywords.length === 0) {
        selectedKeywords = [];
    } else if (allKeywords.length === 1) {
        selectedKeywords = allKeywords[0];
    } else {
        // 모든 선택된 이미지의 키워드 배열에서 최소 2개 이상의 이미지에 공통으로 나타나는 키워드 찾기
        const keywordCounts = {};
        allKeywords.flat().forEach(keyword => {
            keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });
        selectedKeywords = Object.keys(keywordCounts).filter(keyword => keywordCounts[keyword] >= 2);
    }
}

// 결과 보기 버튼 이벤트 리스너
document.getElementById('result-btn').addEventListener('click', function() {
    const resultText = findCommonKeywords();
    document.getElementById('result').textContent = resultText;
    document.getElementById('additionalText').style.display = 'none';
    document.getElementById('more-btn').style.display = 'block';
});

// 공통 키워드 찾기 함수
function findCommonKeywords() {
    if (selectedKeywords.length > 0) {
        return '당신의 웹툰/웹소설 독서태그는 : ' + selectedKeywords.join(', ');
    } else if (document.querySelectorAll('#image-container img.selected').length > 0) {
        return '"판단불가! 여러 장르를 선호하시는군요!"';
    } else {
        return '"앗, 아직 작품 선택을 안했어요!"';
    }
}

// "더 하러 가기" 버튼 이벤트 리스너
document.getElementById('more-btn').addEventListener('click', function() {
    window.location.href = 'https://walla.my/wss-survey';
});

// 다시 하기 버튼 이벤트 리스너
document.getElementById('reset-btn').addEventListener('click', function() {
    // 모든 이미지의 선택 상태 초기화
    document.querySelectorAll('#image-container img.selected').forEach(img => {
        img.classList.remove('selected');
    });

    // 결과 텍스트 및 추가된 텍스트와 버튼 숨기기
    document.getElementById('result').textContent = '';
    document.getElementById('additionalText').style.display = 'none';

    // 선택된 키워드 초기화
    selectedKeywords = [];
});

// 공통 키워드 찾기 이벤트 리스터 (수정)
function updateCommonKeywords() {
    const allSelectedImages = document.querySelectorAll('#image-container img.selected');
    const allKeywords = Array.from(allSelectedImages).map(img => img.dataset.keywords.split(','));

    const keywordCounts = {};
    allKeywords.flat().forEach(keyword => {
        const trimmedKeyword = keyword.trim();
        keywordCounts[trimmedKeyword] = (keywordCounts[trimmedKeyword] || 0) + 1;
    });

    selectedKeywords = Object.keys(keywordCounts)
                              .sort((a, b) => keywordCounts[b] - keywordCounts[a]) // 가장 많이 출현한 키워드 순으로 정렬
                              .slice(0, 6); // 상위 6개 키워드만 선택
}
