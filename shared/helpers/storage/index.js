class Storage {
	constructor() {
		this.storage = localStorage;
	}

	async getItem(key) {
		const value = this.storage.getItem(key);
		// if (!value) return null;
		return Promise.resolve(value);
	}

	async setItem(key, value) {
		const result = this.storage.setItem(key, value);
		return Promise.resolve(result);
	}

	async removeItem(key) {
		const result = this.storage.removeItem(key);
		return Promise.resolve(result);
	}
}

const localStore = new Storage('local');
export default localStore;
