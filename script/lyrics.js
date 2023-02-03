const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector("#prev-and-next-container");

const apiUrl = 'https://api.lyrics.ovh';

const getMoreSongs = async url => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()
    insertSongsIntoPage(data)
}

const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = (songsInfo.data.map(song => `
    <li class="song">
        <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver Letra</button>
    </li>
    `).join(''))


    if(songsInfo.prev || songsInfo.next){
        prevAndNextContainer.innerHTML = `
            ${songsInfo.prev ? `<button class="btn" onClick="getMoreSongs('${songsInfo.prev}')">Anteriores</button>` : '' }
            ${songsInfo.next ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próximas</button>` : '' }
        `
        return
    }

    prevAndNextContainer.innerHTML = ''
}

const fetchSongs = async term => {
    const response = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await response.json()

    insertSongsIntoPage(data)
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const searchTerm = searchInput.value.trim()

    if(!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">Por Favor, Digite Um Termo Válido.</li>`
        return
    }

    fetchSongs(searchTerm)
});

const apiVagalume = 'https://api.vagalume.com.br/search.php?'
const apiKey = '28cb27e6d6a282e7ae827b052e4ab2b4'

const fetchLyrics = async (artist, songTitle) => {
    const response = await fetch(`${apiVagalume}art=${artist}&mus=${songTitle}&apikey=${apiKey}`)
    const data = await response.json()
    const lyric = data.mus[0].text.replace(/(\r\n|\r|\n)/g, '<br>');

    songsContainer.innerHTML = `
        <li class="lyrics-container">
            <h2><strong>${songTitle}</strong> - ${artist}</h2>
            <p class="lyrics">${lyric}</p>
        </li>
    `

    prevAndNextContainer.innerHTML = `
        <button class="btn" type="submit" id="btn_trans" onclick="translateLyric()">Traduzir</button>
    `
    translateLyric(artist, songTitle)
}

songsContainer.addEventListener('click', event => {
    const clickedElement = event.target

    if(clickedElement.tagName === 'BUTTON'){
       const artist = clickedElement.getAttribute('data-artist')
       const songTitle = clickedElement.getAttribute('data-song-title')


       prevAndNextContainer.innerHTML = ''
       fetchLyrics(artist, songTitle)
    }
})