import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';
import {Route as RRoute } from "react-router-dom";
import {Router as RRouter } from "react-router-dom";
import Router from "react-router-dom";
import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'

import Product from './Components/Product';
import Feature from './Components/Feature';
import Comments from './Components/Comments';
import ProductTile from './Components/ProductTile';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Header from './Components/Header'
import Feedback from './Components/Feedback';
import Home from './Components/Home'
import './setupTests'


// import Service from './Service';

// jest.mock("./Service", () => {
//   const products = [{ "_id": { "$oid": "6136ab9fd7b10b315bb74908" }, "id": 2, "name": "disentry", "description": "Disentry is a discord bot that can help you organize & easily search messages in any discord server.", "votes": 1, "features": [{ "id": 1, "text": "Enable scheduling/reminders", "votes": 1, "timestamp": 1530815581293, "tags": ["enhancement"] }, { "id": 2, "text": "Enable playing music", "votes": 2, "timestamp": 1530814681293, "tags": ["enhancement"] }, { "id": 3, "text": "Add feature for moderating chats", "votes": 0, "timestamp": 1530814981293, "tags": ["enhancement"] }], "tags": ["bot", "fun"], "image_url": "https://s9.gifyu.com/images/discord-bots-community.gif" }, { "_id": { "$oid": "6136ab9fd7b10b315bb74907" }, "id": 1, "name": "feature-hunt", "description": "Feature Hunt is a platform where users can share, vote, and discuss feature requests and product owners can organize (categorize/prioritize) these requests. Instead of each product having it's own feature request page/portal we create a central hub where any product can interact with its users.", "votes": 2, "features": [{ "id": 1, "text": "Create dashboard for product owners", "votes": 1, "timestamp": 1530815581293, "tags": ["enhancement"] }, { "id": 2, "text": "Create product page", "votes": 1, "timestamp": 1530814681293, "tags": ["enhancement"] }, { "id": 3, "text": "Make likes consistent", "votes": 3, "timestamp": 1530814981293, "tags": ["bug fix"] }], "tags": ["productivity", "web app"], "image_url": "https://irp-cdn.multiscreensite.com/599c5dd6/dms3rep/multi/Lessons+learned+from+highly+successful+software+engineers.+%282%29.gif" }];
//   return {
//     get: async () => {
//       const asyncMock = jest.fn().mockResolvedValue(products);
//       await asyncMock();
//     }
//   }
// })

jest.mock('react-router-dom', () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));


test('renders home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/PRODUCTS/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navbar', () => {
  render(<App />);
  const submitProject = screen.getByText(/Submit Project/i);
  const roadmap = screen.getByText(/Roadmap/i);
  const feedback = screen.getByText(/Feedback/i);
  expect(submitProject).toBeInTheDocument();
  expect(roadmap).toBeInTheDocument();
  expect(feedback).toBeInTheDocument();
});

test('renders products', () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'feature-hunt' })
  render(<Product/>)
  const projectName = screen.getByText(/Feature-hunt/i);
  expect(projectName).toBeInTheDocument();
})

test('renders features', () => {
  const features = [{"id": 1, "text": "Create dashboard for product owners", "votes": 1, "timestamp": 1530815581293, "tags": ["enhancement"]}, {"id": 2, "text": "Create product page", "votes": 1, "timestamp": 1530814681293, "tags": ["enhancement"]}, {"id": 3, "text": "Make likes consistent", "votes": 3, "timestamp": 1530814981293, "tags": ["bug fix"]}];
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'feature-hunt' })
  render(<Feature features={features} index={0} setFeatures={()=>console.log()} />)
  const featureText = screen.getByText(/Create dashboard for product owners/i);
  expect(featureText).toBeInTheDocument();
})

test('renders product tile', () => {
  const products = [{'id': 1, 'name': 'feature-hunt', 'description': "Feature Hunt is a platform where users can share, vote, and discuss feature requests and product owners can organize (categorize/prioritize) these requests. Instead of each product having it's own feature request page/portal we create a central hub where any product can interact with its users.", 'votes': 2, 'tags': ['productivity','web app']}];
  render(<ProductTile products={products} index={0} setProducts={()=>console.log()}/>)
  const productName = screen.getByText(/Feature-hunt/i);
  const tagName = screen.getByText(/PRODUCTIVITY/i);
  const decscription = screen.getByText(/platform where users can share/i);
  expect(productName).toBeInTheDocument();
  expect(tagName).toBeInTheDocument();
  expect(decscription).toBeInTheDocument();
})

///////// ADDED TESTS /////////

test('renders home page: additional screen checks', () => {
  render(<App />)
  const popular = screen.getByText(/POPULAR/i);
  const latest = screen.getByText(/LATEST/i);
  const discover = screen.getByPlaceholderText(/Discover Projects.../i);
  expect(popular).toBeInTheDocument();
  expect(latest).toBeInTheDocument();
  expect(discover).toBeInTheDocument();
})

test('renders header: screen checks 1', () => {
  render(<Header />, {wrapper: MemoryRouter})
  const submitProject = screen.getByText(/Submit Project/i);
  const roadmap = screen.getByText(/Roadmap/i);
  const feedback = screen.getByText(/Feedback/i);
  const logout = screen.getByText(/LogOut/i);
  expect(logout).toBeInTheDocument();
  expect(submitProject).toBeInTheDocument();
  expect(roadmap).toBeInTheDocument();
  expect(feedback).toBeInTheDocument();
})

test('renders header: screen checks 2', () => {
  const history = createMemoryHistory();
  history.push('/:id');
  history.push('/dashboard')
  render(
    <RRouter history={history}>
      <Header />
    </RRouter>
  );
  const search = screen.getByPlaceholderText(/Search Features.../i);
  expect(search).toBeInTheDocument();
  expect(history.length).toBe(3);
  expect(history.location.pathname).toBe('/dashboard');
});

//TODO: test a comment on feedback
test('renders feedback', () => {
  const history = createMemoryHistory();
  history.push('/:id');
  //history.push('/feedback')
  render(
    <RRouter history={history}>
      <Feedback />
    </RRouter>
  );
  const search = screen.getByPlaceholderText(/Search Features.../i);
  const commstr = screen.getByText(/Leave a comment in the box below/i);
  const patient = screen.getByText(/May take some time to load, please be patient!/i);
  expect(search).toBeInTheDocument();
  expect(commstr).toBeInTheDocument();
  expect(patient).toBeInTheDocument();

  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe('/:id');
})

/*
test('placeholder search bar text on project', () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'feature-hunt' })
  render(<Header />, {wrapper: MemoryRouter})
  // TODO: FIX. Should be /Search Features.../i instead. Need to handle router memory.
  const searchfeatures = screen.getByPlaceholderText(/Discover Projects.../i);  
  expect(searchfeatures).toBeInTheDocument();

  const submitProject = screen.getByText(/Submit Project/i);
  const roadmap = screen.getByText(/Roadmap/i);
  const feedback = screen.getByText(/Feedback/i);

  expect(submitProject).toBeInTheDocument();
  expect(roadmap).toBeInTheDocument();
  expect(feedback).toBeInTheDocument();
})
*/

test('renders Home.js', () => {
  render(<Home />, {wrapper: MemoryRouter})
  const prod = screen.getByText(/PRODUCTS/i);
  const popular = screen.getByText(/POPULAR/i);
  const latest = screen.getByText(/LATEST/i);
  expect(prod).toBeInTheDocument();
  expect(popular).toBeInTheDocument();
  expect(latest).toBeInTheDocument();

})

test('renders dashboard', () => {
  render(<Dashboard />, {wrapper: MemoryRouter})
  const yourproj = screen.getByText(/Your Projects/i);
  expect(yourproj).toBeInTheDocument();
})


test('renders Product, Feature, ProductTile: additional screen checks', () => {
  const history = createMemoryHistory();
  const features = [{"id": 1, "text": "Create dashboard for product owners", "votes": 1, "timestamp": 1530815581293, "tags": ["enhancement"]}, {"id": 2, "text": "Create product page", "votes": 1, "timestamp": 1530814681293, "tags": ["enhancement"]}, {"id": 3, "text": "Make likes consistent", "votes": 3, "timestamp": 1530814981293, "tags": ["bug fix"]}];
  const products = [{'id': 1, 'name': 'feature-hunt', 'description': "Feature Hunt is a...", 'votes': 2, 'tags': ['productivity','web app']}];

  history.push('/:id');

  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'feature-hunt' })
  render(
    <RRouter history={history}>
      <Feature features={features} index={0} setFeatures={()=>console.log()} />
      <ProductTile products={products} index={0} setProducts={()=>console.log()}/>
      <Product query/>
    </RRouter>
  );

  const enterfeature = screen.getByPlaceholderText(/Enter a feature that you'd love to see/i);
  expect(enterfeature).toBeInTheDocument();

  //userEvent.click(upvote);
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe('/:id');
});


// TODO: login!
test('display Your Projects in header with logged in user', () => {
  render(<App />);
  //todo: if user is not logged in, log in.
  const yourproj = screen.getByText(/Your Projects/i);
  expect(yourproj).toBeInTheDocument();
});

//TODO
/*test('Features: test upvote', () => {
  const features = [{"id": 1, "text": "Create dashboard for product owners", "votes": 1, "timestamp": 1530815581293, "tags": ["enhancement"]}, {"id": 2, "text": "Create product page", "votes": 1, "timestamp": 1530814681293, "tags": ["enhancement"]}, {"id": 3, "text": "Make likes consistent", "votes": 3, "timestamp": 1530814981293, "tags": ["bug fix"]}];
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'feature-hunt' })
  render(<Feature features={features} index={0} setFeatures={()=>console.log()}/>)
  NYI
})*/