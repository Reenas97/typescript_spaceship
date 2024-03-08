let spaceshipsTotal = []

let options:string = ""

do{
    options = prompt(`
        O que deseja fazer?
        1. Cadastrar Nave
        2. Adicionar um membro à tripulação de uma nave
        3. Enviar uma nave em uma missão
        4. Listar todas as naves
        5. Sair 
    `)
    switch(options){
        case "1": 
            const spaceshipName = prompt(`Qual o nome da nave?`)
            const spaceshipPilot = prompt(`Qual o nome do piloto?`)
            const spaceshipCrewLimit = +prompt(`Qual o número máximo de tripulantes?`)
            saveSpaceship(spaceshipName, spaceshipPilot, spaceshipCrewLimit)
        break
        case "2": 
            if(spaceshipsTotal.length > 0){
                const newCrewMember = prompt(`Qual o nome do novo tripulante?`)
                addcrewMember(newCrewMember)
            } else{
                alert(`Ainda não há nenhuma nave cadastrada.`)
            }
        break
        case "3": 
            if(spaceshipsTotal.length > 0){
                sendToMission()
            } else{
                alert("Ainda não há nenhuma nave cadastrada.")
            }
        break
        case "4":
            if(spaceshipsTotal.length > 0){
                listSpaceShips()
            } else{
                alert("Ainda não há nenhuma nave cadastrada")
            }
        break
    }
} while(options !== "5")

function saveSpaceship(name:string, pilot: string, crewLimit: number) {
    const spaceship = {
        name,
        pilot, 
        crewLimit,
        crew: [],
        inMission: false
    }

    alert(
    `Salvando...
    Nome da Nave: ${spaceship.name}
    Nome do Piloto: ${spaceship.pilot}
    Número máximo de tripulantes: ${spaceship.crewLimit}
    `
    )

    spaceshipsTotal.push(spaceship)
    
}

function addcrewMember(crewMember:string) {
    const spaceshipIndex = +prompt(
    `A qual nave deseja adicionar o tripulante ${crewMember}?\nOpções:\n${spaceshipsTotal.map((ship, index) => `${index + 1}. ${ship.name}`).join('\n')}
    `) - 1
    const spaceshipSelected = spaceshipsTotal[spaceshipIndex]
    if (spaceshipIndex >= 0 && spaceshipIndex < spaceshipsTotal.length) {
        if (spaceshipSelected.crew.length < spaceshipSelected.crewLimit) {
            spaceshipSelected.crew.push(crewMember);
            alert(`Tripulante ${crewMember} adicionado à nave ${spaceshipSelected.name} com sucesso!`);
        } else {
            alert(`O tamanho máximo de tripulantes não pode ser excedido!`)
        }
    } else {
        alert("Índice de nave inválido!");
    }
}

function listSpaceShips(){
    let spaceShipList:string = ""
    spaceshipsTotal.forEach((spaceship) => {
        spaceShipList += 
        `\n ===== ${spaceship.name} ========= \n Piloto: ${spaceship.pilot} \n Número máximo de tripulantes: ${spaceship.crewLimit} \n Tripulação: ${spaceship.crew.length > 0 ? spaceship.crew.join(', ') : 'Ainda não há nenhum membro na tripulação'} \n ${spaceship.inMission ? `Esta nave já está em missão` : `Está nave está disponível para missão`}`
    })
    alert(spaceShipList)
}

function sendToMission(){
    const spaceshipToSend = +prompt(
    `Qual nave você deseja enviar em missão? \n Opções: \n ${spaceshipsTotal.map((ship, index) => `${index + 1}. ${ship.name}`).join('\n')}
    `) - 1
    const spaceshipSelected = spaceshipsTotal[spaceshipToSend]
    if (spaceshipToSend >= 0 && spaceshipToSend < spaceshipsTotal.length) {
        if (spaceshipSelected .inMission === false) {
            if (spaceshipSelected.crew.length <= Math.floor(spaceshipSelected.crewLimit / 3)) {
                alert(`Para enviar a nave ${spaceshipSelected.name} em missão, é preciso que pelo menos 1/3 da sua tripulação esteja preenchida \n Número máximo de tripulantes: ${spaceshipSelected.crewLimit} \n Número de tripulantes até agora: ${spaceshipSelected.crew.length}`)
            } else {
                spaceshipSelected.inMission = true
                alert(`A nave ${spaceshipSelected.name} foi enviada em uma missão`)
            }
        } else {
            alert(`A nave ${spaceshipsTotal[spaceshipToSend].name} já está em missão`)
        }
    }else{
        alert("Índice de nave inválido!");
    }
}