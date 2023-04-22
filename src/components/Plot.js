function Plot() {
    const firstCropPrice = 10
    const secondCropPrice = 20
    const thirdCropPrice = 30
    return (
        <div>
            <h2>Parcelle</h2>
            <table border="1">
            <tr>
                <td>(0,0)</td>
                <td>(1,0)</td>
                <td>(2,0)</td>
            </tr>
            <tr>
                <td>(0,1)</td>
                <td>(1,1)</td>
                <td>(2,1)</td>
            </tr>
            <tr>
                <td>(0,2)</td>
                <td>(1,2)</td>
                <td>(2,2)</td>
            </tr>
            </table>
        </div>
    )
}

export default Plot