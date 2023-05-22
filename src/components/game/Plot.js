import { Box, Grid} from '@mui/material';

import { cropsList, rarityList } from '../../data/CropsList';

// Cette fonction permet de générer une liste de crops avec leur couleur
// Chaque couleur correspond à une rareté il même correspond à un nombre de crops
// Par exemple, si on a qty = 12, on aura 2 crops de rareté uncommon (5) et 2 crops de rareté common (1)
function generateCropsRarityList(cropsList, rarityList) {
    const cropsRarityList = [];
  
    for (const crop of cropsList) {
        let cropQty = crop.qty;
        const cropName = crop.name;
        const cropImgName = crop.imgName;
        
        for (const rarity of rarityList.sort((a, b) => b.equality - a.equality)) {
            const rarityColor = rarity.color;
            const rarityEquality = rarity.equality;
            while(cropQty - rarityEquality >= 0) {
                cropsRarityList.push({
                    name: cropName,
                    imgName: cropImgName,
                    color: rarityColor
                });
                cropQty -= rarityEquality;
            }
        }
    }
    // Ici, on retourne la liste des crops avec leur couleur (triée par rareté)
    return cropsRarityList.sort((a, b) => {
        const rarityA = rarityList.find(rarity => rarity.color === a.color);
        const rarityB = rarityList.find(rarity => rarity.color === b.color);
        return rarityB.equality - rarityA.equality;
    });
}

export default function Plot({gameInfo, setGameInfo}) {

    return (
        <div>
        <Grid container spacing={5} justifyContent="center">
            {generateCropsRarityList(cropsList, rarityList).map((crop, index) => (
                <Grid item key={index}>
                    <Box 
                    style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex',
                        padding: '10px'
                    }} 
                    onMouseEnter={() => {
                        const newGameInfo = {
                            message: `Coût d'amélioration: ${crop.name} !`,
                        };
                        setGameInfo(newGameInfo);
                    }}
                    onMouseLeave={() => {
                        const newGameInfo = {};
                        setGameInfo(newGameInfo);
                    }}
                    >
                        <img
                            height={64}
                            width={64}
                            src={require(`../../assets/uniqueCrops/${crop.imgName}1.png`)}
                            alt={crop.name}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: `2px solid ${crop.color}`,
                                borderRadius: '10%',
                            }}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
        </div>
    );
}

/*
export default function Plot() {

    return (
        <div>
        <Grid container spacing={5}>
            {cropsList.map((crop, index) => (
            <Grid item key={index}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                    height={64}
                    width={64}
                    src={require(`../assets/uniqueCrops/${crop.imgName}1.png`)}
                    alt={crop.name}
                />
                {rarityList.map((rarity, rarityIndex) => (
                    <div
                        key={rarityIndex}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: `2px solid ${colorBorder(crop.qty)}`,
                            borderRadius: '10%',
                            pointerEvents: 'none',
                            zIndex: rarityList.length - rarityIndex,
                        }}
                    />
                ))}
                </div>
            </Grid>
            ))}
        </Grid>
        </div>
    );
}*/