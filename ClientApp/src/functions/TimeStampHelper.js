export const GetReadableTimestamp = (timestamp) => {
    let minutes;
    if (timestamp != null) {
        minutes = (timestamp / (1000 * 60)).toFixed(0);
    }

    return minutes;
}