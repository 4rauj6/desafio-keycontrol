function goToMainMenu(){
    const homepage = document.querySelector('.homepage');
    const mainFormPage = document.querySelector('.sign-credantials');
    const formTable = document.querySelector('.itens-list');
    
    if(homepage.style.display === '' || homepage.style.display === 'flex'){
        homepage.style.display = 'none';
        mainFormPage.style.display = 'flex';
        formTable.style.display = 'block';
    } else {
        homepage.style.display = 'flex';
        mainFormPage.style.display = 'none';
        formTable.style.display = 'none';
    }
}

function saveForm(event) {
    event.preventDefault();

    const responsavelInput = document.getElementById('actual-owner').value.trim();
    const setorInput = document.getElementById('sector').value.trim();
    const roomInput = document.getElementById('room').value.trim();
    const workPeriods = document.querySelector('input[name="work-periods"]:checked')?.value || '';
    const time1 = document.getElementById('timer').value;
    const time2 = document.getElementById('timer2').value;
    const table = document.getElementById('table').getElementsByTagName('tbody')[0];

    if(!responsavelInput || !setorInput || !roomInput || !workPeriods || !time1 || !time2){
        alert('Preencha toda a tabela corretamente');

        return;
    }

    const tableNewLine = table.insertRow();

    tableNewLine.insertCell(0).textContent = responsavelInput;
    tableNewLine.insertCell(1).textContent = setorInput;
    tableNewLine.insertCell(2).textContent = roomInput;
    tableNewLine.insertCell(3).textContent = workPeriods;
    tableNewLine.insertCell(4).textContent = time1;
    tableNewLine.insertCell(5).textContent = time2;

    const listCall = {
        owner: responsavelInput,
        sector: setorInput,
        room: roomInput,
        workTime: workPeriods,
        timeGo: time1,
        timeBack: time2
    };

    const listSaved = JSON.parse(localStorage.getItem('keyControlDatas')) || [];

    listSaved.push(listCall);

    localStorage.setItem('keyControlDatas', JSON.stringify(listSaved));
    
    const refrash = tableNewLine.insertCell(6);
    const deleteItensFromList = document.createElement('button');
    deleteItensFromList.innerText = 'Remover';

    deleteItensFromList.addEventListener('click', function () {
        tableNewLine.remove();

        const currentSavedList = JSON.parse(localStorage.getItem('keyControlDatas')) || [];

        const updatedList = currentSavedList.filter(item => 
            !(
                item.owner === listCall.owner && 
                item.timeGo === listCall.timeGo &&
                item.timeBack === listCall.timeBack && 
                item.room === listCall.room)
        );
        localStorage.setItem('keyControlDatas', JSON.stringify(updatedList));
    });

    refrash.appendChild(deleteItensFromList);

    alert('Os dados foram cadastrados e salvos com sucesso!');
    document.querySelector('form').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedCredantials = JSON.parse(localStorage.getItem('keyControlDatas')) || [];
    const tableToLoad = document.getElementById('table').getElementsByTagName('tbody')[0];

    function isListEmpty() {
        if(tableToLoad.rows.length === 0) {
            const noDataMessage = tableToLoad.insertRow();
            noDataMessage.className = 'no-message-alert';

            const emptyCell = noDataMessage.insertCell(0);
            emptyCell.textContent = 'Nenhum dado cadastrado no momento.';
            emptyCell.colSpan = 20;
            emptyCell.style.textAlign = 'center';
            emptyCell.style.color = 'purple';
            emptyCell.style.padding = '30px';
            emptyCell.style.fontFamily = 'Cabin';
        }
    }

    if(savedCredantials.length > 0) {
        savedCredantials.forEach((credantials, index) => {
            const allNewTable = tableToLoad.insertRow();
    
            allNewTable.insertCell(0).textContent = credantials.owner;
            allNewTable.insertCell(1).textContent = credantials.sector;
            allNewTable.insertCell(2).textContent = credantials.room;
            allNewTable.insertCell(3).textContent = credantials.workTime;
            allNewTable.insertCell(4).textContent = credantials.timeGo;
            allNewTable.insertCell(5).textContent = credantials.timeBack;
    
            const refrash = allNewTable.insertCell(6);
            const deleteItensFromList = document.createElement('button');
            deleteItensFromList.innerText = 'Remover';
    
            deleteItensFromList.addEventListener('click', function () {
                allNewTable.remove();
    
                const currentSavedList = JSON.parse(localStorage.getItem('keyControlDatas')) || [];
                currentSavedList.splice(index, 1);
                localStorage.setItem('keyControlDatas', JSON.stringify(currentSavedList));

                isListEmpty();
                
            });
            refrash.appendChild(deleteItensFromList);
        });
    } else {
        isListEmpty();
    }
});