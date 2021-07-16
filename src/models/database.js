async updateOne(queryFilter, newValues) {
    const { client, collection } = await this._getMongoClientAndCollection()

    try {
        const document = await collection.findOneAndUpdate(queryFilter, { $set: newValues }, { returnDocument: 'after'} )

        client.close()

        return document
    } catch(error) {
        throw new Error(error)
    }
}

async findOne(queryFilter) {
    const { client, collection } = await this._getMongoClientAndCollection()

    try {
        const document = await collection.findOne(queryFilter)

        client.close()

        return document
    } catch(error) {
        throw new Error(error)
    }
}