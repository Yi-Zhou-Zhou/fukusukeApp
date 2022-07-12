// A partir de un conjunto, encuentra la id mas alta y retorna el siguiente número entero
// @param { array } collection: Conjunto con elementos que tienen el campo id
// @return { int } nueva id generada a partir del conjunto

const naiveGenerateId = (collection) => {
    const lastId = Math.max(collection.map(element => element.id))

    return(lastId + 1)
}

export default naiveGenerateId