describe('Cart', () => {
  it('should be initiable', () => {
    const cart = new Cart()

    expect(cart).to.be.an(Cart)
  })

  it('should add item to cart', () => {
    const item = {
      id: 4,
      name: 'Bag',
      quantity: 2,
      price: 20
    }

    const cart = new Cart()
    const newItem = cart.add(item)
    const id = createIdentifier(item)

    expect(newItem.getId()).to.equal(id)
    expect(newItem.contents().name).to.equal(item.name)
    expect(newItem.contents().quantity).to.equal(item.quantity)
  })

  it('should update item to cart', () => {
    const items = [
      { id: 4, name: 'Bag', quantity: 2, price: 20 },
      { id: 2, name: 'Shoe', quantity: 1, price: 30 },
      { id: 1, name: 'Shirt', quantity: 1, price: 30 }
    ]

    const cart = new Cart()
    items.map(item => cart.add(item))
    const shoe = cart.all().filter(item => item.contents().id == 2)[0]
    shoe.update('quantity', 9)

    expect(cart.update(shoe.getId(), shoe)).length(3)
  })

  it('should remove item from cart', () => {
    const items = [
      { id: 4, name: 'Bag', quantity: 2, price: 20 },
      { id: 2, name: 'Shoe', quantity: 1, price: 30 },
      { id: 1, name: 'Shirt', quantity: 1, price: 30 }
    ]

    const cart = new Cart()
    items.map(item => cart.add(item))
    const shoe = cart.all().filter(item => item.contents().id == 2)[0]

    expect(cart.remove(shoe.getId())).length(3)
  })

  it('should have a list of all item in cart', () => {
    const items = [
      { id: 4, name: 'Bag', quantity: 2, price: 20 },
      { id: 2, name: 'Shoe', quantity: 1, price: 30 },
      { id: 1, name: 'Shirt', quantity: 1, price: 30 }
    ]

    const cart = new Cart()
    items.map(item => cart.add(item))

    expect(cart.all()).length(3)
  })

  it('should give the total value of items in the cart', () => {
    const bag = {
      id: 4,
      name: 'Bag',
      quantity: 2,
      price: 20
    }

    const shoe = {
      id: 2,
      name: 'Shoe',
      quantity: 1,
      price: 30
    }

    const shirt = {
      id: 1,
      name: 'Shirt',
      quantity: 1,
      price: 30
    }

    const cart = new Cart()
    cart.add(bag)
    cart.add(shoe)
    cart.add(shirt)

    expect(cart.total()).to.equal(100)
  })

  it('should remove all items from the cart', () => {
    const items = [
      { id: 4, name: 'Bag', quantity: 2, price: 20 },
      { id: 2, name: 'Shoe', quantity: 1, price: 30 },
      { id: 1, name: 'Shirt', quantity: 1, price: 30 }
    ]

    const cart = new Cart()
    items.map(item => cart.add(item))

    expect(cart.destroy()).length(0)
  })
})

describe('Item', () => {
  it('should be initiable', () => {
    const item = new Item(1, {})

    expect(item).to.be.an(Item)
  });

  it('should update item', () => {
    const item = new Item(1, {
      name: 'Bag',
      quantity: 1,
      price: 20
    })

    item.update('name', 'Hair Dryer')
    item.update('quantity', 2)
    item.update('price', 15)

    expect(item.contents().name).to.equal('Hair Dryer')
    expect(item.contents().quantity).to.equal(2)
    expect(item.contents().price).to.equal(15)
  })

  it('should get item total', () => {
    const item = new Item(1, {
      name: 'Bag',
      quantity: 1,
      price: 20
    })

    expect(item.total()).to.equal(20)
  })

  it('should get item total with more than 1 as the quantity', () => {
    const item = new Item(1, {
      name: 'Bag',
      quantity: 4,
      price: 20
    })

    expect(item.total()).to.equal(80)
  })

  it('should contain name, quantity and price', () => {
    const item = new Item(1, {
      name: 'Bag',
      quantity: 2,
      price: 20
    })

    expect(item.contents().name).to.equal('Bag')
    expect(item.contents().quantity).to.equal(2)
    expect(item.contents().price).to.equal(20)
  })
})
