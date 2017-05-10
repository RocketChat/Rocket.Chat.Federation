
//turning time to millisecond posix time
function asTimeStamp(time) {
    var timeToMs = new Date(time).getTime();
    return timeToMs;
}
//turning millisecond posix time to Time(UTC)
function utcTime(milliseconds) {
    var utcTimeFromMs = new Date(milliseconds);
    return utcTimeFromMs;
}

exports.AsTimeStamp = asTimeStamp;
exports.UTCTime = utcTime;