/**
 * Classe abstraite aux views
 */
export class AbstractView {

    /**
     * Met le titre de la page
     * @param title
     */
    setTitle(title) {
        document.title = title
    }

    /**
     * Doit être implémenté par les extends
     * @returns {Promise<void>}
     */
    async getPage() {
        throw new Error("getPage n'est implémenté !")
    }
}