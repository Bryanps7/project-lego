const access_level = window.localStorage.getItem('tipo')

if(access_level !== 'ADMIN') {
    alert('Você não tem permissão para permanecer nessa página!')
    window.location.href = './index.html'
}