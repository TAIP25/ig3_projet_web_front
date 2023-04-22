function Upgrade() {
    const firstCropPrice = 10
    const secondCropPrice = 20
    const thirdCropPrice = 30
    return (
        <div>
            <h2>Coût</h2>
            <ul>
            <li>Pomme : {firstCropPrice}€</li>
            <li>Cerise : {secondCropPrice}€</li>
            <li>Carotte : {thirdCropPrice}€</li>
            </ul>
            Améliorer directement au carotte : { firstCropPrice + secondCropPrice + thirdCropPrice }€
        </div>
    )
}

export default Upgrade