//reverse string
function reverseStr(str) {
    //var word = str.split();
    // var reverseChar = word.reverse('');
    // var charJoined = reverseChar.join('');

    return str.split('').reverse('').join('') //above work done using single command//
        //return charJoined;
}
//palindrome check
function palindromCheck(str) {
    var reverseword = reverseStr(str);
    return str === reverseword;
    //if (str === reverseword) {
    //    return true;
    // }
    // return false;
}

//date to string
function dateToString(date) {
    var datestr = { day: '', month: '', year: '' };
    if (date.day < 10) {
        datestr.day = '0' + date.day;

    } else {
        datestr.day = date.day.toString();
    }
    if (date.month < 10) {
        datestr.month = '0' + date.month;

    } else {
        datestr.month = date.month.toString();
    }
    datestr.year = date.year.toString();
    return datestr;
}
//all date formats
function getalldateFormats(date) {
    var datestr = dateToString(date);

    var ddmmyyyy = datestr.day + datestr.month + datestr.year;
    var mmddyyyy = datestr.month + datestr.day + datestr.year;
    var yyyymmdd = datestr.year + datestr.month + datestr.day;
    var ddmmyy = datestr.day + datestr.month + datestr.year.slice(-2);
    var mmddyy = datestr.month + datestr.day + datestr.year.slice(-2);
    var yymmdd = datestr.year.slice(-2) + datestr.month + datestr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//checking palindrome for all date formats
function checkPalindromeForAllDateFormats(date) {
    var listofpalindromes = getalldateFormats(date);
    var flag = false;
    for (var i = 0; i < listofpalindromes.length; i++) {
        if (palindromCheck(listofpalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}
//for leap year
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

//the next date
function getNextDate(date) {
    var day = date.day + 1; //incrementing the day
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        //check for feb
    if (month == 2) { //check for leap year
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;

            }
        } else {
            if (day > 28) {
                day = 1;
                month++;

            }
        }
    } else { //check if the days exceeds the max day in a month//
        if (day > daysInMonth[month - 1]) { //as index starts from 0
            day = 1;
            month++; //incrementingthe month
        }

    } //incrementing the year
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}


//next palindrome date
function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}




var dateInputRef = document.querySelector('#date-input');
var showBtnRef = document.querySelector('#show-btn');
var showResultRef = document.querySelector('#show-result');

function clickHandler(e) {
    var bdayStr = dateInputRef.value;
    if (bdayStr !== '') {
        var listOfdate = bdayStr.split('-');
        var date = {
            day: Number(listOfdate[2]),
            month: Number(listOfdate[1]),
            year: Number(listOfdate[0]),
        };
        var isPalindromedate = checkPalindromeForAllDateFormats(date);
        if (isPalindromedate) {
            showResultRef.innerText = 'YAY!!! Your Birthdate is a Palindrome !! 🥳🥳'
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            showResultRef.innerText = ' The next palindrome date is   ' + nextDate.day + '-' + nextDate.month + '-' + nextDate.year + '\n Oh ! You missed it 😟 by..   ' + ctr

        }
    }

}
showBtnRef.addEventListener('click', clickHandler);