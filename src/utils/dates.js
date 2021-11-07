const to_string_date = (date) => `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1: date.getMonth() + 1}/${date.getFullYear()}`
const to_iso_string = (date) => {
    let [day, month, year] = date.split('/')
    let _d = [year, month, day].join('-')
    return _d.concat('T00:00:00.000Z')
}
const from_iso_to_string = (date) => {
    const [ year, month, day ] = date.split('T')[0].split('-')
    return [ day, month, year ].join( '/' )
} 
export { to_iso_string, to_string_date, from_iso_to_string }