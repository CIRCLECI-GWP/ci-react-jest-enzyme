import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Picker from "../../components/Picker";
import * as actions from "../../actions";
import { App } from "../App";

describe("App", () => {
  it("renders without crashing given the required props", () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: "reactjs",
      posts: [],
    };
    const wrapper = shallow(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("sets the selectedSubreddit prop as the `value` prop on the Picker component", () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: "reactjs",
      posts: [],
    };
    const wrapper = shallow(<App {...props} />);
    // Query for the Picker component in the rendered output
    const PickerComponent = wrapper.find(Picker);
    expect(PickerComponent.props().value).toBe(props.selectedSubreddit);
  });

  it("renders the Refresh button when the isFetching prop is false", () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: "reactjs",
      posts: [],
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find("button").length).toBe(1);
  });

  it("handleRefreshClick dispatches the correct actions", () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: "reactjs",
      posts: [],
    };
    // Mock event to be passed to the handleRefreshClick function
    const mockEvent = {
      preventDefault: jest.fn(),
    };
    // Mock the actions we expect to be called
    actions.invalidateSubreddit = jest.fn();
    actions.fetchPostsIfNeeded = jest.fn();

    const wrapper = shallow(<App {...props} />);
    // Call the function on the component instance, passing the mock event
    expect(props.dispatch.mock.calls.length).toBe(1);
    expect(actions.fetchPostsIfNeeded.mock.calls.length).toBe(1);

    wrapper.instance().handleRefreshClick(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(props.dispatch.mock.calls.length).toBe(3);
    expect(actions.invalidateSubreddit.mock.calls.length).toBe(1);
    expect(actions.fetchPostsIfNeeded.mock.calls.length).toBe(2);
  });
});
