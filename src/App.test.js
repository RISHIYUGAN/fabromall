// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom"
import MapDemo from "./MapDemo"

jest.mock("react-dom", () => ({ render: jest.fn() }));

test("test_case1", () => {
  expect(ReactDOM.render.mock.calls.length).toBe(1);
});

test("test_case2", () => {
  const tree = renderer.create(ReactDOM.render.mock.calls[0][0]).toJSON();
  console.log(tree);
  expect(tree).toMatchInlineSnapshot(`
<ul
  className="list-group m-5"
>
  <li
    className="list-group-item"
  >
    Mars
  </li>
  <li
    className="list-group-item"
  >
    Venus
  </li>
  <li
    className="list-group-item"
  >
    Jupiter
  </li>
  <li
    className="list-group-item"
  >
    Earth
  </li>
  <li
    className="list-group-item"
  >
    Saturn
  </li>
  <li
    className="list-group-item"
  >
    Neptune
  </li>
</ul>
`);
});

// import React from 'react';
// import renderer from 'react-test-renderer';
// import Link from './MapDemo';
// import MapDemo from "./MapDemo";

it('renders correctly', () => {
  const tree = renderer
    .create(ReactDOM)
    .toJSON();
  expect(tree).toMatchSnapshot();
});