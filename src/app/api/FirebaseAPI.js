import { databaseRef } from '../config/firebase';

/** A list of characters we can use to generate the push key */
const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

/** The time we used last time to generate the Push ID */
let lastPushTime = 0;

/** The random characters we generated last time */
let lastRandChars = [];

/**
 * This object wrapps Firebase Database to match
 * the API interface used by Axios
 */
const FirebaseAPI = {
    /**
     * Wrapper for the on which adds a subcription to change
     * @param {*} url 
     * @returns Promise<{data : value}>
     */
    get ( url ) {

        return new Promise( (resolve, reject) => {
            databaseRef.child(url).on('value', snapshot => {
                resolve( { data : snapshot.val() } );
            }, (error) => { 
                console.log(error);
                reject(error);
            });
        });
    },

   /**
     * Wrapper for the once which subscribes and then unsubscribes to change
     * Equivalent to on followed by off
     * @param {*} url 
     * @returns Promise<{data : value}>
     */
    getOnce (url){
        return new Promise( (resolve, reject) => {
            databaseRef.child(url).once('value', snapshot => {
                resolve( { data : snapshot.val() } );
            }, (error) => { 
                console.log(error);
                reject(error);
            });
        });
    },

    /**
     * Wrapper for the firebase Set method.
     * @param {*} url 
     * @param {*} data
     * @returns Promise<{data : value}> to match with the API interface.
     */
    post ( url, data ) {
        return new Promise( (resolve, reject) => {
            var newKey = databaseRef.child(url).push().key;
            databaseRef.child(`${url}/${newKey}`).set({...data, id : newKey}, (error) => {
                
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Pass");
                    //the set() method returns a promise without data, so we need to get
                    //to be used as payload
                    databaseRef.child(`${url}/${newKey}`).once('value').then((snap)=> resolve( { data: snap.val()} ));
                }

            });
        });
        
    },
    
    /*
    * Wrapper for the firebase Update method for partial update of child key:value pairs 
    * Used for edits instead of Set which eliminates child key:value pairs not present in data 
    * @param {*} url
    * @param {*} data
    * @returns Promise<{data : value}> to match with the API interface.
    */
    update ( url, data) {
        return new Promise ( (resolve, reject) => {     
            databaseRef.child(`${url}`).update(data, (error) => {
            if (error) { 
                reject(error);
            } else {
                resolve(data);
                }
            });
        });
    },
    

    /**
     * Wrapper for the Remove method.
     * @param {*} url 
     * @returns Promise<{data : value}>
     */
    remove ( url ) {

        return new Promise( (resolve, reject) => {
            databaseRef.child(url).remove(error => {
                if (error) {
                    console.error(error);
                    reject(reject)
                }
                resolve();
            });
        });
    },

    /**
     * Wrapper for the firebase Set method that doesn't add an auto generated 'key'
     * @param {*} url
     * @param {*} data
     * @returns Promise<{data : value}> to match with the API interface.
     */
    set ( url, data ) {

        return new Promise( (resolve, reject) => {
             databaseRef.child(`${url}`).set(data, (error) => {
                if (error) { 
                    reject(error);
                } else {
                      resolve(data);
                }
            });
        });
    },

    /**
     * Generates a Push ID in Firebase format in case we are
     * generating IDs locally (ex. We're creating notifications
     * locally)
     * 
     * Inspired by this article:
     * https://gist.github.com/mikelehen/3596a30bd69384624c11
     * 
     * @param {*} date - The time (in milliseconds) that we're generating
     * the ID with
     */
    generatePushId(time) {
        const duplicateTime = time === lastPushTime;

        let timeStampChars = new Array(8);
        for (let i = 7; i >= 0; i--) {
            timeStampChars[i] = PUSH_CHARS.charAt(time % 64);
            time = Math.floor(time / 64);
        }
        if (time !== 0) throw new Error('We should have converted the entire timestamp.');

        var id = timeStampChars.join('');

        if (!duplicateTime) {
            for (let i = 0; i < 12; i++) {
                lastRandChars[i] = Math.floor(Math.random() * 64)
            }
        } else {
            // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1
            let i = 11;
            for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                lastRandChars[i] = 0;
            }
            lastRandChars[i]++;
        }

        for (let i = 0; i < 12; i++) {
            id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
        if (id.length !== 20) throw new Error('Length should be 20.');

        return id;
    }
}

export default FirebaseAPI;