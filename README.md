# The Job

> Ref of old website https://www.weprint247.co.uk/

- [] in contexts: combine the item coming from api with the style needed for each item (make up this 4 items: t-shirts, hoodies, business cards and flyers)

  ### **Goals**

  - to have consistency for the whole app from featured items in home, to shop and create your own pages

  -

  > **notes:**
  >
  > - check [api-usage](#api-usage)
  > - check /src/pages/DesignOverlay.jsx for style usage

- [] style [layout](#layout) and [pages](#pages)

# API usage

> Check /src/context/UserContext.jsx

> Now item is hardcoded in /src/pages/CreateYourOwn.jsx

you are gonna work with an item that looks like this

```javascript
const item = {
  approvedForMarketplace: false,
  business: "655dc6a4899de08a03c26035",
  category: "t-shirts",
  description: "T-shirt",
  img: hoodieImage,
  name: "T-shirt",
  price: 500,
  quantity: 100,
  _id: "655de6ccff5cf1835b8653cb",
  images: {
    front: tShirtImageFront,
    back: tShirtImageBack,
    right: tShirtImageRight,
    left: tShirtImageLeft,
  },
  styles: {
    front: {
      top: "12%",
      left: "23%",
      width: "53%",
      height: "70%",
    },
    back: { top: "12%", left: "23%", width: "53%", height: "70%" },
    right: { top: "33%", left: "25%", width: "45%", height: "47%" },
    left: { top: "33%", left: "25%", width: "45%", height: "47%" },
  },
};
```

it's a sum between the inventoryItem from api (hard code this one for now and copy and paste in a array to have inventoryItems)

```javascript
const inventoryItem = {
  approvedForMarketplace: false,
  business: "655dc6a4899de08a03c26035",
  category: "t-shirts",
  description: "T-shirt",
  img: hoodieImage,
  name: "T-shirt",
  price: 500,
  quantity: 100,
  _id: "655de6ccff5cf1835b8653cb",
};
```

and some code for styling and design background (this will be integrated into the app with a website builder in the future)

right now they have to change for each item proposed like t-shirts, hoodies, mugs, hats and so on

```javascript
const item = {
  ...inventoryItem
  images: {
    front: tShirtImageFront,
    back: tShirtImageBack,
    right: tShirtImageRight,
    left: tShirtImageLeft,
  },
  styles: {
    front: {
      top: "12%",
      left: "23%",
      width: "53%",
      height: "70%",
    },
    back: { top: "12%", left: "23%", width: "53%", height: "70%" },
    right: { top: "33%", left: "25%", width: "45%", height: "47%" },
    left: { top: "33%", left: "25%", width: "45%", height: "47%" },
  },
};
```

# Layout

- [] header

  - [] menu drawer

  - [] cart icon

- [] footer

  - [] social links (use this icons https://react-icons.github.io/react-icons/)

  - [] contact us

  - [] poweredBy (Werewolf Solutions icon)

# Pages

- [>] CreateYourOwn.jsx

  - [>] create itemsContext where an item is

    ```javascript
    const item = {
      approvedForMarketplace: false,
      business: "655dc6a4899de08a03c26035",
      category: "t-shirts",
      description: "T-shirt",
      img: hoodieImage,
      images: {
        front: tShirtImageFront,
        back: tShirtImageBack,
        right: tShirtImageRight,
        left: tShirtImageLeft,
      },
      name: "T-shirt",
      price: 500,
      quantity: 100,
      _id: "655de6ccff5cf1835b8653cb",
      styles: {
        front: {
          top: "12%",
          left: "23%",
          width: "53%",
          height: "70%",
        },
        back: { top: "12%", left: "23%", width: "53%", height: "70%" },
        right: { top: "33%", left: "25%", width: "45%", height: "47%" },
        left: { top: "33%", left: "25%", width: "45%", height: "47%" },
      },
    };
    ```

    and it comes from api.js

    - [>] save positions => save in localStorage in handleSave in DesignOverlay.jsx {id: img.id (this is the img.name or img.src), position: {x, y, width, height}}

      - [] save new image to be sent to business owner

  - [] add text to designs

  - [] choose a design from a list of designs

  - [] add any notes you want to add

  - [] select quantity

  - [] add item to cart

  - [] style CreateYourOwn.jsx

- [] auth

- [>] checkout

  - [] ask email or sign in/up

  - [] billing and shipment address

  - [] payment method: card

  - [] review order and confirm

- [] style home

- [] style shop

- [] about us

- [] contact us

  - [] email + message

- [] order

  - [] show customer's order

- [] cart

- [] Credits.jsx page

  - [] example: <a href="https://www.freepik.com/free-vector/short-sleeves-white-t-shirt-mockup_29663920.htm#query=transparent%20background%20t%20shirt&position=48&from_view=search&track=ais&uuid=8d6754b0-9a6d-4202-82b3-1721f78d1fb5">
    Image by vector_corp
    </a>
    on Freepik

# Notes

- https://pngtree.com/so/t-shirt
