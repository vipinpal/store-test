// Form data and errors interfaces
export interface IFormData {
    fullName: string;
    email: string;
    phone: string;
    creditCard: string;
    address: string;
}

export interface IFormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    creditCard?: string;
    address?: string;
}
