let folder = [];
let id = 2;

function addFolder() {
    let title = $('#yourfolder').val();
    if (title == "") {
        alert("Please enter the folder name!");
    } else {
        let newFolderdiv = {
            'id': id,
            'title': title,
            'status': false
        };
        folder.push(newFolderdiv);
        newFolder(newFolderdiv);
        id++;
        $('#yourfolder').val('');
    }
}

function newFolder(data) {
    let status = (data.status) ? "checked" : "";
    let content =
        `<div class="d-flex flex-row alr-folder position-relative" id="${data.id}">
            <img src="img/icon_folder.png">
            <p>${data.title}</p>
            <img src="img/close_r.png" id="del_folder${data.id} onclick="removeList('${data.id}')">
        </div>`;
    $('#all_fol').append(content);
}

function removeFolder(id) {
    let index = folder.findIndex(element => element.id == id);
    folder.splice(index, 1);
    $('#' + id).remove();
}

$(document).ready(function () {
    $('#add_fol').click(function () {
        addList();
    });
});