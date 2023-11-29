let selectedKeywords = [];
let allSelectedKeywords = new Set(); // 모든 선택된 키워드를 저장할 Set

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

    // 모든 선택된 키워드를 Set에 저장
    allSelectedKeywords.clear();
    allKeywords.forEach(keywords => keywords.forEach(keyword => allSelectedKeywords.add(keyword)));

    if (allKeywords.length === 0) {
        selectedKeywords = [];
    } else if (allKeywords.length === 1) {
        selectedKeywords = allKeywords[0];
    } else {
        selectedKeywords = allKeywords.reduce((common, keywords) => 
            common.filter(keyword => keywords.includes(keyword))
        );
    }
}

// 결과 보기 버튼 이벤트 리스너
document.getElementById('result-btn').addEventListener('click', function() {
    document.getElementById('result').textContent = '당신의 취향 키워드는: ' + findCommonKeywords();
    document.getElementById('additionalText').style.display = 'none'; // 추가 텍스트와 버튼 숨기기
    document.getElementById('more-btn').style.display = 'block'; // "더 하러 가기" 버튼 표시
});


// 예 버튼 이벤트 리스너
document.getElementById('yesButton').addEventListener('click', function() {
    window.location.href = 'https://www.notion.so/kimmjabc/WSS-WGWG-16e75173fd384f128395c82da2d624bd';
});

// 다시 하기 버튼 이벤트 리스너
document.getElementById('reset-btn').addEventListener('click', function() {
    // 모든 이미지의 선택 상태 초기화
    var images = document.querySelectorAll('.image');
    images.forEach(function(img) {
        img.classList.remove('selected');
    });

    // 결과 텍스트 및 추가된 텍스트와 버튼 숨기기
    document.getElementById('result').textContent = '';
    document.getElementById('additionalText').style.display = 'none';

    // 선택된 키워드 초기화
    selectedKeywords = [];
});


// "더 하러 가기" 버튼 이벤트 리스너
document.getElementById('more-btn').addEventListener('click', function() {
    window.location.href = 'https://www.notion.so/kimmjabc/f0dcabe59a6a41e3a2320641708b0107';
});


// 키워드 추가 함수
function addKeywords(keywords) {
    keywords.forEach(keyword => {
        if (!selectedKeywords.includes(keyword)) {
            selectedKeywords.push(keyword);
        }
    });
}

// 키워드 제거 함수
function removeKeywords(keywords) {
    selectedKeywords = selectedKeywords.filter(k => !keywords.includes(k));
}


// 공통 키워드 찾기 함수
function findCommonKeywords() {
    if (selectedKeywords.length > 0) {
        return selectedKeywords.join(', ');
    } else if (allSelectedKeywords.size > 0) {
        // 공통 키워드가 없을 경우, 모든 선택된 키워드를 반환
        return Array.from(allSelectedKeywords).join(', ');
    } else {
        return '"앗, 아직 작품 선택을 안했어요!"';
    }
}
