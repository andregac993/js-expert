class Service {

    async makeRequest(url) {
        return (await fetch(url)).json()
    }

    async getPlanets(url) {
        const data = await this.makeRequest(url)
        const planets = data.result.properties
        return {
            name: planets.name,
            surfaceWater: planets.surface_water,
        }
    }
}

module.exports = Service