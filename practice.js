// function index_row_for_hint(){
//     let row = Math.floor(Math.random()*8);
//     return row;
// }
// function index_colum_for_hint(){
//     let colum = Math.floor(Math.random()*8);
//     return colum;
// }
// console.log(index_row_for_hint(),index_colum_for_hint());
let difficulty = window.location.search;
difficulty = difficulty.substring(1);
console.log(difficulty);
let array_of_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sudoku_template = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    ["d", "e", "f", "g", "h", "i", "a", "b", "c"],
    ["g", "h", "i", "a", "b", "c", "d", "e", "f"],
    ["b", "c", "a", "e", "f", "d", "h", "i", "g"],
    ["e", "f", "d", "h", "i", "g", "b", "c", "a"],
    ["h", "i", "g", "b", "c", "a", "e", "f", "d"],
    ["c", "a", "b", "f", "d", "e", "i", "g", "h"],
    ["f", "d", "e", "i", "g", "h", "c", "a", "b"],
    ["i", "g", "h", "c", "a", "b", "f", "d", "e"]
]
function create_board(board, array_of_numbers) {
    let random_numbers = [];
    while (array_of_numbers.length != 0) {
        let temp = Math.floor(Math.random() * (array_of_numbers.length - 1));
        random_numbers.push(array_of_numbers[temp]);
        array_of_numbers.splice(temp, 1);
    }
    board = put_numbers_in_board(board, random_numbers);
    board = switch_3_colums(board, create_array_of_3_random_numbers([0, 1, 2]), 0);
    board = switch_3_colums(board, create_array_of_3_random_numbers([3, 4, 5]), 3);
    board = switch_3_colums(board, create_array_of_3_random_numbers([6, 7, 8]), 6);
    board = switch_3_rows(board, create_array_of_3_random_numbers([0, 1, 2]), 0);
    board = switch_3_rows(board, create_array_of_3_random_numbers([3,4,5]),3);
    board = switch_3_rows(board, create_array_of_3_random_numbers([6,7,8]),6);
    return board;
}
function put_numbers_in_board(board, random_numbers) {

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == "a") {
                board[i][j] = random_numbers[0];
            }
            else if (board[i][j] == "b") {
                board[i][j] = random_numbers[1];
            }
            else if (board[i][j] == "c") {
                board[i][j] = random_numbers[2];
            }
            else if (board[i][j] == "d") {
                board[i][j] = random_numbers[3];
            }
            else if (board[i][j] == "e") {
                board[i][j] = random_numbers[4];
            }
            else if (board[i][j] == "f") {
                board[i][j] = random_numbers[5];
            }
            else if (board[i][j] == "g") {
                board[i][j] = random_numbers[6];
            }
            else if (board[i][j] == "h") {
                board[i][j] = random_numbers[7];
            }
            else if (board[i][j] == "i") {
                board[i][j] = random_numbers[8];
            }
        }
    }
    console.log(board);
    return board;
}
function create_array_of_3_random_numbers(array_of_3) {
    let random_of_3 = [];
    while (array_of_3.length != 0) {
        temp = Math.floor(Math.random() * (array_of_3.length))
        random_of_3.push(array_of_3[temp]);
        array_of_3.splice(temp, 1);
    }
    return random_of_3;
}
function switch_3_colums(board, random_of_3, starting_point) {
    console.log(random_of_3);
    let temp_board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            temp_board[i][j] = board[i][j];
        }
    }
    for (let c = starting_point; c < starting_point + 3; c++) {
        for (let r = 0; r < board.length; r++) {
            board[r][c] = temp_board[r][random_of_3[c % 3]];
        }
    }
    return board;
}
function switch_3_rows(board, random_of_3, starting_point) {
    console.log(random_of_3);
    let temp_board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            temp_board[i][j] = board[i][j];
        }
    }

    for (let r = starting_point; r < starting_point + 3; r++) {
        for (let c = 0; c < board.length; c++) {
            board[r][c] = temp_board[random_of_3[r % 3]][c];
        }
    }
    return board;
}
// console.log(create_board(sudoku_template, array_of_numbers));
create_board(sudoku_template, array_of_numbers);
let solved_board;
function generate_board_in_specefied_difficulty(amount_of_numbers_to_take_out){ //takes out 20 numbers
    solved_board = create_board(sudoku_template, array_of_numbers);
    let unsolved_board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    for(let i=0; i<solved_board.length; i++){
        for(let j=0; j<solved_board[i].length; j++){
            unsolved_board[i][j]=solved_board[i][j];
        }
    }
    counter = 0;
    while(counter<amount_of_numbers_to_take_out){
        let colum =  Math.floor(Math.random()*9);
        let row = Math.floor(Math.random()*9);
        if(unsolved_board[row][colum] != 0){
            unsolved_board[row][colum]=0;
            counter++;
        }
    }
    console.log(solved_board);
    console.log(unsolved_board);
        for (i=0; i<81; i++){ //puts the board into html
            if (unsolved_board[Math.floor(i/9)][i%9] != 0) {
                document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerText = unsolved_board[Math.floor(i/9)][i%9];
            } else {
                document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerHTML = ' <input class="input" type="number">';
            }
        }

    return unsolved_board;
}
function check_finish(){
    let flag = true;
    for (i=0; i<81; i++){ //puts the board into html
        if(document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1})`).innerText==""){
            if(document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i/9)+1}) > td:nth-child(${i%9+1}) > input`).value!=solved_board[Math.floor(i/9)][i%9]){
                flag=false;
            }
        }
    }
    if(flag){
        alert("you did it!")
    }
    else{
        alert("you suck!")
    }
}

function restart(){
   let a= document.querySelectorAll(".input");
   for (i=0; i<a.length; i++){
      a[i].value = "";
   }
}
function hint(){
    let a= document.querySelectorAll(".input").length;
    let random_hint = Math.floor(Math.random()*a);
    
    console.log(a);
}
console.log(generate_board_in_specefied_difficulty(difficulty));


// function medium_mode(){ //takes out 30 numbers
//     let board = create_board(sudoku_template, array_of_numbers);

// }

// function hard_mode(){ // takes out 40 numbers
//     let board = create_board(sudoku_template, array_of_numbers);

// }