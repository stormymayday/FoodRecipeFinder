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

		// Returning the object
		return like;
	}

	deleteLike(id) {
		// Finding index of the element to be deleted
		const index = this.likes.findIndex((el) => el.id === id);

		// Deleting element based on ID
		this.likes.splice(index, 1);
	}

	isLiked(id) {
		return this.likes.findIndex((el) => el.id === id) !== -1;
	}

	getNumLikes() {
		return this.likes.length;
	}
}
