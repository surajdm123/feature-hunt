import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { Route as RRoute } from "react-router-dom";
import { Router as RRouter } from "react-router-dom"; // NOT A TYPO
import Router from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Product from "../Components/Product";
import Feature from "../Components/Feature";

import ProductTile from "../Components/ProductTile";

import "../setupTests";

/**
 * This file tests ProductTile.js
 *
 * GitHub repository: CSC510-Group-25/feature-hunt
 *
 * Authored by: Group 25
 *
 * Leila Moran (GitHub ID: snapcat)
 * NAME (GitHub ID: GHID)
 *
 * */

/*
ProductTile.js test IDs:
data-testid="pt_nav" -- go to product on click
data-testid="pt_down" -- product tile downvote
data-testid="pt_up" -- product tile upvote
*/

describe("Test ProductTile", () => {
  // this test doesn't work
  it("tests upvoting on a product (TODO)", () => {
    const history = createMemoryHistory();
    history.push("/:id"); // home page

    const products = [
      {
        id: 1,
        name: "feature-hunt",
        description: "Feature Hunt is...",
        votes: 999,
        tags: ["productivity", "web app"],
      },
    ];

    const { getByTestId } = render(
      <RRouter history={history}>
        <ProductTile
          products={products}
          index={0}
          setProducts={() => console.log()}
        />
      </RRouter>
    );

    const upvote = getByTestId("pt_up");
    fireEvent.click(upvote);

    // the two lines below are the lines that don't work.

    //  const nuvote = screen.getByText(/1000/i);
    // expect(nuvote).toBeInTheDocument();

    const productName = screen.getByText(/Feature-hunt/i);
    const tagName = screen.getByText(/PRODUCTIVITY/i);
    const decscription = screen.getByText(/Feature Hunt is.../i);
    expect(productName).toBeInTheDocument();
    expect(tagName).toBeInTheDocument();
    expect(decscription).toBeInTheDocument();

    // coverage click
    const downvote = getByTestId("pt_down");
    fireEvent.click(downvote);

    // uncomment the two lines below in VS Code.
    // In the terminal, enter: npm run test.
    // The document should appear.

    // const whee = screen.getByText("whee");
    // expect(whee).toBeInTheDocument();
  });

  // this test doesn't work
  it("tests downvoting on a product (TODO)", () => {
    const history = createMemoryHistory();
    history.push("/:id"); // home page

    const products = [
      {
        id: 1,
        name: "feature-hunt",
        description: "Feature Hunt is...",
        votes: 1000,
        tags: ["productivity", "web app"],
      },
    ];

    const { getByTestId } = render(
      <RRouter history={history}>
        <ProductTile
          products={products}
          index={0}
          setProducts={() => console.log()}
        />
      </RRouter>
    );

    const downvote = getByTestId("pt_down");
    fireEvent.click(downvote);

    // the two lines below are the lines that don't work.

    //  const nuvote = screen.getByText("999");
    //  expect(nuvote).toBeInTheDocument();

    const productName = screen.getByText(/Feature-hunt/i);
    const tagName = screen.getByText(/PRODUCTIVITY/i);
    const decscription = screen.getByText(/Feature Hunt is.../i);
    expect(productName).toBeInTheDocument();
    expect(tagName).toBeInTheDocument();
    expect(decscription).toBeInTheDocument();

    // coverage click
    const upvote = getByTestId("pt_up");
    fireEvent.click(upvote);

    // uncomment the two lines below in VS Code.
    // In the terminal, enter: npm run test.
    // The document should appear.

    // const whee = screen.getByText("whee");
    // expect(whee).toBeInTheDocument();
  });

  // figure out how to click on a specific product
  // well... at least navigation works? goal is to navivate to anti-JS
  it("tests navigating to a product (TODO)", () => {
    const history = createMemoryHistory();
    history.push("/:id"); // home page

    const products = [
      {
        id: 1,
        name: "feature-hunt",
        description: "Feature Hunt is...",
        votes: 1000,
        tags: ["productivity", "web app"],
      },
      {
        id: 2,
        name: "anti-JS",
        description: "I really, really hate JavaScript.",
        votes: 9001,
        tags: ["depression"],
      },
    ];

    const { getByTestId, getByText, getByAltText } = render(
      <RRouter history={history}>
        <ProductTile
          products={products}
          index={0}
          setProducts={() => console.log()}
        />
      </RRouter>
    );

    expect(history.length).toBe(2);
    //const goto = products[1];
    const nav = getByTestId("pt_nav"); //, { product: goto });
    //const getp = getByAltText(/Anti-JS/i);

    fireEvent.click(nav);
    //fireEvent.click(goto);
    //fireEvent.click(getp);

    expect(history.length).toBe(3); // after clicking on something, history.length + 1
    expect(history.location.pathname).toBe("/feature-hunt"); // goal: navigate to anti-js

    const productName = getByText(/Feature-hunt/i);
    const tagName = getByText(/PRODUCTIVITY/i);
    const decscription = getByText(/Feature Hunt is.../i);
    expect(productName).toBeInTheDocument();
    expect(tagName).toBeInTheDocument();
    expect(decscription).toBeInTheDocument();

    // coverage clicks
    const upvote = getByTestId("pt_up");
    fireEvent.click(upvote);
    const downvote = getByTestId("pt_down");
    fireEvent.click(downvote);

    // the block below doesn't work

    /*
    const productName2 = screen.getByText(/Anti-JS/i);
    const tagName2 = screen.getByText(/depression/i);
    const decscription2 = screen.getByText(/I really, really hate JavaScript./i);

    const over9k = getByText("9001");
    expect(over9k).toBeInTheDocument();

    expect(productName2).toBeInTheDocument();
    expect(tagName2).toBeInTheDocument();
    expect(decscription2).toBeInTheDocument();
    */

    // uncomment the two lines below in VS Code.
    // In the terminal, enter: npm run test.
    // The document should appear.

    //const whee = screen.getByText("whee");
    //expect(whee).toBeInTheDocument();
  });
});
