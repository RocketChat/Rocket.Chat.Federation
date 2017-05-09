
//turning time to millisecond posix time
function AsTimeStamp(time) {
    var time_to_ms = new Date().getTime();
    return time_to_ms;
}
//turning millisecond posix time to Time(UTC)
function UTCTime(milliseconds) {
    var UTCTime_from_ms = new Date();
    return UTCTime_from_ms;
}

exports.AsTimeStamp = AsTimeStamp;
exports.UTCTime = UTCTime;