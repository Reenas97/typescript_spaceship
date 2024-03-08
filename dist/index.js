var spaceshipsTotal = [];
var options = "";
do {
    options = prompt("\n        O que deseja fazer?\n        1. Cadastrar Nave\n        2. Adicionar um membro \u00E0 tripula\u00E7\u00E3o de uma nave\n        3. Enviar uma nave em uma miss\u00E3o\n        4. Listar todas as naves\n        5. Sair \n    ");
    switch (options) {
        case "1":
            var spaceshipName = prompt("Qual o nome da nave?");
            var spaceshipPilot = prompt("Qual o nome do piloto?");
            var spaceshipCrewLimit = +prompt("Qual o n\u00FAmero m\u00E1ximo de tripulantes?");
            saveSpaceship(spaceshipName, spaceshipPilot, spaceshipCrewLimit);
            break;
        case "2":
            if (spaceshipsTotal.length > 0) {
                var newCrewMember = prompt("Qual o nome do novo tripulante?");
                addcrewMember(newCrewMember);
            }
            else {
                alert("Ainda n\u00E3o h\u00E1 nenhuma nave cadastrada.");
            }
            break;
        case "3":
            if (spaceshipsTotal.length > 0) {
                sendToMission();
            }
            else {
                alert("Ainda não há nenhuma nave cadastrada.");
            }
            break;
        case "4":
            if (spaceshipsTotal.length > 0) {
                listSpaceShips();
            }
            else {
                alert("Ainda não há nenhuma nave cadastrada");
            }
            break;
    }
} while (options !== "5");
function saveSpaceship(name, pilot, crewLimit) {
    var spaceship = {
        name: name,
        pilot: pilot,
        crewLimit: crewLimit,
        crew: [],
        inMission: false
    };
    alert("Salvando...\n    Nome da Nave: ".concat(spaceship.name, "\n    Nome do Piloto: ").concat(spaceship.pilot, "\n    N\u00FAmero m\u00E1ximo de tripulantes: ").concat(spaceship.crewLimit, "\n    "));
    spaceshipsTotal.push(spaceship);
}
function addcrewMember(crewMember) {
    var spaceshipIndex = +prompt("A qual nave deseja adicionar o tripulante ".concat(crewMember, "?\nOp\u00E7\u00F5es:\n").concat(spaceshipsTotal.map(function (ship, index) { return "".concat(index + 1, ". ").concat(ship.name); }).join('\n'), "\n    ")) - 1;
    var spaceshipSelected = spaceshipsTotal[spaceshipIndex];
    if (spaceshipIndex >= 0 && spaceshipIndex < spaceshipsTotal.length) {
        if (spaceshipSelected.crew.length < spaceshipSelected.crewLimit) {
            spaceshipSelected.crew.push(crewMember);
            alert("Tripulante ".concat(crewMember, " adicionado \u00E0 nave ").concat(spaceshipSelected.name, " com sucesso!"));
        }
        else {
            alert("O tamanho m\u00E1ximo de tripulantes n\u00E3o pode ser excedido!");
        }
    }
    else {
        alert("Índice de nave inválido!");
    }
}
function listSpaceShips() {
    var spaceShipList = "";
    spaceshipsTotal.forEach(function (spaceship) {
        spaceShipList +=
            "\n ===== ".concat(spaceship.name, " ========= \n Piloto: ").concat(spaceship.pilot, " \n N\u00FAmero m\u00E1ximo de tripulantes: ").concat(spaceship.crewLimit, " \n Tripula\u00E7\u00E3o: ").concat(spaceship.crew.length > 0 ? spaceship.crew.join(', ') : 'Ainda não há nenhum membro na tripulação', " \n ").concat(spaceship.inMission ? "Esta nave j\u00E1 est\u00E1 em miss\u00E3o" : "Est\u00E1 nave est\u00E1 dispon\u00EDvel para miss\u00E3o");
    });
    alert(spaceShipList);
}
function sendToMission() {
    var spaceshipToSend = +prompt("Qual nave voc\u00EA deseja enviar em miss\u00E3o? \n Op\u00E7\u00F5es: \n ".concat(spaceshipsTotal.map(function (ship, index) { return "".concat(index + 1, ". ").concat(ship.name); }).join('\n'), "\n    ")) - 1;
    var spaceshipSelected = spaceshipsTotal[spaceshipToSend];
    if (spaceshipToSend >= 0 && spaceshipToSend < spaceshipsTotal.length) {
        if (spaceshipSelected.inMission === false) {
            if (spaceshipSelected.crew.length <= Math.floor(spaceshipSelected.crewLimit / 3)) {
                alert("Para enviar a nave ".concat(spaceshipSelected.name, " em miss\u00E3o, \u00E9 preciso que pelo menos 1/3 da sua tripula\u00E7\u00E3o esteja preenchida \n N\u00FAmero m\u00E1ximo de tripulantes: ").concat(spaceshipSelected.crewLimit, " \n N\u00FAmero de tripulantes at\u00E9 agora: ").concat(spaceshipSelected.crew.length));
            }
            else {
                spaceshipSelected.inMission = true;
                alert("A nave ".concat(spaceshipSelected.name, " foi enviada em uma miss\u00E3o"));
            }
        }
        else {
            alert("A nave ".concat(spaceshipsTotal[spaceshipToSend].name, " j\u00E1 est\u00E1 em miss\u00E3o"));
        }
    }
    else {
        alert("Índice de nave inválido!");
    }
}
