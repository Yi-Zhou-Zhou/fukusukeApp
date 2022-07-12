// Retorna un entero separado por puntos en grupos de a 3
// @param { int } price: El número a separar
// @return { string } price separado por puntos
const stringifyPrice = (price) => {

    const stringifiedPrice = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'CLP' }).format(price)

    return(stringifiedPrice)
}

export default stringifyPrice