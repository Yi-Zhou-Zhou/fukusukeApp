// Retorna un entero separado por puntos en grupos de a 3
// @param { int } price: El número a separar
// @return { string } price separado por puntos
const stringifyPrice = (price) => {
    return(
        price.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g).join(".")        
    )
}

export default stringifyPrice