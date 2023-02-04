function showLoading(){
    var divLoading = document.getElementById('loading');
    divLoading.style.display = 'flex'; 
}

function hideLoading(){
    var divLoading = document.getElementById('loading');
    divLoading.style.display = 'none'; 
}

function hideBtn(){
    const btnSearch = document.querySelector('#btnSearch');
    btnSearch.style.backgroundColor = '#888888'
    btnSearch.textContent = 'Aguarde'
    btnSearch.disabled="true"
}

function showBtn(){
    const btnSearch = document.querySelector('#btnSearch');
    btnSearch.style.backgroundColor = '#5500ff'
    btnSearch.textContent = 'Buscar'
    btnSearch.disabled=""
}