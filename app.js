function genereerSchema() {
    const keeper1 = document.getElementById('keeper1').value; // Speler 1
    const keeper2 = document.getElementById('keeper2').value; // Speler 2
    const speler3 = document.getElementById('speler3').value;
    const speler4 = document.getElementById('speler4').value;
    const speler5 = document.getElementById('speler5').value;
    const speler6 = document.getElementById('speler6').value;
    const speler7 = document.getElementById('speler7').value;
    const speler8 = document.getElementById('speler8').value;

    const veldspelers = [speler3, speler4, speler5, speler6, speler7, speler8];

    let schema = `<h2>Wisselschema</h2>`;

    const timeBlocks = [
        "0-6 min", "6-12 min", "12-18 min", "18-24 min", 
        "24-30 min", "30-35 min", "35-40 min"
    ];

    let wissels = [];

    // Wisselpatroon voor veldspelers 3 t/m 8: 2 keer wissel per speler, 2 wissels per blok
    const wisselPatroon = [
        { speler: veldspelers[0], tijden: [0, 4] }, // Speler 3 wisselt in blokken 0-6 en 24-30
        { speler: veldspelers[1], tijden: [1, 4] }, // Speler 4 wisselt in blokken 6-12 en 24-30
        { speler: veldspelers[2], tijden: [2, 6] }, // Speler 5 wisselt in blokken 12-18 en 35-40
        { speler: veldspelers[3], tijden: [2, 5] }, // Speler 6 wisselt in blokken 12-18 en 30-35
        { speler: veldspelers[4], tijden: [3, 6] }, // Speler 7 wisselt in blokken 18-24 en 35-40
        { speler: veldspelers[5], tijden: [0, 3] }  // Speler 8 wisselt in blokken 0-6 en 18-24
    ];

    // Voeg wissel tijden toe voor elke speler
    wisselPatroon.forEach(item => {
        wissels.push({
            speler: item.speler,
            wisselBlokken: item.tijden
        });
    });

    // Regels voor de keepers
    wissels.push({
        speler: keeper1,
        wisselBlokken: [5]  // Speler 1 (keeper in 1e helft) wisselt in blok 30-35
    });
    wissels.push({
        speler: keeper2,
        wisselBlokken: [1]  // Speler 2 (keeper in 2e helft) wisselt in blok 6-12
    });

    // Eerste Helft: 0-20 minuten
    schema += `<h3>Eerste Helft (0-20 minuten)</h3>`;
    for (let i = 0; i < 4; i++) {
        schema += `<strong>${timeBlocks[i]}:</strong><br>`;
        
        // Speler 1 is keeper in de eerste helft
        schema += `Keeper: ${keeper1}<br>`;  
        
        // Speler 2 is veldspeler in de eerste helft, behalve in blok 6-12
        schema += `Veldspeler: ${keeper2}${(i === 1 ? " (wissel)" : "")}<br>`;  // Speler 2 staat wissel in 6-12

        let veldSpelersBlok = veldspelers.map(speler => {
            let wisselInfo = wissels.find(w => w.speler === speler);
            if (wisselInfo.wisselBlokken.includes(i)) {
                return `${speler} (wissel)`;
            }
            return speler;
        });

        // Voeg de veldspelers toe, met de wissels
        schema += `Veldspelers: ${veldSpelersBlok.join(', ')}<br><br>`;
    }

    // Tweede Helft: 20-40 minuten
    schema += `<h3>Tweede Helft (20-40 minuten)</h3>`;
    for (let i = 4; i < 7; i++) {
        schema += `<strong>${timeBlocks[i]}:</strong><br>`;
        
        // Speler 2 is keeper in de tweede helft
        schema += `Keeper: ${keeper2}<br>`; 
        
        // Speler 1 is veldspeler in de tweede helft, behalve in blok 30-35
        schema += `Veldspeler: ${keeper1}${(i === 5 ? " (wissel)" : "")}<br>`;  // Speler 1 staat wissel in 30-35

        let veldSpelersBlok = veldspelers.map(speler => {
            let wisselInfo = wissels.find(w => w.speler === speler);
            if (wisselInfo.wisselBlokken.includes(i)) {
                return `${speler} (wissel)`;
            }
            return speler;
        });

        // Voeg de veldspelers toe, met de wissels
        schema += `Veldspelers: ${veldSpelersBlok.join(', ')}<br><br>`;
    }

    document.getElementById('schemaResult').innerHTML = schema;
}

