/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the callback function type
type Callback<T> = () => Promise<T>;

/**
 * Executes a callback if the current time is within X minutes of the provided deadline
 * @param callBack - The callback function to execute
 * @param X - Number of minutes before the deadline to run the callback
 * @param deadLine - Deadline time in Unix time (seconds since Epoch)
 */
const executeWithinXMinutes= async <T>({ X, callBack, deadLine }: { X: number; callBack: Callback<T>; deadLine: number }): Promise<T | undefined> => {
    // Get the current time in Unix timestamp (seconds since Epoch)
    const currentTime = Math.floor(Date.now() / 1000);

    // Convert minutes to seconds for comparison
    const XSeconds = X * 60;

    // Calculate the difference between the deadline and the current time
    const timeDifference = deadLine - currentTime;//(in seconds)

    // Check if the current time is within X minutes of the deadline
    if (timeDifference > 0 && timeDifference <= XSeconds) {
        const res= await  callBack();
        return res
    }
    return
}

/**
 * Executes a callback if the current time is within 10 minutes of the provided deadline
 * @param callBack - The callback function to execute
 * @param X - Number of minutes before the deadline to run the callback
 * @param deadLine - Deadline time in Unix time (seconds since Epoch)
 */
export const executeWithin10Minutes=async <T>({ callBack, deadLine }: { callBack: Callback<T>; deadLine: number }):  Promise<T | undefined> => {
    return await executeWithinXMinutes({
        X:10,//10 minutes 
        callBack,
        deadLine
    })
}
