export interface SalesPanelContactRequest {
    icon: string;
    title: string;
    subtitle: string;
    question: {
        label: string;
        options: Question[];
        response: string;
    };
    description: {
        value: string;
        placeholder: string;
    };
    contactType: {
        label: string;
        options: Question[];
        response: string;
    };
    statusType: {
        label: string;
        options: Question[];
        response: string;
        selectStatus: any;
    };
}

interface Question {
    label: string;
    value: boolean | string;
    class?: string;
    explanation?: string;
}
