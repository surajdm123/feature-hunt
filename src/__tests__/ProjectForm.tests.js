import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { Router as RRouter } from "react-router-dom"; // NOT A TYPO
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import ProjectForm from "../Components/ProjectForm";

import "../setupTests";

/**
 * This file tests ProjectForm.js
 *
 * GitHub repository: CSC510-Group-25/feature-hunt
 *
 * Authored by: Group 25
 * Leila Moran (GitHub ID: snapcat)
 * Shraddha Mishra (GitHub ID: shraddhamishra7)
 * */

/*
ProjectForm.js test IDs:

data-testid="submit_button" -- 
data-testid="submit_form" -- submit project from
"data-testid": "form-Name" -- 
"data-testid": "form-Desc" -- 
"data-testid": "form-Img" -- 
data-testid="TEXT" -- short description

*/

describe("ProjectForm tests", () => {
  it("renders ProjectForm", () => {
    const history = createMemoryHistory();
    history.push("/:id");
    history.push("/dashboard");
    const { getByTestId, getByText, getByPlaceholderText, getByLabelText } = render(
      <RRouter history={history}>
        <ProjectForm />
      </RRouter>
    );
    const form = getByText(/Project Form/i);
    const name = getByText(/Name/i);
    const desc = getByText(/Description/i);
    const img = getByText(/Image URL/i);
    const sub = getByText(/submit/i);

    expect(form).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(sub).toBeInTheDocument();
  });

  it("ProjectForm: tests input, events", () => {
    const history = createMemoryHistory();
    history.push("/:id");
    history.push("/dashboard");
    const { getByTestId, getByText, getByPlaceholderText, getByLabelText } = render(
      <RRouter history={history}>
        <ProjectForm />
      </RRouter>
    );
    const form = getByText(/Project Form/i);

    const name = getByText(/Name/i);
    
    const nuval = getByTestId("form-inputName");
    const desc = getByTestId("form-Desc");
    const img = getByTestId("form-Img");

    

    fireEvent.change(nuval, { target: { value: "testname" } });
    fireEvent.change(desc, { target: { value: "testDesc" } });
    fireEvent.change(img, { target: { value: "testImg" } });

    const subbutton = getByTestId("submit_button");
    fireEvent.submit(subbutton);

    const nuname = getByText(/testname/i);
    expect(nuname).toBeInTheDocument();
    const nudesc = getByText(/testdesc/i);
    expect(nudesc).toBeInTheDocument();
    const nuImg = getByText(/testimg/i);
    expect(nuImg).toBeInTheDocument();

  });

 /* test("renders header: screen checks 2", () => {
    const history = createMemoryHistory();
    history.push("/:id");
    history.push("/dashboard");
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <RRouter history={history}>
        <Header />
      </RRouter>
    );

    const search = getByPlaceholderText(/Search Features.../i);
    expect(search).toBeInTheDocument();
    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe("/dashboard");
  });

  it("header tests: checks navigation, logout", () => {
    const history = createMemoryHistory();
    history.push("/:id");
    const { getByTestId, getByText, getByRole, queryByText } = render(
      <RRouter history={history}>
        <Header />
      </RRouter>
    );

    // home button
    const home = getByTestId("header_home");

    const submittext = getByText(/Submit Project/i);
    expect(submittext).toBeInTheDocument();

    // links
    const submit = getByTestId("header_sub");
    const dash = getByTestId("header_dash");
    const feedback = getByTestId("header_fb");
    const roadmap = getByTestId("header_rm");

    const links = getByTestId("header_links");
    expect(links.children.length).toBe(4); // check number of links

    expect(history.length).toBe(2);
    fireEvent.click(home);
    expect(history.length).toBe(3);
    fireEvent.click(dash);
    expect(history.length).toBe(4);
    fireEvent.click(roadmap);
    expect(history.length).toBe(5);
    fireEvent.click(submit);
    expect(history.length).toBe(6);
    fireEvent.click(feedback);
    expect(history.length).toBe(7);
    expect(history.location.pathname).toBe("/feedback");

    const logout = getByRole("button", { name: /LogOut/i }); // id: "logout_header"
    expect(logout).toBeInTheDocument();

    fireEvent.click(logout);
    expect(history.length).toBe(7);
    expect(history.location.pathname).toBe("/");

    const nothere = queryByText(/Your Projects/i); // ensure is absent
    expect(nothere).not.toBeInTheDocument();
  });

  it("header tests: tests search", () => {
    const history = createMemoryHistory();
    history.push("/:id");
    const { getByTestId, getByPlaceholderText } = render(
      <RRouter history={history}>
        <Header />
      </RRouter>
    );
    
    const search = getByTestId("header_input");
    fireEvent.change(search, { target: { placeholder: "searchword" } });

    fireEvent.keyPress(getByTestId("header_input"), {
      key: "Enter"
    });

    const searchword = getByPlaceholderText(/searchword/i);
    expect(searchword).toBeInTheDocument();
  });*/

});