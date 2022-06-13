import CardService from "./CardService.js";

class CardController {
    async create(req, res) {
        try {
            const card = await CardService.create(req.body, req.files.picture);
            res.json(card);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getAll(req, res) {
        try {
            const cards = await CardService.getAll();
            return res.json(cards);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async getById(req, res) {
        try {
            const card = await CardService.getById(req.params.id);
            return res.json(card);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async update(req, res) {
        try {
            const updatedCard = await CardService.update(req.body);
            return res.json(updatedCard);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async delete(req, res) {
        try {
            const card = await CardService.delete(req.params.id);
            return res.json(card);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async searchCards(req, res) {
        try {
            const searchCard = await CardService.search(req.body);
            return res.json(searchCard);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new CardController();