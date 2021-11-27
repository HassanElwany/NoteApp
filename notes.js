
// call chalk method

const chalk = require('chalk')

// call file system method

const fs = require('fs')
const { title } = require('process')



const getNotes = function () {
    return 'your notes ....'
}
// function to adding new notes to the app
const addNote =   (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter( (note) => note.title === title)

    //if (duplicateNotes.length === 0)

    const duplicateNote = notes.find( (note) => note.title === title)

if (!duplicateNote){

    notes.push ({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse(' New note has been added'))
} else {
    console.log(chalk.red.inverse ('Note has been already taken '))
}


}
// function to saving notes to our json file

const saveNotes = function (notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//function to loading notes from our json to read it and parse 

const loadNotes = function (){

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }catch (e){
        return []
    }
 
}

//function to Removing the notes from notes array  

const removeNotes =  (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title)

    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse ('Note has been already removed'))
        saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse ('note that you need to remove does not exsist'))
    }

}

const listingNotes = (note) => {
    const notes = loadNotes() 
    console.log( chalk.bgGreen('your notes'))
    for (note of notes) {
             
        console.log(note.title)
    }     
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    
    if (noteToRead){

        
        console.log(chalk.green.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse ('Note you searching about does not exist '))
    }

}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listingNotes: listingNotes,
    readNotes: readNotes
}