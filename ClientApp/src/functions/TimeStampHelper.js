export const GetReadableTimestamp = (timestamp) => {
    let minutes;
    if (timestamp != null) {
        minutes = (timestamp / (1000 * 60)).toFixed(0);
    }

    return minutes;
}

export const getReadableTimestampFromSeconds = (time) => {
    if (time != null) {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        const result = minutes + "m " + seconds + "s"; 
        return result;
    }
    else return null;

}