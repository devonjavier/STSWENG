import validateForm from '@/app/(home)/FAQs/SubmitTicket/inputVal';

describe('TC-18: validateForm', () => {
    test('should return error for missing name', () => {
        const errors = validateForm('', 'test@example.com', 'service', 'question');
        expect(errors.userName).toBe("Name is required");
    });

    test('TC-18.1U: should return error for invalid name format', () => {
        const errors = validateForm('1234', 'test@example.com', 'service', 'question');
        expect(errors.userName).toBe("Name must contain only letters and spaces");
    });

    test('TC-18.2U: should return error for missing email', () => {
        const errors = validateForm('John Doe', '', 'service', 'question');
        expect(errors.userEmail).toBe("Email Address is required");
    });

    test('TC-18.3U: should return error for invalid email format', () => {
        const errors = validateForm('John Doe', 'invalid-email', 'service', 'question');
        expect(errors.userEmail).toBe("Email Address is invalid");
    });

    test('TC-18.4U: should return error for missing service type', () => {
        const errors = validateForm('John Doe', 'test@example.com', '', 'question');
        expect(errors.userServiceType).toBe("Service type is required");
    });

    test('TC-18.5U: should return error for missing question', () => {
        const errors = validateForm('John Doe', 'test@example.com', 'service', '');
        expect(errors.userQuestion).toBe("Concern/question is required");
    });

    test('TC-18.6U: should return no errors for valid inputs', () => {
        const errors = validateForm('John Doe', 'test@example.com', 'service', 'question');
        expect(errors).toEqual({
            userName: '',
            userEmail: '',
            userServiceType: '',
            userQuestion: ''
        });
    });
});
