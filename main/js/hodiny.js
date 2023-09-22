var tmonth = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
function GetClock() {
	var d = new Date();
	var nmonth = d.getMonth(),
		ndate = d.getDate(),
		nyear = d.getFullYear();
	var nhour = d.getHours(),
		nmin = d.getMinutes(),
		nsec = d.getSeconds();
	if (nmin <= 9) nmin = "0" + nmin;
	if (nsec <= 9) nsec = "0" + nsec;
	var clocktext =
		"" +
		tmonth[nmonth] +
		" " +
		ndate +
		", " +
		nyear +
		" " +
		nhour +
		":" +
		nmin +
		":" +
		nsec +
		"";
	document.getElementById("clockbox").innerHTML = clocktext;
}
GetClock();
setInterval(GetClock, 1000);
