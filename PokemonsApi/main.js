class Pokemon {
    constructor() {
        this.offset = 0
        this.limit = 100
        this.nextPageUrl = ''
        this.prePageUrl = ''
        this.lstPokemons = []
        this.pokesTable = document.getElementById("poke-table")
        this.preBtn = document.getElementById("pre-link")
        this.nextBtn = document.getElementById("next-link")
        this.loader = document.getElementById("loader")
    }
    async getPokemons() {
        this.loader.style.display = "block";
        const respones = await axios.get('https://pokeapi.co/api/v2/pokemon', {
            params: {
                limit: this.limit,
                offset: this.offset
            }
        })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
                return []
            })
            .finally(() => {
                this.loader.style.display = "none";
            });
        return respones
    }
    setDataFromApi(respones) {
        let { results, next, previous } = respones.data
        this.nextPageUrl = next
        this.prePageUrl = previous
        this.lstPokemons = results
        this.showPokemonsToTable()

        if (this.nextPageUrl == null){
            this.nextBtn.parentElement.classList.add('disabled')
        }
        else{
            this.nextBtn.parentElement.classList.remove('disabled')
        }
        if (this.prePageUrl == null){
            this.preBtn.parentElement.classList.add('disabled')
        }
        else{
            this.preBtn.parentElement.classList.remove('disabled')
        }
    }
    showPokemonsToTable() {
        let htmls = ''
        document.getElementById("poke-table").innerHTML = htmls
        this.lstPokemons.forEach((poke, index) => {
            htmls += `<tr>
                <td>${(this.offset + index + 1)}</td>
                <td>${poke.name}</td>
                <td><a href="${poke.url}">Detail</a></td>
            </tr>`
        })
        this.pokesTable.innerHTML = htmls
    }
    pageNavigation() {
        this.nextBtn.onclick = () => {
            this.offset += this.limit
            this.getPokemons(this.offset)
                .then(respones => this.setDataFromApi(respones))
        }
        this.preBtn.onclick = () => {
            this.offset -= this.limit
            this.getPokemons(this.offset)
                .then(respones => this.setDataFromApi(respones))
        }
    }
    init() {
        this.getPokemons(this.offset)
            .then(respones => this.setDataFromApi(respones))
        this.pageNavigation()
    }
};

const poke = new Pokemon()
poke.init()