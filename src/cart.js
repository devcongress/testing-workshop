// Cart object
function Cart() {
  this.store = []
}

// Add an item to the cart
Cart.prototype.add = function (item) {
  // create a unique id
  const id = createIdentifier(item)

  // check if the cart already has this item
  // and if yes, update the item quantity
  if (this.has(id)) {
    item.quantity = this.item(id).data.quantity + item.quantity
    return this.update(id, item)
  }

  // create new item and add to cart
  const newItem = new Item(id, item)
  this.store.push(newItem)
  
  return newItem
}

Cart.prototype.has = function (id) {
  // Go through all the items in the cart and see 
  // if any of them have a matching id, then return a bool
  return this.store.filter(item => item.getId() === id).length > 0
}

Cart.prototype.item = function (id) {
  // Get a item from the cart via its id
  return this.store.filter(item => item.getId() === id)
}

// Update one item in the cart
Cart.prototype.update = function (id, item) {}

// Remove one item from the cart
Cart.prototype.remove = function (id) {}

// Delete the cart and return the empty cart
Cart.prototype.destroy = function () {
  this.store = []
  return this.store
}

Cart.prototype.all = function () {
  return this.store
}

// Return the total of all items in the cart
Cart.prototype.total = function () {
  // Loop through all the items and return the total as an array
  // then reduce that array down to a final integer value
  return this.store.map(item => item.total())
    .reduce((prev, curr) => prev + curr, 0)
}

// Item object
function Item(id, item) {
  this._id = id
  this.data = {
    tax: 0,
    quantity: 1
  }

  for (var key in item) {
    if (!item.hasOwnProperty(key)) return

    this.data[key] = item[key]
  }
}

Item.prototype.update = function (key, value) {
  if (key == 'quantity' && value < 1) {
    // do nothing
    return false;
  }

  // update the item
  this.data[key] = value

  return this;
}

Item.prototype.total = function () {
  return parseInt(this.data.price * this.data.quantity)
}

Item.prototype.getId = function() {
  return this._id
}

Item.prototype.contents = function() {
  return this.data
}

// Utility
function createIdentifier (item) {
  if (item.id == undefined || item.id == '') {
    throw new ItemIdException('Item is missing an id.')
  }

  return objectHash(item, {algorithm: 'md5'})
}

function ItemIdException(message) {
   this.message = message;
   this.name = 'ItemIdException';
}

