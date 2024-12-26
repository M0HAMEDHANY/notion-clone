/**
 * Given a string, return a color in hex format based on the hash of the string.
 * This is a simple implementation of the djb2 algorithm, which is a simple string
 * hashing algorithm that is not cryptographically secure but is fast and easy to
 * implement. It is suitable for simple use cases where uniqueness is the primary
 * concern, such as generating a color for a user based on their name.
*/
function stringToColor(str : string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;   
}
export default stringToColor