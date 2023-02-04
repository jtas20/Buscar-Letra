const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const transAndOriginalContainer = document.querySelector("#transAndOriginalContainer");

const apiUrl = 'https://api.lyrics.ovh';

const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = (songsInfo.data.map(song => `
    <li class="song">
        <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver Letra</button>
    </li>
    `).join(''))

    transAndOriginalContainer.style.display = 'none';

    hideLoading();
    showBtn();
}

const fetchSongs = async term => {
    const response = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await response.json()

    insertSongsIntoPage(data)
}

form.addEventListener('submit', event => {
    showLoading();
    hideBtn();

    event.preventDefault()

    const searchTerm = searchInput.value.trim()

    if(!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">Por Favor, Digite Um Termo Válido.</li>`
        showBtn();
        hideLoading();
        return
    }

    fetchSongs(searchTerm)
});

const apiVagalume = 'https://api.vagalume.com.br/search.php?'
const apiKey = '28cb27e6d6a282e7ae827b052e4ab2b4'

const fetchLyrics = async (artist, songTitle) => {
    showLoading();
    const response = await fetch(`${apiVagalume}art=${artist}&mus=${songTitle}&apikey=${apiKey}`)
    const data = await response.json()
    const lyric = data.mus[0].text.replace(/(\r\n|\r|\n)/g, '<br>');

    songsContainer.innerHTML = `
        <li class="lyrics-container">
            <h2><strong>${songTitle}</strong> - ${artist}</h2>
            <p class="lyrics">${lyric}</p>
        </li>
    `

    transAndOriginalContainer.style.display = 'flex';
    transAndOriginalContainer.innerHTML = `
        <button class="btn" type="submit" id="btn_trans" onclick="translateLyric()">Traduzir</button>
    `
    translateLyric(artist, songTitle)
    hideLoading();
}

songsContainer.addEventListener('click', event => {
    const clickedElement = event.target

    if(clickedElement.tagName === 'BUTTON'){
       const artist = clickedElement.getAttribute('data-artist')
       const songTitle = clickedElement.getAttribute('data-song-title')

       transAndOriginalContainer.innerHTML = ''
       fetchLyrics(artist, songTitle)
    }
})