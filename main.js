// Menu

const menu = document.querySelector('.menu')
const menuBar = document.querySelector('.menu-bar')
const menuScreen =  document.querySelector('.menu-screen')

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    menuScreen.classList.toggle('visible')
})

// News api

const contenedorNoticia = document.querySelector(".main__noticias")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'KEY',
		'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
	}
};

fetch('https://free-news.p.rapidapi.com/v1/search?q=Elon%20Musk&lang=en', options)
	.then(response => response.json())
    .then(response => {
        console.log(response.articles)
        for (articulo in response.articles) {
            const noticia = document.createElement("div")
            noticia.classList.add('main__noticias--noticia')
            contenedorNoticia.appendChild(noticia)

            const imagen = document.createElement("img")
            imagen.src = response.articles[articulo].media
            imagen.setAttribute("loading", "lazy")
            noticia.appendChild(imagen)

            const titulo = document.createElement("h4")
            titulo.textContent = response.articles[articulo].title
            noticia.appendChild(titulo)

            const autores = document.createElement("p")
            autores.textContent = response.articles[articulo].authors
            autores.classList.add('main__noticias--noticia__authors')
            noticia.appendChild(autores)

            const fecha = document.createElement("p")
            fecha.textContent = response.articles[articulo].published_date
            fecha.classList.add('main__noticias--noticia__date')
            noticia.appendChild(fecha)

            const resumen = document.createElement("p")
            resumen.textContent = response.articles[articulo].summary
            resumen.classList.add('main__noticias--noticia__summary')
            noticia.appendChild(resumen)

            let url = (response.articles[articulo].link)
            noticia.addEventListener('click', () => {
                window.open(url)
            })
        }
    })
	.catch(err => console.error(err));
