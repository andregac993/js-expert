const {readFile} = require("fs/promises");
const {error} = require("./constants")

const DEFAULT_OPTIONS = {
    maxLines:3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJSON(filePath){
        const content = await readFile(filePath, "utf8")
        const validation = this.isValid(content)
        if(!validation.valid) throw new Error(validation.error)

        const result = this.parseCSVToJson(content)
        return result
    }

    static isValid(csvString, options = DEFAULT_OPTIONS){
        const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
        const isHeaderValid = header === options.fields.join(',')

        if(!isHeaderValid){
            return{
                error: error.FILE_FIELD_ERROR_MESSAGE,
                valid: false
            }
        }

        if(
            !fileWithoutHeader.length ||
            fileWithoutHeader.length > options.maxLines
        ){
            return{
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return {valid: true}
    }

    static parseCSVToJson(csvString){
        const lines = csvString.split(/\r?\n/)
        const firstLine = lines.shift()
        const header = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            const user = {}
            for(const index in columns) {
                user[header[index]] = columns[index].trim()
            }
            return user
        })
        return users;
    }

}
module.exports = File