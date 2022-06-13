import Card from "./Card.js";
import fileService from "../fileService.js";

class CardService {
    async create(card, picture) {
        const fileName = fileService.saveFile(picture);
        const createdCard = await Card.create({...card, picture: fileName});
        return createdCard;
    }

    async getAll() {
        const cards = await Card.find();
        return cards;
    }

    async getById(id) {
        if (!id) {
            throw new Error('не указан Id');
        }
        const card = await Card.findById(id);
        return card;
    }

    async update(card) {
            if (!card._id) {
                throw new Error('не указан Id');
            }
            const updatedCard = await Card.findOneAndUpdate(card._id, card, {new: true});
            return updatedCard;
    }

    async delete(id) {
            if (!id) {
                throw new Error('не указан Id');
            }
            const card = await Card.findByIdAndDelete(id);
            return card;
    }
    async search(line) {
        if (!line) {
            throw new Error('Вы ничего не ввели.');
        }
        const cards = await Card.find({brand: line});
        return cards
    }
}

export default new CardService();