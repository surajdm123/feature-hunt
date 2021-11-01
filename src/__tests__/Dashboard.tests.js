/*

LICENSE GOES HERE

*/

import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { Route as RRoute } from "react-router-dom";
import { Router as RRouter } from "react-router-dom"; // NOT A TYPO
import Router from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Dashboard from "../Components/Dashboard";

import "../setupTests";

/**
 * This file tests Dashboard.js
 *
 * GitHub repository: CSC510-Group-25/feature-hunt
 *
 * Authored by: Group 25
 *
 * NAME (GitHub ID: GHID)
 *
 * */

/*
Dashboard.js test IDs:

data-testid="dash_alert"    -- alert
data-testid="dash_proj"     -- projects
data-testid="dash_user"     -- username
data-testid="dash_sortpop"  -- sort by votes
data-testid="dash_sorttime" -- sort by latest
data-testid="TEXT" -- short description

*/


describe("Dashboard tests", () => {
  it("does things1", () => {
    /*
      const history = createMemoryHistory();
      history.push('/:id');
      const { getByTestId } = render(
        <RRouter history={history}>
          <Thing />
        </RRouter>
      );
      const thing1 = getByTestId("thing1");
      //expect(thing1.children.length).toBe(4);
      */
  });

  it("renders dashboard", () => {
    const history = createMemoryHistory();
      history.push('/:id');
      const { getByTestId } = render(
        <RRouter history={history}>
          <Dashboard />
        </RRouter>
      );
      //const thing1 = getByTestId("thing1");
      //expect(thing1.children.length).toBe(4);
      
    //const yourproj = screen.getByText(/Your Projects/i);
   // expect(yourproj).toBeInTheDocument();
  
   // const popular = screen.getByText(/POPULAR/i);
   // const latest = screen.getByText(/LATEST/i);
   // expect(popular).toBeInTheDocument();
    //expect(latest).toBeInTheDocument();
  });

  it("does things2", () => {
    /*
      const history = createMemoryHistory();
      history.push('/:id');
      const { getByTestId } = render(
        <RRouter history={history}>
          <Thing />
        </RRouter>
      );
      const thing1 = getByTestId("thing1");
      //expect(thing1.children.length).toBe(4);
      */
  });
});