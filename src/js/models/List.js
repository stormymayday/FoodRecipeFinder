import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		// Creating a new list item
		const item = {
			id: uniqid(),
			count: count,
			unit: unit,
			ingredient: ingredient
		};

		// Pushing new list item  into the items array
		this.items.push(item);

		// Returning created item
		return item;
	}

	deleteItem(id) {
		// Finding index of the element to be deleted
		const index = this.items.findIndex((el) => el.id === id);

		// Deleting element based on ID
		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		// Finding the element based on ID and updating the count
		this.items.find((el) => el.id === id).count = newCount;
	}
}
