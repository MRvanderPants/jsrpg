/**
 *	Example class to execute functions from
 *	(Old class notation to obscure private variables)
 */
function User () {
    
    const User = null;
    const stats = [5,4,12];

    this.name = 'Test name';

    this.getStats = function () {
        return stats;
    }

    // Print out all available properties
    const keys = Object.keys(this);
    keys.forEach((key) => {

        const val = this[key];
        const type = typeof val;
        const desc = (type == 'function') ? '' : `- ${ val }`;

        docs.innerHTML += `${ key }: ${ type } ${ desc }<br />`;
    });
}
