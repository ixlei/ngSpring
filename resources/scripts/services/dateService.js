angular.module('dateService', []).factory('calendarService', ['$q', '$http',
    function($q, $http) {
        return (function() {

            var getDate = function() {
                var now = new Date(),
                    time = now.getFullYear() + '-' + now.getMonth();

                return {
                    date: time,
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate()
                };
            };

            var currentMonth = getDate(),
                lastMonth = getDate();

            return {
                isLeapYears: function(year) {
                    if (((year % 4 == 0) &&
                            (year % 100 != 0)) ||
                        year % 400 == 0) {
                        return true;
                    }
                    return false;
                },

                getDate: getDate,

                getDateTable: function(date) {
                    var dateArray = [],
                        dayNum,
                        year = date.year,
                        month = date.month,
                        monthArray = [],
                        dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (this.isLeapYears(year)) {
                        dayNum[1] = 29;
                    }

                    var firstDay = new Date(year, month, 1),
                        valid,
                        fWeekDay = firstDay.getDay();
                    monthArray[0] = new Array();
                    for (var i = 0, j = 0; i < dayNum[month]; i++) {
                        if ((0 == (i + fWeekDay) % 7) && i) {
                            j++
                            monthArray[j] = new Array();
                        }

                        valid = this.isValid({
                            year: year,
                            month: month,
                            day: i + 1
                        });
                        monthArray[j].push({
                            isValid: valid,
                            year: year,
                            month: month,
                            day: i + 1,
                            time: year + '-' + month + '-' + (i + 1),
                            weekDay: (i + firstDay.getDay()) % 7
                        });
                    }


                    var fjoinArray = [],
                        ljoinArray = [],
                        length = monthArray.length;
                    for (var e = 0; e < 7 - monthArray[0].length; e++) {
                        fjoinArray.push({
                            day: '',
                            isValid: false,
                            weekDay: ''
                        });
                    }
                    monthArray[0] = fjoinArray.concat(monthArray[0])

                    for (var ie = 0; ie < 7 - monthArray[length - 1].length; ie++) {
                        ljoinArray.push({
                            day: '',
                            isValid: false,
                            weekDay: ''
                        });
                    }
                    monthArray[length - 1] = monthArray[length - 1].concat(ljoinArray);

                    return monthArray;
                },

                getNextMonth: function() {
                    lastMonth = angular.copy(currentMonth);
                    currentMonth.year = (currentMonth.month + 1) > 11 ?
                        currentMonth.year + 1 : currentMonth.year;
                    currentMonth.month = (currentMonth.month + 1) % 12;
                    return currentMonth;
                },

                getLastMonth: function() {
                    currentMonth = angular.copy(lastMonth);
                    if (lastMonth.month - 1 < 0) {
                        lastMonth.month = 11;
                        lastMonth.year--;
                    } else {
                        lastMonth.month--;
                    }
                    return lastMonth;

                },

                getCurrentMonth: function() {
                    return currentMonth;
                },


                getHoliday: function(time) {
                    var key = 'd4206a195449b6514d78c4dd34b6c97e',
                        url = 'http://japi.juhe.cn/calendar/month?' +
                        'year-month=' + time + '&key=' + key;
                    return $http.jsonp(url, {
                        cache: true
                    });
                },

                getMaxDay: function(count) {
                    var now = getDate(),
                        num = 0,
                        dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    this.isLeapYears(now.year) ? dayNum[1] = 29 : 28;
                    num += dayNum[now.month] - now.day;
                    for (var i = now.month + 1; num < count;) {
                        if (i % 12 == 0) {
                            now.year++;
                            this.isLeapYears(now.year) ? dayNum[1] = 29 : 28;
                        }

                        now.month = i = i % 12;
                        if (count > num + dayNum[i]) {
                            num += dayNum[i];
                            i++;
                        } else {
                            return {
                                year: now.year,
                                month: now.month,
                                day: count - num
                            };
                        }
                    }
                },

                isValid: function(date) {
                    var now = new Date(),
                        d = new Date(date.year, date.month, date.day);
                    if (d.getTime() < now.getTime()) {
                        return false;
                    } else {
                        var mss = 180 * 24 * 60 * 60 * 1000;
                        if (d.getTime <= now.getTime + mss) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }


            };
        })();
    }
]);
