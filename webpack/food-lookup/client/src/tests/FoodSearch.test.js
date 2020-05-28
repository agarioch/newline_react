/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../FoodSearch';
import Client from '../Client';

jest.mock('../Client');

describe('FoodSearch', () => {
  // ... initial state specs
  let wrapper;
  const onFoodClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<FoodSearch onFoodClick={onFoodClick}/>)
  })

  afterEach(() => {
    Client.search.mockClear();
    onFoodClick.mockClear();
  })

  it("should not display the remove icon", () => {
    expect(wrapper.find(".remove.icon").length).toBe(0)
  });
  it("should display zero rows", () => {
    expect(wrapper.find("tbody tr").length).toEqual(0)
  });

  describe('user populates search field', () => {
    const value = "brocc";
    beforeEach(() => {
      // ... simulate user typing "brocc" in input
      const input = wrapper.find("input").first()
      input.simulate("change", {
        target: {value: value},
    })})

      it("should update state property 'searchValue'", () => {
        expect(wrapper.state().searchValue).toEqual(value)
      })
      it("should call Client.search() with the value", () => {
        const invocationArgs = Client.search.mock.calls[0];
        expect(invocationArgs[0]).toEqual(value);
      })

      describe("and API returns results", () => {
        const foods = [
          {
            description: "Broccolini",
            kcal: "100",
            protein_g: "11",
            fat_g: "21",
            carbohydrate_g: "31"
          },
          {
            description: "Broccoli rabe",
            kcal: "110",
            protein_g: "12",
            fat_g: "22",
            carbohydrate_g: "32"
          },
        ]
        beforeEach(() => {
          // simulate API returning results
          const invocationArgs = Client.search.mock.calls[0];
          const cb = invocationArgs[1];
          cb(foods);
          wrapper.update()
        })
        it("should set the state property 'foods'", () => {
          expect(wrapper.state().foods).toEqual(foods);
        });
        it("should display two rows", () => {
          expect(wrapper.find('tbody tr').length).toEqual(2)
        })
        it("should render description of the 1st food", () => {
          expect(wrapper.html()).toContain(foods[0].description)
        })
        it("should render description of the 2nd food", () => {
          expect(wrapper.html()).toContain(foods[1].description)
        })

        describe('then user clicks food item', () => {
          beforeEach(() => {
            const foodRow = wrapper.find("tbody tr").first();
            foodRow.simulate("click");
          });
          it("should call prop 'onFoodClick' with food", () => {
            const food = foods[0];
            expect(onFoodClick.mock.calls[0]).toEqual([food]);
          })
        });

      })

      it("should display the remove icon", () => {
        expect(wrapper.find(".remove.icon").length).toBe(1)
      })

      describe('then user types more', () => {
        const value = "broccx"
        beforeEach(() => {
          const input = wrapper.find("input").first();
          input.simulate("change", {
            target: {value: value}
          })
        });
        it("should update the state property searchValue", () => {
          expect(wrapper.state().searchValue).toEqual(value)
        })
  
        describe('and API returns no results', () => {
          beforeEach(() => {
            // ... simulate API returning no results
            const secondInvocationArgs = Client.search.mock.calls[1];
            const cb = secondInvocationArgs[1];
            cb([]);
            wrapper.update();
          });
          it("should set the state property foods", () => {
            expect(wrapper.state().foods).toEqual([])
          })
        });
      });
    });
  });
