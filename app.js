const chalk = require('chalk')

const yargs = require('yargs')
const notes = require('./notes.js')

//console.log(process.argv)
// customize yargs version
yargs.version('1.1.0')

//creating the command yargs
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: ' Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'this my habit tracker',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
       notes.addNote(argv.title, argv.body)
    }
})
 yargs.command({
     command: 'remove',
     describe: 'removing a note',
     builder: {
            title: {
                describe: ' Note title',
                demandOption: true,
                type: 'string'
            }
     },
     handler(argv) {
         notes.removeNotes(argv.title)
     }
 })
 yargs.command({
    command: 'list',
    describe: 'listing a note',
    handler(argv) {
        notes.listingNotes(argv.title)
    }
})
yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: ' Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.readNotes(argv.title)
    }
})


yargs.parse()