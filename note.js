const { default: chalk } = require('chalk')
const fs = require('fs')
const { title } = require('process')


const addNote = function (title, body){
    const notes = loadNotes()
    // console.log(notes)
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote) {

        notes.push({
            title: title,
            body: body
            })
            saveNotes(notes)
    }
    else {
        console.log(`title has been taken before`)
    }
}
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJason = dataBuffer.toString()
        return JSON.parse(dataJason)
    }
    catch (err) {
        return[]
    }
    
}

//read note 
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note) {
        console.log(note.title)
        console.log(note.body)
    }
    else {
        console.log('no it is not')
    }
}

//list notes 

const listNotes = () => {
    const notes = loadNotes()
    console.log(`${chalk.bgBlue('Your notes:')}`)
    notes.forEach((note) => {
        console.log(`${chalk.bgCyanBright(note.title)}`)
    })

}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if(notes.length > notesKeep.length) {
        console.log(`${chalk.bgGreen('Note removed')}`)
    }
    else
    {
        console.log(`${chalk.bgRed('No note found')}`)
    }

    saveNotes(notesKeep)
}




module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}