// Haberleri çekme
async function fetchNews() {
    const category = document.getElementById("category").value;
    const apiKey = 'yourapikey'; // NewsAPI API anahtarınızı buraya ekleyin
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            console.error('API Hatası:', data.message);
        }
    } catch (error) {
        console.error('Hata:', error);
    }
}

// Haberleri listeleme
function displayNews(articles) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ''; // Eski haberleri temizle

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'bg-white rounded-lg shadow-md overflow-hidden';

        newsItem.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="Haber Resmi" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">${article.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${article.description || "Açıklama mevcut değil."}</p>
                <small class="block text-gray-500">Yayınlanma Tarihi: ${new Date(article.publishedAt).toLocaleDateString()}</small>
                <a href="${article.url}" target="_blank" class="text-blue-500 text-sm font-medium mt-2 block">Haberi Oku</a>
            </div>
        `;
        newsList.appendChild(newsItem);
    });
}

// Sayfa yüklendiğinde varsayılan kategoriyle haberleri getir
window.onload = fetchNews;