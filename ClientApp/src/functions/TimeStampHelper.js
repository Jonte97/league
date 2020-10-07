export const GetReadableTimestamp = (timestamp) => {
    var minutes = (timestamp / (1000 * 60)).toFixed(0);

    return minutes;
}