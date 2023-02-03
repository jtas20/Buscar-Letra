function translateLyric(artist, songTitle){
    const btnTranlate = document.querySelector('#btn_trans');
    btnTranlate.addEventListener('click', function (){
        
        const apiVagalume = 'https://api.vagalume.com.br/search.php?'
        const apiKey = '28cb27e6d6a282e7ae827b052e4ab2b4'

        fetch(`${apiVagalume}art=${artist}&mus=${songTitle}&apikey=${apiKey}`)
            .then(response => {
                return response.json()
            }).then(responseApi =>{
                const translate = responseApi.mus[0].translate[0].text.replace(/(\r\n|\r|\n)/g, '<br>');
                const songsContainer = document.querySelector('#songs-container');

                songsContainer.innerHTML = `
                    <li class="lyrics-container">
                        <h2><strong>${songTitle}</strong> - ${artist}</h2>
                        <p class="lyrics">${translate}</p>
                    </li>
                `

                const prevAndNextContainer = document.querySelector("#prev-and-next-container");
                prevAndNextContainer.innerHTML = `
                    <button class="btn" id='BackLyric' type="submit" onClick="BackLyric()">Original</button>
                `
                BackLyric(artist, songTitle);
            })
    })
}

function BackLyric(artist, songTitle){
    const btnBack = document.querySelector('#BackLyric');
    btnBack.addEventListener('click', function (){
        fetchLyrics(artist, songTitle)
    })
}



