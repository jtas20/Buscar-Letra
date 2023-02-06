function validation(artist, songTitle){
    showLoading();
    const apiVagalume = 'https://api.vagalume.com.br/search.php?'
    const apiKey = '28cb27e6d6a282e7ae827b052e4ab2b4'
    fetch(`${apiVagalume}art=${artist}&mus=${songTitle}&apikey=${apiKey}`)
        .then(response => {
            return response.json()
        }).then(responseApi =>{
            try{
                const translate = responseApi.mus[0].translate[0].text.replace(/(\r\n|\r|\n)/g, '<br>');
            }catch(erro){
               const transAndOriginalContainer = document.querySelector("#transAndOriginalContainer");
               transAndOriginalContainer.style.display = 'none';
            }
        
        })
        hideLoading();
}

function removeAcento(text){       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');

    return fetchSongs(text.trim())
}