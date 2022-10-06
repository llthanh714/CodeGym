class Pokemon {
    constructor() {
        this.nextPageUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100'
        this.prePageUrl = ''
        this.lstPokemons = []
    }
    async getPokemons(url) {
        const respones = await axios.get(url, {
        })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
                return []
            })
            .finally(() => {
                console.log('Api done!')
            });
        return respones
    }
    setDataFromApi(respones) {
        let { results, next, previous } = respones.data
        this.nextPageUrl = next
        this.prePageUrl = previous
        this.lstPokemons = results
        this.showPokemonsToTable()
    }
    showPokemonsToTable() {
        let htmls = ''
        this.lstPokemons.forEach((poke, index) => {
            htmls += `<tr>
                <td>${index + 1}</td>
                <td>${poke.name}</td>
                <td><a href="${poke.url}">Detail</a></td>
            </tr>`
        })
        document.getElementById("poke-table").innerHTML = htmls
    }
    init() {
        this.getPokemons(this.nextPageUrl).then(respones => this.setDataFromApi(respones))
    }
};

const poke = new Pokemon()
poke.init()