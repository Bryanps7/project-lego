function loadComponent(file, position) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const elements = doc.body.childNodes;

            elements.forEach(element => {
                if (element.tagName && element.tagName.toLowerCase() === 'style') {
                    // Coloca <style> no <head>
                    document.head.appendChild(element.cloneNode(true));
                } else {
                    // Coloca outros elementos no body
                    if (position === 'header') {
                        document.body.insertBefore(element.cloneNode(true), document.body.firstChild);
                    } else if (position === 'footer') {
                        document.body.appendChild(element.cloneNode(true));
                    }
                }
            });
        })
        .catch(error => console.error('Erro ao carregar componente:', error));
}

function loadHead(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            doc.head.childNodes.forEach(element => {
                if (element.tagName) {
                    if (element.tagName.toLowerCase() === 'script') {
                        // Recria o script para executar
                        const script = document.createElement('script');
                        if (element.src) {
                            script.src = element.src;
                            script.defer = element.defer || false;
                        } else {
                            script.textContent = element.textContent;
                        }
                        document.head.appendChild(script);
                    } else {
                        // Adiciona qualquer outra tag normalmente
                        document.head.appendChild(element.cloneNode(true));
                    }
                }
            });
        })
        .catch(error => console.error('Erro ao carregar head:', error));
}


// Carregar Header e Footer
loadComponent("../components/header.html", "header");
loadComponent("../components/footer.html", "footer");
loadHead('../components/head.html');