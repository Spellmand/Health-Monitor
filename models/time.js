module.exports.dateTimeNowasStr = function () {
    return Date().toISOString().slice(0, 19).replace('T', ' ');
};

module.exports.convertDateTimeFromString = function (time) {
    time = time.split("-");
    let Obj = {
        year: time[0],
        month: time[1],
        day: time[2],
        hour: time[3]
    };
    return Obj;
};
