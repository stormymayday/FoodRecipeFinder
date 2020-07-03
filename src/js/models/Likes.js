export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id, title, author, img) {
		// Creating new like object
		const like = {
			id,
			title,
			author,
			img
		};

		// Pushing object into the array
		this.likes.push(like);

		// Saving data to localStorage
		this.persistData();

		// Returning the object
		return like;
	}

	deleteLike(id) {
		// Finding index of the element to be deleted
		const index = this.likes.findIndex((el) => el.id === id);

		// Deleting element based on ID
		this.likes.splice(index, 1);

		// Deleting data from localStorage
		this.persistData();
	}

	isLiked(id) {
		return this.likes.findIndex((el) => el.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}

	persistData() {
		// Cnverting likes array into a string and putting it into localStorage
		localStorage.setItem('likes', JSON.stringify(this.likes));
	}

	readStorage() {
		// Converting string into an array and saving into the storage variable
		const storage = JSON.parse(localStorage.getItem('likes'));

		// Restoring likes from localStorage
		if (storage) this.likes = storage;
	}
}
