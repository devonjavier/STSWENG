import { useState } from 'react';
import { forTheTicketErrors } from '../../../../utils\\supabase/interfaces';

function validateForm(name: string, email: string, serviceType: string, question: string) {

    let tempErrors = {
        userName: '',
        userEmail: '',
        userServiceType: '',
        userQuestion: ''
    };

    // Validate required fields
    if (!name.trim()) {
        tempErrors.userName = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
        tempErrors.userName = "Name must contain only letters and spaces"; //need to verify if name must only have letters and spaces
    }
    
    if (!email.trim()) {
        tempErrors.userEmail = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        tempErrors.userEmail = "Email Address is invalid";
    }

    if (!serviceType.trim()) {
        tempErrors.userServiceType = "Service type is required";
    }

    if (!question.trim()) {
        tempErrors.userQuestion = "Concern/question is required";
    }

    return tempErrors;
}

export default validateForm;