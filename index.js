// function init_domains() {
//     dselect = document.getElementById("domainID");
//     global_domains = read_list('./domains.txt');

//     var tmp = document.createElement('option');
//     tmp.text = "--- choose a domain ---"
//     tmp.disabled = true;
//     tmp.selected = true;
//     dselect.options.add(tmp)

//     for (i=0; i<global_domains.length; i++) {
//         var tmp = document.createElement('option');
//         tmp.text = global_domains[i];
//         dselect.options.add(tmp);
//     }
// };



function read_txt(fn) {
    var xmlhttp = new XMLHttpRequest();
    var txt = "";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {      
            txt = this.responseText;
        }
    }
    xmlhttp.open("GET", fn, false);  // disable async
    xmlhttp.send();
    return txt;
};

function read_list(fn) {
    var array = read_txt(fn).split("\n");
    if (array[array.length-1].length <= 1) {
        array.pop(); }
    return array;
};

function read_csv(fn) {
    var txt = read_txt(fn);
    return csvToArray(txt);
};

function csvToArray(csv) {
    rows = csv.split("\n");
    if (rows[rows.length-1].length <= 1) {
        rows.pop(); }
    return rows.map(function (row) {
    	return row.split(",");
    });
};

function init_domains() {
    dselect = document.getElementById("domainID");
    // var domains = ["BookingsAndReservations", "Books", "Calendar", "Communication", "DailyBriefing", 
    //     "Gallery", "GeneralMedia", "Global", "Help", "HomeAutomation", "Knowledge", "LocalSearch", "Music", 
    //     "Notifications", "OriginalContent", "Recipes", "Shopping", "Sports", "ToDos", "Video", "Weather"];
    var domains = read_list('./domains.txt')
    var tmp = document.createElement('option');
    // tmp.text = "--- select a domain ---"
    tmp.disabled = true;
    tmp.selected = true;
    dselect.options.add(tmp)

    for (i=0; i<domains.length; i++) {
        var tmp = document.createElement('option');
        tmp.text = domains[i];
        dselect.options.add(tmp);
    }
};

function corre_score() {
    var correScore = document.getElementById("correScore");
    var minUtt = document.getElementById("minimum-utterance").value;
    var intentError = document.getElementById("intent-error").checked;
    var slotError = document.getElementById("slot-error").checked;
    var numUtt = document.getElementById("number-utterance").checked;
    var domain = document.getElementById("domainID").value

    fcsv = '/data/correlation_score.csv';
    var array = read_csv(fcsv);
    if (domain == "Books"){x = 0}
    else {x = "none"}

    if (minUtt == 5){y = 0}
    else if (minUtt == 50){y = 1}
    else if (minUtt == 100){y = 2}
    else {y = "none"}

    if (intentError == true && slotError == true && numUtt == true){z = 0}
    else if (intentError == true && slotError == true && numUtt == false){z = 1}
    else if (intentError == false && slotError == true && numUtt == true){z = 2}
    else if (intentError == true && slotError == false && numUtt == true){z = 3}
    else if (intentError == true && slotError == false && numUtt == false){z = 4}
    else if (intentError == false && slotError == true && numUtt == false){z = 5}
    else if (intentError == false && slotError == false && numUtt == true){z = 6}
    else {z = "none"}
    
    if ([x, y, z].some(n => n == "none")) {
    //if (x == "none" || y == "none" || z == "none"){
        score = "N/A"
    }
    else {
        index = 1 + 24*x + 8*y + z
        score = array[index][3];
    }
    correScore.innerHTML = score;
};

function newLogic() {
    var correScore = document.getElementById("correScore");
    var minUtt = document.getElementById("minimum-utterance").value;
    var intentError = document.getElementById("intent-error").checked;
    var slotError = document.getElementById("slot-error").checked;
    var numUtt = document.getElementById("number-utterance").checked;
    var domain = document.getElementById("domainID").value

    var ierr = intentError ? "1":""
    var serr = slotError ? "2":""
    var nu = numUtt ? "3":""
    // if (intentError) {ierr = "1"}
    // if (slotError) {serr = "2"}
    // if (numUtt) {nu = "3"}
    fcsv = '/data/correlation_score.csv';
    var arr = read_csv(fcsv);
    var entry = arr.filter(x => x[0] == domain && x[1] == minUtt && x[2] == ierr.concat(serr, nu))
    var score = "N/A"

    if (entry.length > 0) {
        score = entry[0][3]
    }

    correScore2.innerHTML = score
}

var exfile = read_csv("data/correlation_score.csv")