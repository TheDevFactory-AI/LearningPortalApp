/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the callback function type
type Callback = () => any;

/**
 * Executes a callback if the current time is within X minutes of the provided deadline
 * @param callBack - The callback function to execute
 * @param X - Number of minutes before the deadline to run the callback
 * @param deadLine - Deadline time in Unix time (seconds since Epoch)
 */
const executeWithinXMinutes=({X,callBack,deadLine}:{X: number, callBack: Callback,deadLine:number}): any=> {
    // Get the current time in Unix timestamp (seconds since Epoch)
    const currentTime = Math.floor(Date.now() / 1000);

    // Convert minutes to seconds for comparison
    const XSeconds = X * 60;

    // Calculate the difference between the deadline and the current time
    const timeDifference = deadLine - currentTime;

    // Check if the current time is within X minutes of the deadline
    if (timeDifference > 0 && timeDifference <= XSeconds) {
        const callBackRes=callBack();
        return callBackRes
    }
    return

}

/**
 * Executes a callback if the current time is within 10 minutes of the provided deadline
 * @param callBack - The callback function to execute
 * @param X - Number of minutes before the deadline to run the callback
 * @param deadLine - Deadline time in Unix time (seconds since Epoch)
 */
export const executeWithin10Minutes=({callBack,deadLine}:{callBack:Callback,deadLine:number})=>{
    return executeWithinXMinutes({
        X:10,
        callBack,
        deadLine
    })
}
