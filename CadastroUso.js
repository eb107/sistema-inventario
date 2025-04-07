function adicionarItem() {

        const itemName = "cpu"; // Substitua pelo nome desejado
    
        // Obter a tabela do inventário
        const inventoryTable = document.getElementById('inventoryTable');
    
        // Verificar se o item já existe na tabela
        let itemExists = false;
        for (let i = 1; i < inventoryTable.rows.length; i++) { // Começar do índice 1 para ignorar o cabeçalho
            const row = inventoryTable.rows[i];
            const cell = row.cells[0];
    
            if (cell.textContent === itemName) {
                // Se o item já existe, incrementar a quantidade
                const quantityCell = row.cells[1];
                quantityCell.textContent = parseInt(quantityCell.textContent) + 1; // Incrementar a quantidade
                itemExists = true;
                break;
            }
        }
    
        // Se o item não existe, adicionar uma nova linha
        if (!itemExists) {
            const newRow = inventoryTable.insertRow(-1); // Adicionar no final da tabela
    
            // Adicionar células para a nova linha
            const newCell = newRow.insertCell(0);
            const quantityCell = newRow.insertCell(1);
    
            newCell.textContent = itemName; // Adicionar o nome do ítem na célula
            quantityCell.textContent = '1'; // Adicionar a quantidade do ítem na célula
        }    

    itemName.value = '';
    
    
}