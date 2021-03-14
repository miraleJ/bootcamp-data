async function presentTableOfInfo(b, table) {
    for (let i = 0; i < b.personList.length; i++) {
        const person = b.personList[i];
        const newRow = document.createElement('tr');
        newRow.className = `row-${i}`;
        newRow.innerHTML = `<th class='id row-${i}'>${person.id}</th>
                            <th class='firstName row-${i}'>${person.firstName}</th>
                            <th class='lastName row-${i}'>${person.lastName}</th>
                            <th class='capsule row-${i}'>${person.capsule}</th>
                            <th class='age row-${i}'>${person.age}</th>
                            <th class='city row-${i}'>${person.city}</th>
                            <th class='gender row-${i}'>${person.gender}</th>
                            <th class='hobby row-${i}'>${person.hobby}</th>
                            <th class='options row-${i}'>
                                <button class='del'>
                                    delete
                                </button>
                                <button class='edit'>
                                    edit
                                </button>
                            </th>
                            `
        table.appendChild(newRow);
    }
}

function deleteRow(targetDiv, b) {
    // send remove on the id of the row
    b.remove(parseInt(targetDiv.parentElement.classList[1].split('-')[1]));
    // delete element from the DOM
    targetDiv.parentElement.parentElement.remove();
}

function editRowButton(targetDiv, b, rowsInEditMode) {
    const i = parseInt(targetDiv.parentElement.classList[1].split('-')[1]);
    const person = b.personList.find((p) => p.id === i);
    // change the row to text areas
    targetDiv.parentElement.parentElement.innerHTML =
    `
    <th class='id row-${i}'>${person.id}</th>
    <th class='editable firstName row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.firstName}</textarea></th>
    <th class='editable lastName row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.lastName}</textarea></th>
    <th class='editable capsule row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.capsule}</textarea></th>
    <th class='editable age row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.age}</textarea></th>
    <th class='editable city row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.city}</textarea></th>
    <th class='editable gender row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.gender}</textarea></th>
    <th class='editable hobby row-${i}'><textarea wrap="soft" name="add-task" id="add-task" cols="8" rows="1">${person.hobby}</textarea></th>
    <th class='editable options row-${i}'>
        <button class='conf'>
            confirm
        </button>
        <button class='undo'>
            undo
        </button>
    </th>
    `;

    rowsInEditMode.push(`row-${i}`);
}

 function confirmEditing(rowDiv, b, rowsInEditMode) {
    // take all the texts from the text boxes, save in the object
    const rowNum = parseInt(rowDiv.className.split('-')[1]);
    const personI = b.personList.findIndex(p => p.id === rowNum)
    const personKeys = Object.keys(b.personList[personI]);
    for (let i = 1; i < 8; i++) {
        b.personList[personI][personKeys[i]] = rowDiv.children[i].firstElementChild.value;
    }
    // change the textboxes to normal text again and the buttons to del & edit
    rowDiv.innerHTML =
        `<th class='id row-${rowNum}'>${b.personList[personI].id}</th>
        <th class='firstName row-${rowNum}'>${b.personList[personI].firstName}</th>
        <th class='lastName row-${rowNum}'>${b.personList[personI].lastName}</th>
        <th class='capsule row-${rowNum}'>${b.personList[personI].capsule}</th>
        <th class='age row-${rowNum}'>${b.personList[personI].age}</th>
        <th class='city row-${rowNum}'>${b.personList[personI].city}</th>
        <th class='gender row-${rowNum}'>${b.personList[personI].gender}</th>
        <th class='hobby row-${rowNum}'>${b.personList[personI].hobby}</th>
        <th class='options row-${rowNum}'>
            <button class=del>
                delete
            </button>
            <button class=edit>
                edit
            </button>
        </th>
        `
    // remove the row from the edited rows
    const j = rowsInEditMode.indexOf(`row-${rowNum}`);
    rowsInEditMode.splice(j, 1);
}

function undoEdit(rowDiv, b, rowsInEditMode) {
    const rowNum = parseInt(rowDiv.className.split('-')[1]);
    // change the textboxes to normal text again and the buttons to del & edit
    const personI = b.personList.findIndex(p => p.id === rowNum)
    rowDiv.innerHTML =
        `<th class='id row-${rowNum}'>${b.personList[personI].id}</th>
        <th class='firstName row-${rowNum}'>${b.personList[personI].firstName}</th>
        <th class='lastName row-${rowNum}'>${b.personList[personI].lastName}</th>
        <th class='capsule row-${rowNum}'>${b.personList[personI].capsule}</th>
        <th class='age row-${rowNum}'>${b.personList[personI].age}</th>
        <th class='city row-${rowNum}'>${b.personList[personI].city}</th>
        <th class='gender row-${rowNum}'>${b.personList[personI].gender}</th>
        <th class='hobby row-${rowNum}'>${b.personList[personI].hobby}</th>
        <th class='options row-${rowNum}'>
            <button class=del>
                delete
            </button>
            <button class=edit>
                edit
            </button>
        </th>
        `
    // remove the row from the edited rows
    const j = rowsInEditMode.indexOf(`row-${rowNum}`);
    rowsInEditMode.splice(j, 1);
}

(async () => {
    let b = new BootcampClass();
    await b.pullClassInfoAndMerge();
    // present table of info
    const table = document.querySelector('table');
    presentTableOfInfo(b, table);
    // save the classes names of the rows in edit mode
    let rowsInEditMode = [];

    // create event listeners
    document.querySelector('table').addEventListener('click', () => {
        switch (event.target.classList[0]) {
            case 'del':
                deleteRow(event.target, b);
                break;

            case 'edit':
                console.log('event edit');
                editRowButton(event.target, b, rowsInEditMode);
                break;

            case 'conf':
                console.log('event confirm');
                confirmEditing(event.target.parentElement.parentElement, b, rowsInEditMode);
                break;

            case 'undo':
                console.log('event undo');
                undoEdit(event.target.parentElement.parentElement, b, rowsInEditMode);
                break;
        
            default:
                break;
        }
    })


    // console.log(b.personList);
    // // console.log(b.remove('0'));
    // b.remove(2);
    // b.remove(4);
    // b.remove(32);

    // console.log(b, '---------');

    // b.edit(0, new Person(0,'aaa','bbb'))
    // console.log(b, '>>>>>');
})()

