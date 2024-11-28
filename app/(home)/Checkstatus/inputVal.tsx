import { useState } from 'react';
import { forTheBookEditErrors } from '../../../utils\\supabase/interfaces';

function validateForm(firstName: string, middleName: string, lastName: string, phoneNum: string, email: string, hours: number, date: string) {

    const currentDate = new Date();
    const selectedDate = new Date(date);
    let tempErrors = {
        userFirstName: '',
        userMiddleName: '',
        userLastName: '',
        userPhoneNum: '',
        userEmail: '',
        hours: '',
        date: ''
    };

    // Validate required fields
    if (firstName && !/^[a-zA-Z ]+$/.test(firstName)) {
        tempErrors.userFirstName = "First name must contain only letters and spaces"; 
    }    

    if (middleName && !/^[a-zA-Z ]+$/.test(middleName)) {
        tempErrors.userMiddleName = "Middle name must contain only letters and spaces"; //need to verify if name must only have letters and spaces
    }

    if (lastName && !/^[a-zA-Z ]+$/.test(lastName)) {
        tempErrors.userLastName = "Last name must contain only letters and spaces"; //need to verify if name must only have letters and spaces
    }

    if (phoneNum && !/^[0-9 ]{11}$/.test(phoneNum)) {
        tempErrors.userLastName = "Phone number is invalid"; //need to verify if name must only have letters and spaces
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        tempErrors.userEmail = "Email Address is invalid";
    }

    if (hours < 0) {
        tempErrors.hours = "Number of hours is invalid";
    }

    if (selectedDate && currentDate > selectedDate) {
        tempErrors.date = "Date is invalid";
    }

    return tempErrors;
}

export default validateForm;