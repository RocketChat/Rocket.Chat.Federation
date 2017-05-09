
//turning time to millisecond posix time
function AsTimeStamp(time) {
    var TimeToMs = new Date().getTime();
    return TimeToMs;
}
//turning millisecond posix time to Time(UTC)
function UTCTime(milliseconds) {
    var UTCTimeFromMs = new Date();
    return UTCTimeFromMs;
}

exports.AsTimeStamp = AsTimeStamp;
exports.UTCTime = UTCTime;