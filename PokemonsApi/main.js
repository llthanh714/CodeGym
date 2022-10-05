class Pokemon {
    constructor() {
        this.nextPage = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100'
        this.prePage = null
    }
    get urlNextPage() {
        return this.nextPage
    }
    set urlNextPage(nextPage) {
        this.nextPage = nextPage
    }
    get urlPrePage() {
        return this.prePage
    }
    set urlPrePage(prePage) {
        this.prePage = prePage
    }
    async getPokemons(url) {
        await axios.get(url, {
        })
            .then(response => {
                console.log(response.data)
                return response.data
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                console.log('Done')
            });
    }
};

async function Inits(){
    let poke = new Pokemon()
    let data = await poke.getPokemons(poke.urlNextPage)
}

Inits()