export default class {
    setTitle(title) {
        document.title = title
    }

    async getPage() {
        throw new Error("getPage n'est implémenté !")
    }
}