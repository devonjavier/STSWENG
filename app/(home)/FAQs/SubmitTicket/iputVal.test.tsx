import validateForm from '@/app/(home)/FAQs/SubmitTicket/inputVal';
const func = validateForm;

test('test to validate correct values (no errors expected)', function() {

    const expectedVal = {
        userName: '',
        userEmail: '',
        userServiceType: '',
        userQuestion: ''
    };

    expect(func('witless', 'Destr@gmail.com', 'Option 1', 'Why tho')).toStrictEqual(expectedVal);
});

test('test to validate incorrect email', function() {

    const expectedVal = {
        userName: '',
        userEmail: 'Email Address is invalid',
        userServiceType: '',
        userQuestion: ''
    };

    expect(func('witless', 'Destrgmail.com', 'Option 1', 'Why tho')).toStrictEqual(expectedVal);
});

test('test to validate incorrect email, and missing values', function() {

    const expectedVal = {
        userName: 'Name is required',
        userEmail: 'Email Address is invalid',
        userServiceType: 'Service type is required',
        userQuestion: 'Concern/question is required'
    };

    expect(func('', 'Destrgmail.com', '', '')).toStrictEqual(expectedVal);
});

test('test to validate incorrect email and name, and missing values', function() {

    const expectedVal = {
        userName: 'Name must contain only letters and spaces',
        userEmail: 'Email Address is invalid',
        userServiceType: 'Service type is required',
        userQuestion: 'Concern/question is required'
    };

    expect(func('123', 'Destrgmail.com', '', '')).toStrictEqual(expectedVal);
});