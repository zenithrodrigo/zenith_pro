# Weprint247-website

Weprint247-website is a app developed in javascript using `React`, `HTML` and `CSS`.

The app allows you to see the products from the shop, design your own the selected product and be served designed product.
Every product contain four sides including front, back, left and right side. So you can design on four sides.
The designed products are reserved order through checkout process and designed images are sent to business owner.

## Library

- react-js
- tailwind-css

## Setup

- Make sure you already have `Node.js` and `npm` installed in your system.
- Replace a file called **.env_sample** into **.env**.
  

## API usage

> Check /src/context/UserContext.jsx



## Project Configuration

### Layout

- header

  - [] menu drawer

  - [] add cart icon

- footer

  - [] social links (use this icons https://react-icons.github.io/react-icons/)

  - [] contact us

  - [] poweredBy (Werewolf Solutions icon)

### Pages

- CreateYourOwn.jsx

  - [] create itemsContext where an item is, and then it comes from api.js

    - [] add save positions => save in localStorage in handleSave in DesignOverlay.jsx {id: img.id (this is the img.name or img.src), position: {x, y, width, height}}

    - [] add save => save new image to be sent to business owner

  - [] add any notes you want to add

  - [] add item to cart

  - [] add checkout

- [] auth
 
  - [] add sign in

  - [] add sign out
    
- checkout

  used stripe module.

  - [] ask email or sign in/up

  - [] billing and shipment address

  - [] payment method: card

  - [] review order and confirm

- add styling home

- add styling shop

- add styling about us

- contact us

  - [] add styling => email + message

- order

  - [] add => show customer's order item

- cart
  
  - [] add => show customer's cart item and delete all or one

# Notes

- https://pngtree.com/so/t-shirt
