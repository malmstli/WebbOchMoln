const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const notes = await prisma.notes.findMany()
    res.send(notes)
})

router.post('/', async (req, res) => {
    const note = await prisma.notes.create({
        data: {
            author_id: 1,
            note: req.body.note
        }
    })

    res.send({
        msg: 'Note created',
        id: note.id
    })
})

router.put('/:id', async (req, res) => {
    const note = await prisma.notes.update({
        where: { id: Number(req.params.id) },
        data: {
            note: req.body.note || req.body.text,
            updated_at: new Date()
        }
    })

    res.send({
        msg: 'Note updated',
        id: note.id,
        note
    })
})

router.delete('/:id', async (req, res) => {
    await prisma.notes.delete({
        where: { id: Number(req.params.id) }
    })

    res.send({
        msg: 'Note deleted',
        id: req.params.id
    })
})

module.exports = router