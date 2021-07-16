async update(request, response) {
    const { id } = request.params
    const convertedObjectId = safeObjectId(id)
    const { firstName, lastName, bornAt } = request.body

    if (!firstName || !lastName) {
        return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "firstName" and "lastName" are both required.' })
    }

    const author = new Author()

    try {
        const updatedObject = await author.updateOne({ _id: convertedObjectId }, { firstName, lastName, bornAt: new Date(bornAt), updatedAt: Date.now() })
        
        response.status(httpStatus.OK).json(updatedObject)
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
},

async destroy(request, response) {
    const { id } = request.params
    const convertedObjectId = safeObjectId(id)

    const author = new Author()

    try {
        const destroyedObject = await author.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })
        
        response.status(httpStatus.NO_CONTENT).json()
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
}