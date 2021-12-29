// // 記事資料的程式片段
// var postIts = []; //記事陣列，用來放置月曆中的記事物件資料
// //current 目前點擊的日期
// var currentPostItID = 0; //目前的記事ID
// var newCurrentPostIt = false; //目前的記事是否為新？也就是：目前點選的日期尚未有任何的記事資料
// var currentPostItIndex = 0; //目前的記事在postIts陣列中的位置索引

// function dayClicked(elm) {
//     console.log(elm.dataset.uid);
//     currentPostItID = elm.dataset.uid; //目前的記事ID為所點擊的日期表格上的uid
//     currentDayHasNote(currentPostItID);//判斷目前點擊的日期是否有記事資料
// }
  
// function currentDayHasNote(uid){ //測試特定UID是否已經有記事
//     for(var i = 0; i < postIts.length; i++){
//         if(postIts[i].id == uid){ //Bingo
//             newCurrentPostIt = false; //目前的日期有記事資料
//             currentPostItIndex = i; //指向找到的記事資料物件
//             return;
//         }
//     }
//     newCurrentPostIt = true;  //目前的日期沒有記事資料
// }

// function getRandom(min, max) { //min <= 亂數值 < max
//     return Math.floor(Math.random() * (max - min) ) + min;
// }
  
// function submitPostIt(){ //按了id="modal_OK"的按鍵後，所要執行的方法
//     const value = document.getElementById("edit-post-it").value;
//     document.getElementById("edit-post-it").value = "";
//     let num = getRandom(1, 6); //取得1~5的亂數，用來標示便利貼顏色的檔案代號
//     let postIt = {
//         id: currentPostItID,
//         note_num: num,
//         note: value
//     }
//     if(newCurrentPostIt){ //如果是新記事的話
//         postIts.push(postIt); //將新記事postIT物件推入postIts陣列
//     } else {
//         postIts[currentPostItIndex].note = postIt.note; //更新現有記事物件的記事資料
//     }
//     // console.log(postIts)
//     fillInMonth(thisYear, thisMonth, thisDate);    
//     closeMakeNote();
// }

