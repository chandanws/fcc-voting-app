import React from "react";
import { WithAuth } from "./authentication";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

describe("<WithAuth />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <MemoryRouter>
        <WithAuth component={<div>Hi</div>} isLogged={true} />
      </MemoryRouter>
    );
  });

  it("should return div when isLogged is true", () => {
    // nothing that I can think of
  });
});
