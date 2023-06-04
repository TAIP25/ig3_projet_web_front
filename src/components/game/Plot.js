import { Box, Grid, Typography } from '@mui/material';

import { rarityList } from '../../data/CropsList';

export default function Plot({ setGameInfo, click, tier, amount, equality }) {

    // Cette fonction permet de générer une liste de crops avec leur couleur
    // Chaque couleur correspond à une rareté il même correspond à un nombre de crops
    // Par exemple, si on a qty = 12, on aura 2 crops de rareté uncommon (5) et 2 crops de rareté common (1)
    function generateCropsRarityList() {
        const cropsRarityList = [];
        const cropsList = JSON.parse(localStorage.getItem('userCropsData'));
        if(cropsList === null) return null;
        for (const crop of Object.values(cropsList)) {
            let cropQty = crop.userCropQuantity;
            const cropName = crop.cropPNGName;
            const cropImgName = crop.cropPNGName;

            for (const rarity of rarityList.sort((a, b) => b.equality - a.equality)) {
                const rarityColor = rarity.color;
                const rarityEquality = rarity.equality;
                while(cropQty - rarityEquality >= 0) {
                    cropsRarityList.push({
                        name: cropName,
                        tier: crop.cropTier,
                        imgName: cropImgName,
                        color: rarityColor,
                        equality: rarityEquality
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

    return (
        <div>
        <Grid container spacing={5} justifyContent="center">
            { generateCropsRarityList() !== null
            && generateCropsRarityList().map((crop, index) => (
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
                        const cropsData = JSON.parse(localStorage.getItem('cropsData'));
                        const cropTier = cropsData.find(cropData => cropData.cropPNGName === crop.name).cropTier
                        const nextCropInfo = cropsData.find(cropData => cropTier + 1 === cropData.cropTier);
                        const newGameInfo = {
                            message: 'upgrade',
                            money: nextCropInfo.cropMoneyPrice*parseInt(crop.equality),
                            token: nextCropInfo.cropTokenPrice*parseInt(crop.equality),
                            equality: parseInt(crop.equality),
                            crop: nextCropInfo.cropPNGName,
                        };
                        setGameInfo(newGameInfo);
                    }}
                    onMouseLeave={() => {
                        const newGameInfo = {};
                        setGameInfo(newGameInfo);
                    }}
                    onClick={() => {
                        const tierActualCrop = parseInt(crop.tier);
                        const amountActualCrop = parseInt(crop.equality);
                        click(tierActualCrop, amountActualCrop);
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
                        <Typography variant="body2" sx={{ position: 'absolute', bottom: 0, right: 5 }}>
                            {crop.equality}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
        </div>
    );
}