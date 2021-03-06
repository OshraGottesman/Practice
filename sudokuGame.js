let difficulty = window.location.search;
difficulty = difficulty.substring(1);
let timer_run = true;
let m = 0;
let s = 0;
let array_of_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sudoku_template = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    ["d", "e", "f", "g", "h", "i", "a", "b", "c"],
    ["g", "h", "i", "a", "b", "c", "d", "e", "f"],
    ["b", "c", "a", "e", "f", "d", "h", "i", "g"],
    ["e", "f", "d", "h", "i", "g", "b", "c", "a"],
    ["h", "i", "g", "b", "c", "a", "e", "f", "d"],
    ["c", "a", "b", "f", "d", "e", "i", "g", "h"],
    ["f", "d", "e", "i", "g", "h", "c", "a", "b"],
    ["i", "g", "h", "c", "a", "b", "f", "d", "e"]
];
let solved_board;
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
];
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
function create_board(board, array_of_numbers) {
    let random_numbers = [];
    while (array_of_numbers.length != 0) {
        let temp = Math.floor(Math.random() * (array_of_numbers.length - 1));
        random_numbers.push(array_of_numbers[temp]);
        array_of_numbers.splice(temp, 1);
    }
    board = put_numbers_in_board(board, random_numbers); //michael
    board = switch_3_colums(board, create_array_of_3_random_numbers([0, 1, 2]), 0);
    board = switch_3_colums(board, create_array_of_3_random_numbers([3, 4, 5]), 3);
    board = switch_3_colums(board, create_array_of_3_random_numbers([6, 7, 8]), 6);
    board = switch_3_rows(board, create_array_of_3_random_numbers([0, 1, 2]), 0);
    board = switch_3_rows(board, create_array_of_3_random_numbers([3, 4, 5]), 3);
    board = switch_3_rows(board, create_array_of_3_random_numbers([6, 7, 8]), 6);
    return board;
}
function generate_board_in_specefied_difficulty(amount_of_numbers_to_take_out) { //takes out numbers according to difficulty
    solved_board = create_board(sudoku_template, array_of_numbers);
    for (let i = 0; i < solved_board.length; i++) {
        for (let j = 0; j < solved_board[i].length; j++) {
            unsolved_board[i][j] = solved_board[i][j];
        }
    }
    counter = 0;
    while (counter < amount_of_numbers_to_take_out) {
        let colum = Math.floor(Math.random() * 9);
        let row = Math.floor(Math.random() * 9);
        if (unsolved_board[row][colum] != 0) {
            unsolved_board[row][colum] = 0;
            counter++;
        }
    }
    console.log(solved_board);
    for (i = 0; i < 81; i++) { //puts the board into html
        if (unsolved_board[Math.floor(i / 9)][i % 9] != 0) {
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i / 9) + 1}) > td:nth-child(${i % 9 + 1})`).innerText = unsolved_board[Math.floor(i / 9)][i % 9];
        } else {
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i / 9) + 1}) > td:nth-child(${i % 9 + 1})`).innerHTML = '<input class="input" type="number">';
        }
    }

    return unsolved_board;
}
console.log(generate_board_in_specefied_difficulty(difficulty));

function check_row(row) {
    for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
            if (row[i] == row[j] || row[i] < "1" || row[i] > "9") {
                return false;
            }
        }
    }
    return true;
}
function check_finish() {
    let user_solved_board = [
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
    for (i = 0; i < 81; i++) { //gets the html board
        if (document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i / 9) + 1}) > td:nth-child(${i % 9 + 1})`).innerText == "") {
            user_solved_board[Math.floor(i / 9)][i % 9] = document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i / 9) + 1}) > td:nth-child(${i % 9 + 1}) > input`).value;
        }
        else {
            user_solved_board[Math.floor(i / 9)][i % 9] = document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(i / 9) + 1}) > td:nth-child(${i % 9 + 1})`).innerText;
        }
    }
    let flag = true;
    for (i = 0; i < 9; i++) { //checks each row in the solved board
        flag = check_row(user_solved_board[i]);
        if (!flag) {
            document.getElementById("try_again_alert").style.visibility = "visible";
            timer_run = false;

            return false;
        }
    }
    for (let c = 0; c < 9; c++) { //checks each colum in the solved board
        let temp_colum = [];
        for (let r = 0; r < 9; r++) {
            temp_colum[r] = user_solved_board[r][c];
        }
        flag = check_row(temp_colum);
        if (!flag) {
            document.getElementById("try_again_alert").style.visibility = "visible";
            timer_run = false;

            return false;
        }
    }
    let box_array = [ //puts 1st box in array
        user_solved_board[0][0],
        user_solved_board[0][1],
        user_solved_board[0][2],
        user_solved_board[1][0],
        user_solved_board[1][1],
        user_solved_board[1][2],
        user_solved_board[2][0],
        user_solved_board[2][1],
        user_solved_board[2][2]];
    flag = check_row(box_array); //checks 1st box
    if (flag) {
        let box_array = [ // puts 2nd box in array
            user_solved_board[0][3],
            user_solved_board[0][4],
            user_solved_board[0][5],
            user_solved_board[1][3],
            user_solved_board[1][4],
            user_solved_board[1][5],
            user_solved_board[2][3],
            user_solved_board[2][4],
            user_solved_board[2][5]];
        flag = check_row(box_array); //checks 2nd box
    }
    if (flag) {
        let box_array = [ //puts 3rd box in array
            user_solved_board[0][6],
            user_solved_board[0][7],
            user_solved_board[0][8],
            user_solved_board[1][6],
            user_solved_board[1][7],
            user_solved_board[1][8],
            user_solved_board[2][6],
            user_solved_board[2][7],
            user_solved_board[2][8]];
        flag = check_row(box_array); //checks 3rd box
    }
    if (flag) {
        let box_array = [ //puts 4th box in array
            user_solved_board[3][0],
            user_solved_board[3][1],
            user_solved_board[3][2],
            user_solved_board[4][0],
            user_solved_board[4][1],
            user_solved_board[4][2],
            user_solved_board[5][0],
            user_solved_board[5][1],
            user_solved_board[5][2]];
        flag = check_row(box_array); //checks 4th box
    }
    if (flag) {
        let box_array = [ //puts 5th box in array
            user_solved_board[3][3],
            user_solved_board[3][4],
            user_solved_board[3][5],
            user_solved_board[4][3],
            user_solved_board[4][4],
            user_solved_board[4][5],
            user_solved_board[5][3],
            user_solved_board[5][4],
            user_solved_board[5][5]];
        flag = check_row(box_array); //checks 5th box
    }
    if (flag) {
        let box_array = [ //puts 6th box in array
            user_solved_board[3][6],
            user_solved_board[3][7],
            user_solved_board[3][8],
            user_solved_board[4][6],
            user_solved_board[4][7],
            user_solved_board[4][8],
            user_solved_board[5][6],
            user_solved_board[5][7],
            user_solved_board[5][8]];
        flag = check_row(box_array); //checks 6th box
    }
    if (flag) {
        let box_array = [ //puts 7th box in array
            user_solved_board[6][0],
            user_solved_board[6][1],
            user_solved_board[6][2],
            user_solved_board[7][0],
            user_solved_board[7][1],
            user_solved_board[7][2],
            user_solved_board[8][0],
            user_solved_board[8][1],
            user_solved_board[8][2]];
        flag = check_row(box_array); //checks 7th box
    }
    if (flag) {
        let box_array = [ //puts 8th box in array
            user_solved_board[6][3],
            user_solved_board[6][4],
            user_solved_board[6][5],
            user_solved_board[7][3],
            user_solved_board[7][4],
            user_solved_board[7][5],
            user_solved_board[8][3],
            user_solved_board[8][4],
            user_solved_board[8][5]];
        flag = check_row(box_array); //checks 8th box
    }
    if (flag) {
        let box_array = [ //puts 9th box in array
            user_solved_board[6][6],
            user_solved_board[6][7],
            user_solved_board[6][8],
            user_solved_board[7][6],
            user_solved_board[7][7],
            user_solved_board[7][8],
            user_solved_board[8][6],
            user_solved_board[8][7],
            user_solved_board[8][8]];
        flag = check_row(box_array); //checks 9th box
    }
    if (flag) {
        document.getElementById("congradulations_alert").style.visibility = "visible";
        document.getElementById("congradulations").innerHTML = `Congradulations!! You Did It in ${m} minutes and ${s} seconds!`;
        timer_run = false;
        return true;
    }
    else {
        document.getElementById("try_again_alert").style.visibility = "visible";
        timer_run = false;
        return false;
    }
}
function restart() {
    let a = document.querySelectorAll(".input");
    for (i = 0; i < a.length; i++) {
        a[i].value = "";
        a[i].style.backgroundColor = "#fff7f8";
    }
    s = 0;
    m = 0;
}
function hint() {
    flag = true;
    while (flag) {
        let random_number_for_hint = Math.floor(Math.random() * 81);
        if (unsolved_board[Math.floor(random_number_for_hint / 9)][random_number_for_hint % 9] == 0 && document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint / 9) + 1}) > td:nth-child(${random_number_for_hint % 9 + 1}) > input`).value == "") {
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint / 9) + 1}) > td:nth-child(${random_number_for_hint % 9 + 1}) > input`).value = solved_board[Math.floor(random_number_for_hint / 9)][random_number_for_hint % 9];
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint / 9) + 1}) > td:nth-child(${random_number_for_hint % 9 + 1}) > input`).style.color = "#f3224f";
            document.querySelector(`#container > table > tbody > tr:nth-child(${Math.floor(random_number_for_hint / 9) + 1}) > td:nth-child(${random_number_for_hint % 9 + 1}) > input`).style.backgroundColor = "pink";
            flag = false;
        }
        else {
            let a = document.querySelectorAll(".input");
            let counter = 0;
            for (i = 0; i < a.length; i++) {
                if (a[i].value != "") {
                    counter++;
                }
            }
            if (counter == a.length) {
                alert("Board is complete! press Finish")
                break;
            }
        }
    }
}
function startTime() {
    if (s == 59) {
        m++;
        s = 0;
    }
    else {
        s++;
    }
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timer').innerHTML = m + ":" + s;
    if (timer_run) {
        setTimeout(startTime, 1000);
    }
}
function checkTime(i) {
    i = parseInt(i);
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
function switch_page() {
    location.assign("2ndpage.html");
}

//   let best_time_minutes_difficulty_1 = 00;
//   let best_time_minutes_difficulty_2 = 00;
//   let best_time_minutes_difficulty_3 = 00;
//   let best_time_seconds_difficulty_1 = 00;
//   let best_time_seconds_difficulty_2 = 00;
//   let best_time_seconds_difficulty_3 = 00;
//   if (difficulty==20){
//     document.getElementById("best_time").innerHTML=best_time_minutes_difficulty_1+":"+best_time_seconds_difficulty_1;
//   }
//   else if (difficulty==40){
//     document.getElementById("best_time").innerHTML=best_time_minutes_difficulty_2+":"+best_time_seconds_difficulty_2;
//   }
//   else if (difficulty==60){
//     document.getElementById("best_time").innerHTML=best_time_minutes_difficulty_3+":"+best_time_seconds_difficulty_3;
//   }

// function best_time(){
//     if(difficulty==20){
//       if(best_time_minutes_difficulty_1>m || (best_time_minutes_difficulty_1==m && best_time_seconds_difficulty_1>s)){
//           best_time_minutes_difficulty_1 = m;
//           best_time_seconds_difficulty_1 =s;
//           document.getElementById("best_time").innerHTML=m+":"+s
//           return true;
//       }
//     }
//     if(difficulty==40){
//       if(best_time_minutes_difficulty_2>m || (best_time_minutes_difficulty_2==m && best_time_seconds_difficulty_2>s)){
//           best_time_minutes_difficulty_2 = m;
//           best_time_seconds_difficulty_2 =s;
//           document.getElementById("best_time").innerHTML=m+":"+s
//           return true;
//       }
//     }
//     if(difficulty==60){
//       if(best_time_minutes_difficulty_3>m || (best_time_minutes_difficulty_3==m && best_time_seconds_difficulty_3>s)){
//           best_time_minutes_difficulty_3 = m;
//           best_time_seconds_difficulty_3 =s;
//           document.getElementById("best_time").innerHTML=m+":"+s
//           return true;
//       }
//     }
//     return false;
// }






