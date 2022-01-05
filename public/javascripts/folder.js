let folder = [];
let id = 2;
// -----------------新增文件夾------------------
function addFolder() {
    let title = $('input#yourfolder').val();
    console.log(title)
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
        newFolderList(newFolderdiv);
        id++;
        $('#yourfolder').val('');
    }

}
// -----------------新增文件夾div------------------
function newFolder(data) {
    let status = (data.status) ? "checked" : "";
    let content =
        `<div class="d-flex flex-row alr-folder position-relative" id="${data.id}">
        <img src="img/icon_folder.png">
        <p onclick="FolderList('${data.id}')">${data.title}</p>
        <img src="img/close_r.png" class="close" id="del_folder${data.id} onclick="removeFolder('${data.id}')">
    </div>`;
    $('#all_fol').append(content);
}
// -----------------新增文件夾動作div------------------
function newFolderList(data) {
    let content =
        `<div class="modal-content d-none" id="folder${data.id}">
            <div class="modal-header">
                <div class="input-group-lg ">
                    <h1><img src="img/icon_folder.png">My favorite</h1>
                </div>
                <div class="input-group-lg mb-1s">
                    <button type="button" class="btn col-auto me-auto" id="closeBtn" data-dismiss="modal"
                        aria-label="Close">
                        <img src="./img/close_r.png" width="30px" height="40px" alt="">
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div id="fol_move${data.id}">
                    <div class="d-flex flex-row position-relative alr-folder" id="${data.id}">
                        <p>My favorite</p>
                        <img src="img/close_r.png" class="close" id="del_list${data.id}" onclick="removeList('${data.id}')">
                    </div>
                </div>
                <div class="input-group-lg mb-3 d-flex flex-row position-relative fol-btn">
                    <div type="button" class="btn btn-sm back-btn" onclick="backBtn('${data.id}')">
                        <p>Back</p>
                    </div>
                    <div type="button" class="btn btn-sm d-flex justify-content-between addelse-btn" onclick="addBtn_act('${data.id}')">
                        <p>Add else</p> <img src="img/add.png" alt="">
                    </div>
                </div>
            </div>
            <!-- -----------------增加動作------------------ -->
            <div class="modal-body d-none" id="action${data.id}">
                <div class="input-group-lg mt-3">
                    <h1>Input something...</h1>
                </div>
                <div id="">
                    <input type="text">
                </div>
                <div class="input-group-lg mb-3 d-flex flex-row position-relative fol-btn">
                    <div type="button" class="btn btn-sm back-btn" onclick="backBtn_act('${data.id}')">
                        <p>Back</p>
                    </div>
                    <div type="button" class="btn btn-sm back-btn" onclick="">
                        <p>Add</p>
                    </div>
                </div>
            </div>
        </div>`;
    $('.allfolder').append(content);
}
// -----------------進入文件夾------------------
function FolderList(id) {
    $('#folder').addClass("d-none");
    $('#folder' + id).removeClass("d-none");
}
// -----------------刪除文件夾------------------
function removeFolder(id) {
    let index = folder.findIndex(element => element.id == id);
    folder.splice(index, 1);
    $('#' + id).remove();
}
// -----------------刪除動作------------------
function removeList(id) {
    let index = folder.findIndex(element => element.id == id);
    folder.splice(index, 1);
    $('#' + id).remove();
}
// -----------------回到所有文件夾------------------
function backBtn(id) {
    $('#folder').removeClass("d-none");
    $('#folder' + id).addClass("d-none");
}
// -----------------進入新增動作------------------
function addBtn_act(id) {
    $('#action' + id).removeClass("d-none");
    $('#folder' + id).addClass("d-none");
}
// -----------------回到上一個文件夾------------------
function backBtn_act(id) {
    $('#folder' + id).removeClass("d-none");
    $('#action' + id).addClass("d-none");
}
$(document).ready(function () {
    $('#add_fol').click(function () {
        addFolder();
    });
})