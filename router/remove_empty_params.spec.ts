import { removeEmptyParams } from './remove_empty_params';

describe(removeEmptyParams.name, () => {
  it("base", () => {

    const input = {
      numberProp: 1,
      numberZeroProp: 0,
      emptyStringProp: '',
      nullProp: null,
      undefinedProp: undefined,
      booleanFalseProp: false,
      booleanTrueProp: true,
    };

    const output = removeEmptyParams(input);

    expect(output.numberProp).toBe(input.numberProp);
    expect(output.numberZeroProp).toBe(input.numberZeroProp);
    expect(output.booleanFalseProp).toBe(input.booleanFalseProp);
    expect(output.booleanTrueProp).toBe(input.booleanTrueProp);

    const clearedKeys = Object.keys(output);
    expect(clearedKeys).not.toContain('emptyStringProp');
    expect(clearedKeys).not.toContain('nullProp');
    expect(clearedKeys).not.toContain('undefinedProp');
  });
});
