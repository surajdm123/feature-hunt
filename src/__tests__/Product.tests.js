/*

LICENSE GOES HERE

*/

import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { Router as RRouter } from "react-router-dom";  // NOT A TYPO
import Router from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import Product from "../Components/Product";
import Feature from "../Components/Feature";

import "../setupTests";

/**
 * This file tests Product.js
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
Product.js test IDs:

data-testid="prod_sortpop" -- sort by popularity/vote num
data-testid="prod_sorttime" -- sort by time/latest
data-testid="prod_form"     -- submit a feature/add feature
data-testid="prod_input"    -- feature input bar
*/

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Test Product", () => {

  it("tests sort by (TODO)", () => {
    const history = createMemoryHistory();
    history.push("/:id"); // home page

    jest.spyOn(Router, "useParams").mockReturnValue({ id: "feature-hunt" });
    const { getByTestId } = render(
      <RRouter history={history}>
        <Product />
      </RRouter>
    );

    //TODO: FIGURE OUT HOW TO CHECK IF THE CLASS IS HIGHLIGHTED OR NOT.
    const popsort = getByTestId("prod_sortpop");
    const timesort = getByTestId("prod_sorttime");
    fireEvent.click(timesort);

    // uncomment the two lines below in VS Code.
    // In the terminal, enter: npm run test.
    // The document should appear.

    // const whee = screen.getByText("whee");
    // expect(whee).toBeInTheDocument();
  });

  it("tests adding a feature when there are none", () => {
    const history = createMemoryHistory();
    history.push("/:id"); // home page

    jest.spyOn(Router, "useParams").mockReturnValue({ id: "feature-hunt" });
    const { getByTestId } = render(
      <RRouter history={history}>
        <Product />
      </RRouter>
    );

    const input = getByTestId("prod_input");
    const nuval = "fix sorting tests";
    fireEvent.change(input, { target: { value: nuval } });
    fireEvent.submit(getByTestId("prod_form")); // submit the new feature

    const whee = screen.getByText("Fix sorting tests"); // is it capitalized?
    expect(whee).toBeInTheDocument();

    const nutag = screen.getByText(/Enhancement/i); // is it tagged?
    expect(nutag).toBeInTheDocument();

    const projectName = screen.getByText(/Feature-hunt/i);
    expect(projectName).toBeInTheDocument();
  });

  it("tests adding a feature to an existing list of features", () => {
    const history = createMemoryHistory();
    history.push("/:id"); // home page

    const features = [
      {
        id: 1,
        text: "Make likes consistent",
        votes: 91190,
        timestamp: 1530814981295,
        tags: ["bug fix"],
      },
    ];

    jest.spyOn(Router, "useParams").mockReturnValue({ id: "feature-hunt" });
    const { getByTestId } = render(
      <RRouter history={history}>
        <Feature
          features={features}
          index={0}
          setFeatures={() => console.log()}
        />
        <Product />
      </RRouter>
    );

    const form = getByTestId("prod_form"); // for reference
    const input = getByTestId("prod_input");
    const nuval = "fix sorting tests";
    fireEvent.change(input, { target: { value: nuval } });

    fireEvent.submit(getByTestId("prod_form")); // submit the new feature
    const whee = screen.getByText("Fix sorting tests"); // is it capitalized?
    expect(whee).toBeInTheDocument();
    const nutag = screen.getByText(/Enhancement/i); // is it tagged?
    expect(nutag).toBeInTheDocument();

    const makel = screen.getByText(/Make likes consistent/i);
    expect(makel).toBeInTheDocument();
    const bugfix = screen.getByText(/Bug fix/i);
    expect(bugfix).toBeInTheDocument();
    const votecount = screen.getByText("91190");
    expect(votecount).toBeInTheDocument();

    const projectName = screen.getByText(/Feature-hunt/i);
    expect(projectName).toBeInTheDocument();
  });
});
